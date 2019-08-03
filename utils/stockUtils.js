const models = require('../models/index')
const stockModel=models.stock

let findStock=async (userID,ticker,transaction)=>{
    try{
        let stock=await stockModel.findOne({where:{UserId:userID,ticker:ticker},transaction})
        if(stock===null){
            throw 'Stock not found'
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

/*

*/
let addStock=async function addStock(stock,userID,transaction){
    try{
        //find if the user already owns shares of that stock
        let owned=findStock(userID,stock.ticker,transaction)
            //if the user does own a stock update it's shares field
            if(owned.status===true){
                owned.stock.shares+=stock.shares
                owned.stock.total+=total
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
}

module.exports=functions