
module.exports=function(app,auth){
    app.get("/stocks",auth,(req,res)=>{
        res.status(200).send("Authorized")
    })
}