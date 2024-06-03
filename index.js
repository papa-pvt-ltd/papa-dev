const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
// const events = require('events');
// events.EventEmitter.defaultMaxListeners = 20; 
const  firmRoutes = require("./routes/firmRoutes")

const VenderRoute = require('./routes/venderRoute');
const productRoute = require('./routes/productRouter');
const cors = require('cors');
const path = require('path')

const app = express();

// Load environment variables
dotenv.config();
app.use(cors())

const PORT = process.env.PORT || 8000;
const MONGO_URI = process.env.MONGO_URI;

// Connect to MongoDB
mongoose.connect(MONGO_URI)
    .then(() => console.log("DB connected successfully"))
    .catch(err => console.log("DB connection failed", err));

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/vender', VenderRoute);
app.use('/firm',firmRoutes)
app.use('/product', productRoute)
app.use('/upload',express.static('uploads'));

app.use('/home', (req, res) => {
    res.send('<h1>This is Home Page</h1>');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running successfully at ${PORT}`);
});
