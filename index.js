const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const firmRoutes = require("./routes/firmRoutes");
const VenderRoute = require('./routes/venderRoute');
const productRoute = require('./routes/productRouter');
const userRoute = require('./routes/userRoutes');
const cartRoute = require('./routes/cartRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const addressRouter = require('./routes/addressRoutes');
const orderRouter = require('./routes/orderRoutes');
const contactRouter = require('./routes/contactRoutes');
const wishlistRouter = require('./routes/wishlistRoutes');
const Product = require('./models/Product'); // Use the correct name for the model

const paymentRoute = require('./routes/paymentRoutes');

const cors = require('cors');
const path = require('path');

const app = express();

// Load environment variables
dotenv.config();
app.use(cors());

const PORT = process.env.PORT || 8000; // Use environment variable or default to 8000
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('DB connection failed:', error.message);
});

// Middleware
app.use(bodyParser.json());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));

const requireAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next(); // User is authenticated, proceed to the next middleware
    }
    res.redirect('/login'); // Redirect to login page if not authenticated
};

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/vender', VenderRoute);
app.use('/firm', firmRoutes);
app.use('/product', productRoute);
app.use('/auth', userRoute);
app.use('/cart', cartRoute);
app.use('/review', reviewRouter);
app.use('/api', paymentRoute);
app.use('/address', addressRouter);
app.use('/order', orderRouter);
app.use('/contact', contactRouter);
app.use('/wishlist', wishlistRouter);

app.get('/apii/search', async (req, res) => {
    const query = req.query.q ? req.query.q.toLowerCase() : '';
    console.log('Search Query:', query);

    try {
        const results = await Product.find({
            name: { $regex: query, $options: 'i' } // Case-insensitive search
        });
        console.log('Search Results:', results);
        res.json({ results });
    } catch (error) {
        console.error('Error fetching search results:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Add sample products endpoint
app.get('/apii/search', async (req, res) => {
    const query = req.query.q ? req.query.q.toLowerCase().trim() : '';
    console.log('Search Query:', query);

    try {
        // Debugging: Ensure the query string is correct
        console.log('Searching for products with name:', query);

        const results = await Product.find({
            name: { $regex: new RegExp(query, 'i') } // Ensure case-insensitive search
        });

        // Debugging: Log the number of results found
        console.log('Number of Results Found:', results.length);
        console.log('Search Results:', results);

        res.json({ results });
        
    } catch (error) {
        console.error('Error fetching search results:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


// Health Check Endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ message: 'Server is healthy' });
});

// Home Route
app.get('/home', (req, res) => {
    res.send('<h1>This is Home Page</h1>');
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running successfully at ${PORT}`);
});
