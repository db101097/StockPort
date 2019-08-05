const models = require('../models/index')
const stockModel=models.stock

let getAllStocks= async (userId)=>{
    try{
        let stocks=await stockModel.findAll({where:{UserId:userId}})
        console.log('Stocks is ',stocks)
        if(stocks===null || stocks.length===0){
            throw 'No Stocks Found'
        }
        return stocks
    }catch(err){
        console.log(err)
        throw 'No Stocks Found'
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
    getAll:getAllStocks
}

module.exports=functions