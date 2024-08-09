const mongoose = require('mongoose');

const AadhaarSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    aadhaarNumber: {
        type: String,
        required: true,
    },
    dob: {
        type: String,
        required: true,
    },
    currentAddress: {
        type: String,
        required: true,
    },
    permanentAddress: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    Vender: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Vender',
        }
    ]
});

const Aadhaar = mongoose.model('Aadhaar', AadhaarSchema);

module.exports = Aadhaar;
