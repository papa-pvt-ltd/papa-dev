const FingerPrint = require('../models/Fingerprint');

const userFingerPrint = async (req, res) => {
    try {
        const { username, fingerprint } = req.body;

        // Validate the input
        if (!username || !fingerprint) {
            return res.status(400).json({ error: 'Username and fingerprint data are required' });
        }

        // Create a new fingerprint document
        const newFingerprint = new FingerPrint({ username, fingerprint });

        // Save the document to the database
        await newFingerprint.save();

        // Send success response
        res.status(200).json({ message: 'Fingerprint saved successfully' });
    } catch (err) {
        console.error('Error saving fingerprint:', err);
        res.status(500).json({ error: 'An error occurred while saving fingerprint' });
    }
};

module.exports = { userFingerPrint };
