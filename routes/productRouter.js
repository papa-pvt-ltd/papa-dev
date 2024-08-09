const express = require('express');
const path = require('path');
const multer = require('multer');
const productController = require('../controllers/productControler');

const router = express.Router();

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', 'uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// Routes
router.post('/add-product/:firmId', productController.addProduct);
router.get('/:firmId/products', productController.getProductByFirm);

router.get('/uploads/:imageName', (req, res) => {
  const imageName = req.params.imageName;
  res.setHeader('Content-Type', 'image/jpeg');
  res.sendFile(path.join(__dirname, '..', 'uploads', imageName));
});

router.get('/allProducts', productController.getAllProducts);
router.get('/singleproduct', productController.getSingleProduct);

router.delete('/:productId', productController.deleteProductById);
router.put('/editproduct/:productId', upload.single('image'), productController.EditProduct);

module.exports = router;
