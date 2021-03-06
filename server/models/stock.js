module.exports=function(sequelize,Sequelize){
    class Stock extends Sequelize.Model{}
    Stock.init({
        ticker:{
            type:Sequelize.STRING,
            allowNull:false,
            validate:{
                notEmpty:true
            }
        },
        shares:{
            type:Sequelize.INTEGER,
            allowNull:false,
            validate:{
                notEmpty:true,
                min:0
            }
        },
        total:{
            type:Sequelize.DECIMAL(10,2),
            allowNull:false,
            validate:{
                notEmpty:true,
                min:0
            }
        },
    },{
        sequelize,
        modelName:"Stock"
    })
    return Stock
}