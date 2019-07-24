const Sequelize = require ('sequelize')
const dotenv = require('dotenv').config()
const sequelize = new Sequelize(process.env.DB_URI,{
    dialect: 'postgres'
  });

const User = require('./user')(sequelize,Sequelize)
const Balance=require('./balance')(sequelize,Sequelize)

User.hasOne(Balance);
Balance.belongsTo(User)
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  })
sequelize.sync()

let models = {
    user:User,
    balance:Balance
}

module.exports=models;
