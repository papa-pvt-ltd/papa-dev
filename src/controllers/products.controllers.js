import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/apiError.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import { Product } from "../models/products.models.js";
// import multer from "multer";
// import path from "path";
import { Vender } from "../models/vender.models.js";
import { Firm } from "../models/firm.models.js";
import mongoose from "mongoose";

const addProduct = asyncHandler(async (req, res) => {
  const {
    productname,
    price,
    category,
    bestseller,
    description,
    age,
    gender,
    stock,
  } = req.body;

  if (
    [
      productname,
      price,
      category,
      bestseller,
      description,
      age,
      gender,
      stock,
    ].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  // console.log("req.body:", req.body);
  // console.log("req.files is", req.files);
  const images = req.files?.image;
  // console.log(images)

  // if there are multiple images we are storing their address in array to push in db
  let image = [];
  images.map((img) => {
    image.push(img.path);
    // console.log(img.path)
  });
  // console.log(image);

  if (image.length < 0) {
    throw new ApiError(500, "Error while uploading image");
  }

  // const firmId = req.params.firmId;
  // const firm = await Firm.findById(firmId);
  // if (!firm) {
  //   return res.status(404).json({ error: "non firm found" });
  // }
  // const product = new Product({
  //   productname,
  //   price,
  //   category,
  //   bestseller,
  //   description,
  //   image,
  //   age,
  //   gender,
  //   stock,
  //   // firm: firm._id,
  // });
  // console.log(product)
  // const savedProducts = await product.save();
  // firm.products.push(savedProducts);
  // await firm.save();
  // res.status(200).json();

  const product = await Product.create({
    productname,
    price,
    category,
    bestseller,
    description,
    image,
    age,
    gender,
    stock,
  });

  const createdProduct = await Product.findById(product._id);

  if (!createdProduct) {
    throw new ApiError(500, "something went wrong while adding the product");
  }
  return res
    .status(200)
    .send(new ApiResponse(201, product, "product added successfully"));
});

const deleteProductById = asyncHandler(async (req, res) => {
  const { productId } = req.params; // Get the product ID from request params
  if (!productId) {
    throw new ApiError(400, "product id is required");
  }

  // Validate productId format (Optional, but recommended)
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    throw new ApiError(400, "Invalid Product ID format");
  }

  const deleledProduct = await Product.findByIdAndDelete(productId);
  if (!deleledProduct) {
    throw new ApiError(404, "product deletion failed");
  }
  return res
    .status(200)
    .send(new ApiResponse(200, deleledProduct, "product deleted successfully"));
});

const editProduct = asyncHandler(async (req, res) => {
  const { productId } = req.params; // Get the product ID from request params
  if (!productId) {
    throw new ApiError(400, "product id is required");
  }

  // Validate productId format (Optional, but recommended)
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    throw new ApiError(400, "Invalid Product ID format");
  }

  const product = await Product.findById(productId);
  if (!product) {
    throw new ApiError(404, "Product is not found");
  }

  const {
    productname,
    price,
    category,
    bestseller,
    description,
    age,
    gender,
    stock,
  } = req.body;
  // Create an object for the fields to be updated
  const updateFields = {};

  // Conditional checking for each field before updating
  if (productname) updateFields.productname = productname;
  if (price) updateFields.price = price;
  if (category) updateFields.category = category;
  if (bestseller !== undefined) updateFields.bestseller = bestseller; // checking for boolean
  if (description) updateFields.description = description;
  if (age) updateFields.age = age;
  if (gender) updateFields.gender = gender;
  if (stock !== undefined) updateFields.stock = stock; // checking for undefined

  // Check if there are fields to update
  if (Object.keys(updateFields).length === 0) {
    throw new ApiError(400, "No fields to update");
  }

  const updatedProduct = await Product.findOneAndUpdate(
    { _id: productId }, // Find the product by ID
    { $set: updateFields }, // Set the fields to update
    { new: true, runValidators: true } // Options: return the updated document, validate the update
  );

  if (!updatedProduct) {
    throw new ApiError(500, "Error while updating the product");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updatedProduct, "Product updated successfully"));
});

const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();
  if (!products) {
    throw new ApiError(400, "There are no products");
  }

  return res
    .status(200)
    .send(new ApiResponse(201, products, "All products fetched successfully"));
});

const getSingleProduct = asyncHandler(async (req, res) => {
  const productId = req.query.productId;
  const product = await Product.findById(productId);
  if (!product) throw new ApiError(400, "No product is found");

  return res
    .status(200)
    .send(new ApiResponse(200, product, "product found successfully"));
});

// const getProductByFirm = async (req, res) => {
//   try {
//     const firmId = req.params.firmId;
//     const firm = await Firm.findById(firmId);

//     if (!firm) {
//       return res.status(404).json({ error: "no firm found" });
//     }
//     const brandName = firm.brandName;
//     const products = await Product.find({ firm: firmId });
//     res.status(200).json({ brandName, products });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "internal server  error" });
//   }
// };

export {
  addProduct,
  getAllProducts,
  editProduct,
  deleteProductById,
  getSingleProduct,
};
