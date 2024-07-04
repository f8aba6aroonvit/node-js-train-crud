const mongoose = require('mongoose')
const ordersSchema = new mongoose.Schema({
    order_id:{type:String},
    buyer_name:{type:String},
    order_list : {type:Object},
    amount_of_product : {type:Number},
    sum_of_product : {type:Number}
    

    
})

module.exports = mongoose.model('orders',ordersSchema)