const Vender = require('../models/Vender');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const secretKey = process.env.whatIsYourCompany;

const verifyToken = async (req, res, next) => {
    const token = req.headers.token;

    if (!token) {
        return res.status(401).json({ message: "Token is required" });
    }

    try {
        const decoded = jwt.verify(token, secretKey);

        // Use findById().exec() to return a promise
        const vender = await Vender.findById(decoded.venderId).exec();

        if (!vender) {
            return res.status(404).json({ error: "Vender not found" });
        }

        // Assign venderId to req.venderId
        req.venderId = vender._id;
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Invalid token" });
    }
}

module.exports = verifyToken;