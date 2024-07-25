const { request } = require("express");
const mongoose= require("mongoose");

const firmSchema= new mongoose.Schema({
   brandName:{
    type:String,
    required:true
   },
   category:{
type:[
    {
        type:String,
        enum:['toys','apperals','chepals']
    }
]
   },
   offer:{
    type:String,

   },
   image:{
    type:String
   },
   vender:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Vender'
    }
   ],

   products:[
    {
        type:mongoose.Schema.Types.ObjectId,
         ref:'Product'
    }
]

})

const Firm =mongoose.model('Firm', firmSchema)
module.exports = Firm