const express = require('express');
const app = express.Router();
const {auth} =require('../middleware/auth')
const usersModel = require('../models/users')
const bcrypt = require('bcrypt');


app.get('/register',async(req,res)=>{
    try{
        const userI= await usersModel.find({}).exec();
        console.log(userI)
        res.send(userI)
    }catch(err){
        console.log(err)
        res.status(500).send('Server Error')
    }
})


app.post('/register',async(req,res)=>{
    try{
        const {user_name,user_email,user_password,user_role,f_name,l_name,age,gender} = req.body;
        console.log(req.body)

        let userI = await usersModel.findOne({user_name})
        console.log(userI)
        if(userI){
            return res.send('มีผู้ใช้อยู่ในระบบแล้ว').status(400)
            }

        userI = new usersModel({
            user_name ,
            user_email,
            user_password,
            user_role,
            f_name,
            l_name,age,
            gender
        })
        
        await userI.save()
        console.log(userI)

        res.send('สมัครสำเร็จ')

        }catch(err){
        console.log(err)
        res.status(500).send('Server Error')


        }
    
    
})






module.exports = app;