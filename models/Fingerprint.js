const mongoose = require('mongoose');

const FingerprintSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true, // Ensures usernames are unique
        trim: true // Removes extra whitespace
    },
    fingerprint: {
        type: Buffer,
        required: true // Ensure fingerprint data is always provided
    }
});

FingerprintSchema.index({ username: 1 });

module.exports = mongoose.model('Fingerprint', FingerprintSchema);
