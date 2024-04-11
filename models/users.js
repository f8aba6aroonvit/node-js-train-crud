const mongoose = require('mongoose')
const usersSchema = new mongoose.Schema({
   
    user_name :{type:String},
    user_email :{type:String},
    user_password :{type:String},
    user_role : {type:String},
    user_approve :{type:Boolean},
    f_name : {type:String},
    l_name : {type:String},
    age : {type:Number},
    gender : {type:String}

    
})

module.exports = mongoose.model('users',usersSchema)