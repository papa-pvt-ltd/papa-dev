const wishlistControler = require('../controllers/wishlistController')
const express = require("express");


const router = express.Router();


router.post("/Addwishlist/:productId", wishlistControler.addToWishlist);
router.get("/getwishlist",wishlistControler.getWishList );
router.delete("/deletewishlist/:wishlistId",wishlistControler.deleteWishlist );


module.exports = router;