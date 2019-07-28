const bodyParser= require('body-parser')
const express = require('express')
const app = express()
const models = require('./models/index')
const expressjwt = require("express-jwt")
const dotenv = require('dotenv').config()
const jwtCheck = expressjwt({secret:process.env.SECRET_KEY})


app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "http://localhost:3000");
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    res.header(
        'Access-Control-Allow-Methods',
     'GET, POST, PUT, DELETE, OPTIONS'
    );
    res.header('Access-Control-Allow-Credentials', true);
    next();
})
console.log(models.user)
const register = require("./routes/register")(app,models.user,models.balance)
const login = require("./routes/login")(app,models.user)
const balance = require("./routes/balance")(app,models.balance)
const stocks = require("./routes/stocks")(app,jwtCheck)
module.exports = app;