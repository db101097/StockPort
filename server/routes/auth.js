module.exports=function(app,auth){

    //retrieve the balance for a user
    app.get("/auth",auth,async function (req,res){
        try{
            res.status(200).send({authorized:true})
        }catch(err){
            console.log(err)
            res.status(401).send({Error:"Unauthorized"})
        }       
    })
}