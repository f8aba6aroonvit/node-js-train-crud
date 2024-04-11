const express = require('express');
var createError = require('http-errors');
const {readdirSync} = require('fs')

const path =require('path')
const bodyParse = require('body-parser')
const cors = require('cors')

const cookieParser = require('cookie-parser');
const app = express();
const logger = require('morgan')

require('dotenv').config()
const mongoose= require('mongoose')
const {DB_HOST,DB_PORT,DB_NAME} = process.env
console.log(process.env.DB_HOST)


var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');
var productRouter = require('./routes/products')
var orderRouter= require('./routes/orders')



mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`)
.then(()=>{
  console.log('connect success')
  console.log(DB_NAME)
}).catch((err)=>{
  console.log(err.message)
})

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())
app.use(logger('dev'));
app.use(bodyParse.json({limit:'10mb'}))



readdirSync('./routes')
    .map((r) => app.use('/api',require('./routes/' + r)))





    

app.listen(8888,()=>{
    console.log('ผู้เล่นเข้ามาสำเร็จ http://localhost:8888')
})


module.exports = app;