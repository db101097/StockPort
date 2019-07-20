const bodyParser= require('body-parser')
const express = require('express')
const app = express()
const models = require('./models/index')
var cors = require('cors')

const user=models.users
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

const register = require("./routes/register")(app,models.user)
module.exports = app;