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
            ref:'Firm'
        }
    ],
    aadhaar:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Aadhaar'
        }
    ],
    pan:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Pan'
        }
    ],
    capturePersonImage:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'CapturePersonImage'
        }
    ]
})

const Vender = mongoose.model('Vender' , VenderSchema)

module.exports = Vender;