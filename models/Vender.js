const mongoose=require('mongoose')

const VenderSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true

    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    firm:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'firm'
        }
    ]
})

const Vender = mongoose.model('Vender' , VenderSchema)

module.exports = Vender;