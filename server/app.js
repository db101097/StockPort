const bodyParser= require('body-parser')
const express = require('express')
const app = express()
const models = require('./models/index')

const user=models.users
app.use(bodyParser.json());

module.exports = app;