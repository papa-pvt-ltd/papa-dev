const mongoose = require('mongoose');

const PanSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    panNumber: {
        type: String,
        required: true,
    },
    dob: {
        type: String,
        required: true,
    },
    phone: {
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

const Aadhaar = mongoose.model('Pan', PanSchema);

module.exports = Aadhaar;
