const express = require('express');
const app = express.Router();
const {auth} =require('../middleware/auth')
const usersModel = require('../models/users.js')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

app.get('/',(req,res)=>{
    console.log(req.body)
})
app.post('/login',async(req,res,next)=>{
    
    try{
        const {user_name,user_password}=req.body
        let userI = await usersModel.findOne({user_name})
        let isMatch = await usersModel.findOne({user_password})
        console.log(userI)
        if (!userI || !isMatch) {
            return res.status(404).json({ message: 'Incorrect Username or Password' });
          }
        // const isMatch =  bcrypt.compare(user_password, userI.user_password);
        // if (!isMatch) {
        //     return res.status(401).json({ message: 'Incorrect password' });
        //   }x


        const token = jwt.sign({ userId: userI._id }, process.env.JWT_KEY, {
        expiresIn: '1 hour'
        });
          res.json({"แกะโทเคน":token });
    }catch(err){
        console.log(err)
        res.status(500).send('Server Error')
    }
})







module.exports = app;