import { Router } from "express";
import {
  addProduct,
  deleteProductById,
  editProduct,
  getAllProducts,
  getSingleProduct,
} from "../controllers/products.controllers.js";

import multer from "multer";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploadsNew/temp");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

const router = Router();

router
.route("/addProduct")
.post(upload.fields([{ name: "image" }]), addProduct);
router.route("/getAllProducts").get(getAllProducts);
router.route("/editProduct/:productId").post(editProduct);
router.route("/delete/:productId").delete(deleteProductById);
router.route("/getSingleProduct").get(getSingleProduct);
export default router;
