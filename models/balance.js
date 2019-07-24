module.exports=function(sequelize,Sequelize){
    class Balance extends Sequelize.Model{}
    Balance.init({
        amount:{
            type:Sequelize.DECIMAL(10,2),
            allowNull:false,
            validate:{
                notEmpty:true,
                min:0
            }
        }
    },{
        sequelize,
        modelName:"Balance"
    })
    return Balance
}