const Product = require("../models/Product");
const Firm = require('../models/Firm')
const Vender = require('../models/Vender')
const multer = require('multer')
const path = require('path')



const storage = multer.diskStorage({
    destination: function (req,file, cb){
        cb(null, 'uploads/');
    },
    filename:function(req,res,cb){
        cb(null, Date.now() + path.extname(file.orginalname));
    }
  })

  
  const upload = multer({storage:storage})



const addProduct = async(req,res)=>{

    try {
        const{productname,price,category,bestseller,description}= req.body;
        const image = req.file? req.file.filename: undefined;

        const firmId = req.params.firmId;
        const firm = await Firm.findById(firmId)
        
if(!firm){
    return res.status(404).json({error:"non firm found"})

}


const product = new Product ({
    productname,price,category,bestseller,description,image,firm:firm._id
})

const savedProducts= await product.save();
firm.products.push(savedProducts)

await firm.save()

res.status(200).json(savedProducts)

    } catch (error) {
        console.error(error)
        res.status(500).json({message:"internal server  error"})
    }

}


const getProductByFirm= async(req,res)=>{
    try {
        const firmId = req.params.firmId;
        const firm = await Firm.findById(firmId);

        if(!firm){
            return res.status(404).json({error:"no firm found"});

        }
        const brandName = firm.brandName; 
        const products = await Product.find({firm:firmId});
        res.status(200).json({brandName,products});

    } catch (error) {
         console.error(error)
        res.status(500).json({message:"internal server  error"})
    }
}
const deleteProductById = async(req,res)=>{
try {
    const productId = req.params.productId;

    const deleteProductId = await Product.findByIdAndDelete(productId);

    if(!deleteProductId){
        return res.status(404).json({error:"No product found"})
    }
} catch (error) {
    console.error(error)
        res.status(500).json({message:"internal server  error"})
}

}
module.exports = {addProduct:[upload.single('image'), addProduct],getProductByFirm ,deleteProductById};