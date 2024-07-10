const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
    countryCode :{
        type: String,
        required: true,
    },
    firstName :{
        type: String,
        required: true,
    },
    lastName :{
        type: String,
        required: true,
    },
    phone :{
        type: String,
        required: true,
    },
    address1 :{
        type: String,
        required: true,
    },
    address2 :{
        type: String,
    },
    city :{
        type: String,
        required: true,
    },
    zone :{
        type: String,
        required: true,
    },
    pinCode :{
        type: String,
        required: true,
    },
    User:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        }

    ]
  });
  
  const Address = mongoose.model('Address', AddressSchema);
  
  module.exports = Address;