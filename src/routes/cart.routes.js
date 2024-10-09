import { Router } from "express";
import { addTocart, getCartData } from "../controllers/cart.controllers.js";

const router = Router();

router.route("/addToCart/:productId").post(addTocart);
router.route("/getCartData/:userId").get(getCartData);

export default router;
