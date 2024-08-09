const mongoose = require('mongoose');

const CaptureImageSchema = new mongoose.Schema({
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

const ImageModal = mongoose.model('CapturePersonImage', CaptureImageSchema);

module.exports = ImageModal;

