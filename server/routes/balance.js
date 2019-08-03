const balanceModel= require('../utils/balanceUtils')

/*
    This function will ensure the value passed 
    as the amount the user wants to purchase is 
    greater than 0 and is in fact a number value
*/
function validNumber(amount){
    if(typeof(amount)!=="number" || amount<0){
        throw "Invalid amount"
    }

    return true
}

module.exports=function(app){

    //retrieve the balance for a user
    app.get("/balance/:id",async function (req,res){
        let id=req.params.id
        try{
            let total=await balanceModel.retrieveBalance(id)
            res.status(200).send({Balance:total.amount})
        }catch(err){
            console.log(err)
            res.status(404).send({Error:"User Could Not Be Found Or Balance Unavailable"})
        }       
    })
}