const Product = require("../models/Product");
const Firm = require("../models/Firm");
const Vender = require("../models/Vender");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

const addProduct = async (req, res) => {
  try {
    const { productname, price, category, bestseller, description,age , gender,stock } = req.body;
    // console.log(req.body)
    const image = req.file ? req.file.filename : undefined;

    const firmId = req.params.firmId;
    const firm = await Firm.findById(firmId);

    if (!firm) {
      return res.status(404).json({ error: "non firm found" });
    }

    const product = new Product({
      productname,
      price,
      category,
      bestseller,
      description,
      image,
      age,
      gender,
      stock,
      firm: firm._id,
      
    });
// console.log(product)
    const savedProducts = await product.save();
    firm.products.push(savedProducts);

    await firm.save();

    res.status(200).json(savedProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "internal age server  error" });
  }
};


const EditProduct = async (req, res) => {
  try {
    const productId = req.params.productId; // Get the product ID from request params
    console.log(productId)
    const { productname, price, category, bestseller, description, age, gender, stock } = req.body;
    console.log(req.body)
    if (!productId) {
      return res.status(400).json({ error: "Product ID is required" });
    }

    // Find the existing product by ID
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Update product fields with the new values
    if (productname) product.productname = productname;
    if (price) product.price = price;
    if (category) product.category = category;
    if (bestseller) product.bestseller = bestseller;
    if (description) product.description = description;
    if (age) product.age = age;
    if (gender) product.gender = gender;
    if (stock) product.stock = stock;

    // Handle image upload
    if (req.file) {
      product.image = req.file.filename;
    }

    // Save the updated product
    const updatedProduct = await product.save();
  
  


    // Respond with the updated product
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


const getAllProducts = async (req,res)=>{
  try {
    const products = await Product.find();
    res.status(200).json({message:"Products fetching succesfully....!",products})
} catch (err) {
  console.error(err);
  res.status(500).json({ message: "internal server  error" });
}
}



const getProductByFirm = async (req, res) => {
  try {
    const firmId = req.params.firmId;
    const firm = await Firm.findById(firmId);

    if (!firm) {
      return res.status(404).json({ error: "no firm found" });
    }
    const brandName = firm.brandName;
    const products = await Product.find({ firm: firmId });
    res.status(200).json({ brandName, products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "internal server  error" });
  }
};
const deleteProductById = async (req, res) => {
  try {
    const productId = req.params.productId;

    const deleteProductId = await Product.findByIdAndDelete(productId);

    if (!deleteProductId) {
      return res.status(404).json({ error: "No product found" });
    }
    res.status(200).json(deleteProductId);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "internal server  error" });
  }
};

const getSingleProduct = async (req , res )=>{
  try {
    const productId = req.query.productId;;
  
    const actualProduct = await Product.findById(productId)
    if(!actualProduct){
      return res.status(404).json({error:"No Product Matched you provided by id"})
    }
    res.status(200).json(actualProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "internal server  error" });
  }
}
module.exports = {
  addProduct: [upload.single("image"), addProduct],
  getProductByFirm,
  deleteProductById,
  getAllProducts,
  getSingleProduct,
  EditProduct
};
