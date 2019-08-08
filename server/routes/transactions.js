const transactionModel = require('../utils/transactionUtils')

module.exports=function(app,auth){
    app.get("/transaction/:id",auth,async (req,res)=>{
        try{
            console.log('here')
            let allTransaction= await transactionModel.getAll(req.params.id)
            console.log('all transactions is ',allTransaction)
            res.status(200).send(allTransaction)
        }catch(err){
            console.log(err)
            res.status(400).send(err)
        }
        
    })
}