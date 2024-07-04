const mongoose = require('mongoose')
const productsSchema = new mongoose.Schema({
    
    product_id:{type:String},
    product_name:{type:String},
    detail : {type:String},
    price : {type:Number},
    amount : {type:Number},
    product_image :{type:String}
})

module.exports = mongoose.model('products',productsSchema)