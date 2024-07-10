const cartController = require("../controllers/cartControler");
const express = require("express");


const router = express.Router();


router.post("/AddCart/:productId", cartController.addTocart);
router.get("/getcart",cartController.getCartData );
router.put("/decresscart/:id",cartController.decreaseQuantity );
router.delete("/removecart/:id",cartController.decreaseQuantity );
router.delete('/clearCart', cartController.clearCart);




module.exports = router;

