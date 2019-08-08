const stockModel = require('../utils/stockUtils')

module.exports=function(app,auth){
    app.get("/stocks/:id",auth,async (req,res)=>{
        try{
            let allStocks= await stockModel.getPortfolio(req.params.id)
            //console.log('all stocks is ',allStocks)
            res.status(200).send(allStocks)
        }catch(err){
            res.status(400).send(err)
        }
        
    })
}