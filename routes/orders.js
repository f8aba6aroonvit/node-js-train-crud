const express = require('express');
const app = express.Router();
const {auth} =require('../middleware/auth')
const ordersModel = require('../models/orders')
const productsModel = require('../models/products')

app.get('/orders',async(req,res)=>{
    try {
        let orders = await ordersModel.find()
        console.log('รายการ', orders)
    
        return res.send({
          orders_data: orders,
          
        })
    } catch (err) {
        return res.status(err.status || 500).send({
          message: err.message
        })
      }
    
})

app.get('/orders/:id',auth,async(req,res)=>{

    

    

})

app.post('/orders',auth,async(req,res)=>{

    try{
        let body = req.body
        const {product_id}=req.body
        console.log("ข้อมูล",body)
        let amount_of_product = 0
        let sum_of_product = 0
        for (let i = 0; i < body.order_list.length; i++) {
            //console.log(body.order_list[i])
            sum_of_product += (body.order_list[i].ea * body.order_list[i].price)
            //const product = await productsModel.findById(_id)
            amount_of_product += body.order_list[i].ea
          
            const product = await productsModel.findOne({product_id})

            
            if(!product){
              return res.status(404).json({ message: 'หนังหมาว่ะ' });
            }
            product.amount  -= amount_of_product

            
            await product.save();
            console.log(product)
            
            
      }

      
    
    let orders = new ordersModel({
        buyer_name: body.buyer_name,
        order_list: body.order_list,
        amount_of_product: amount_of_product,
        sum_of_product: sum_of_product
        
  
    })
    //await orders.save()
    return res.status(201).send({
        orders: orders,
        message: `สั่งโดย ${body.buyer_name} สำเร็จ`
      })

    }catch(err){
        console.error(err);
    return res.status(500).send({
      message: err.message,
      success: false,
    });

    }
    

})


module.exports = app;