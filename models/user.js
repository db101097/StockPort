module.exports=function(sequelize,Sequelize){
    class User extends Sequelize.Model{}
    User.init({
        firstName:{
            type:Sequelize.STRING,
            allowNull:false,
            validate:{
                notEmpty:true,
            }
        },
        lastName:{
            type:Sequelize.STRING,
            allowNull:false,
            validate:{
                notEmpty:true
            }
        },
        email:{
            type:Sequelize.STRING,
            allowNull:false,
            unique: true,
            validate:{
                isEmail:true
           }
        },
        password:{
            type:Sequelize.STRING,
            allowNull:false,
            validate:{
                notEmpty:true,
                is: [/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/]
           }
        }
    },{
        sequelize,
        modelName:"User"
    })
    return User
}