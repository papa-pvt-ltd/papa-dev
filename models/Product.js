const  mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
    productname:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    catogery:[{
        type:String,
        enum:['toys','apperals','chepals']
    }],
    bestseller:{
        type:String
    },
    description:{
        type:String,
        required:true
    },
    image:{
        type:String,
    },
    firm:[
        {
            type:mongoose.Schema.Types.ObjectId,
             ref:'firm'
        }
    ]


})


const Product = mongoose.model('product',ProductSchema);

module.exports=Product;