const express = require('express');
const app = express.Router();
const {auth} =require('../middleware/auth')
const productsModel = require("../models/products")



app.get('/products',auth,async(req,res)=>{
    try{
        let products = await productsModel.find()
        let body = req.body
        return res.send({
            
            products_data:products,
            product_name : body.product_name,
            detail : body.detail,
            price : body._price,
            age :body.age,
            amount :body.amount,
            message : "ดึงข้อมูลทั้งหมดสำเร็จ"
        })}catch(err){
            return res.status(err.status||500).send({
                message: err.message
            })
        }
    
})

app.post('/products',auth,async(req,res)=>{
    try{
        let products = await productsModel.find()
        let body = req.body
        return res.send({
            
            products_data:products,
            product_name : body.product_name,
            detail : body.detail,
            price : body._price,
            age :body.age,
            amount :body.amount,
            message : "ดึงข้อมูลทั้งหมดสำเร็จ"
        })}catch(err){
            return res.status(err.status||500).send({
                message: err.message
            })
        }
    
})

app.get('/products/:id',auth,async(req,res)=>{
    try{
        let id= req.params.id
        let products = await productsModel.findById(id)
        console.log(id)
          return res.send({
            data:products,
            message:"รับ id product สำเร็จ",
      
            godLogDog : `${id}`
          })
        }catch(err){
          return res.status(err.status||500).send({
            message:"หนังหมาว่ะ",
            godDog: err.message
          })
        }
})

module.exports = app;