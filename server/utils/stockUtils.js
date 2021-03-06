const models = require('../models/index')
const axios = require('axios');
const stockModel=models.stock

let getAllStocks= async (userId)=>{
    try{
        let stocks=await stockModel.findAll({where:{UserId:userId}})
        //console.log('Stocks is ',stocks)
        if(stocks===null || stocks.length===0){
            throw 'No Stocks Found'
        }
        return stocks
    }catch(err){
        console.log(err)
        throw 'No Stocks Found'
    }
}

let getOpeningPrice=async(ticker)=>{
    try{
        let res=await axios.get('https://api.worldtradingdata.com/api/v1/stock?symbol='+ticker+'&api_token=EUHpHVVmsOsRO3rPWAc3Nojx9adXGbQorHOZnyHfT37IEWW0Ri9WjM2OGFWq')
        let stocks = res.data.data
        if(stocks===undefined){
            console.log('here')
            return false
        }
        let obj={
            openPrice:Number(stocks[0].price_open),
            currentPrice:Number(stocks[0].price)
        }
        console.log('Object ',obj)
        return obj
    }catch(err){
        console.log(err)
        throw 'Stock not found'
    }
}

let createRow=async (stock,openPrice,currentPrice)=>{
    return {
        ticker:stock.ticker,
        shares:stock.shares,
        total:stock.total,
        openPrice:openPrice,
        currentPrice:currentPrice,
        profit:(+(stock.shares*currentPrice).toFixed(2))-stock.total
    }
}

let getPortfolio = async(id)=>{
    try{
        let allStocks= await getAllStocks(id)
        let rows = new Array()
        for(let i=0;i<allStocks.length;i++){
            console.log('symbol ',allStocks[i].ticker)
            let currData=await getOpeningPrice(allStocks[i].ticker)
            if(currData===false){
                
            }
            else{
                let row= await createRow(allStocks[i],currData.openPrice,currData.currentPrice)
                rows.push(row)
            }
        }
        console.log('length of rows ',rows.length)
        return rows
    }catch(err){
        console.log(err)
        throw 'Failed To Get Portfolio'
    }
}

let findStock=async (userID,ticker,transaction)=>{
    try{
        let stock=await stockModel.findOne({where:{UserId:userID,ticker:ticker},transaction})
        console.log('This was found ',stock)
        if(stock===null){
            throw "Stock does not exists"
        }
        return {
            status:true,
            stock:stock
        }
    }catch(err){
        console.log('ERROR in find Stock ',err)
        return {
                status:false,
                stock:''
        }
    }
}

let addStock=async function addStock(stock,userID,transaction){
    try{
        //find if the user already owns shares of that stock
        let owned=await findStock(userID,stock.ticker,transaction)
            //if the user does own a stock update it's shares field
            if(owned.status===true){
                owned.stock.shares+=stock.shares
                owned.stock.total=Number(owned.stock.total)+Number(stock.total)
                let updatedStock=await owned.stock.save({transaction:transaction})
            }
            //else add it to the database
            else{
                let newStock=await stockModel.build({
                    UserId:userID,
                    ticker:stock.ticker,
                    shares:stock.shares,
                    total:stock.total
                })
                let newStock2=await newStock.save({transaction:transaction})
            }
    }catch(err){
        console.log(err)
        throw 'Failed to Add Ownership to Stock'
    }
}


let functions = {
    add:addStock,
    getAll:getAllStocks,
    getPortfolio:getPortfolio
}

module.exports=functions