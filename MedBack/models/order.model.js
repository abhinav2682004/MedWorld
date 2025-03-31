const mongoose = require("mongoose");
const orderSchema = mongoose.Schema({
    orderId:{
        type:mongoose.Schema.Types.ObjectId,
        auto:true,
        required:true
    },
    userId:{
        type:String,
        required:true
    },
    items:{
        type:[{
            imageUrl:{
                type:String,
            },
            productName:{
                type:String,
                required:true
            },
            quantity:{
                type:Number,
                default:1
            },
            price:{
                type:Number,
                required:true
            },
            itemPrice:{
                type:Number,
            },
        }],
        default:[]
    },
    totalPrice:{
        type:Number,
        default:0,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    modeOfPayment:{
        type:String,
    },
    address:{
        type:String,
        required:true
    },
    placedDate:{
        type:Date
    },
    expectedDate:{
        type:String
    },
});
const orderModel = mongoose.model("order", orderSchema);
module.exports = {orderModel,orderSchema};