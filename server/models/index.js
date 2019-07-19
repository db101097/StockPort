const Sequelize = require ('sequelize')
const dotenv = require('dotenv').config()
const sequelize = new Sequelize(process.env.DB_URI,{
    dialect: 'postgres'
  });

const User = require('./user')(sequelize,Sequelize)

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
    user:User
}

module.exports=models;
