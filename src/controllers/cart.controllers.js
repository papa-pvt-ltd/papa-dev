import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/apiError.js";
import { ApiResponse } from "../../utils/apiResponse.js";

import { Cart } from "../models/cart.models.js";
import { Product } from "../models/products.models.js";
import { User } from "../models/user.models.js";

// const addTocart = asyncHandler(async (req, res) => {
//   const { productId } = req.params;
//   const { userId, productname, price } = req.body;

//   if (!userId || !productId || !productname || !price) {
//     return res
//       .status(400)
//       .send(new ApiError(400, "Invalid request. Missing required fields."));
//   }
//   // Check if the product is already in the cart for this user
//   let cartItem = await Cart.findOne({ userId, productId });

//   if (cartItem) {
//     // If product exists in cart, increment the quantity
//     cartItem.quantity += 1;
//   } else {
//     // If not, create a new cart item with quantity 1
//     cartItem = new Cart({ userId, productId, productname, price, quantity: 1 });
//   }

//   const savedCartItem = await cartItem.save();
//   return res
//     .status(200)
//     .send(new ApiResponse(200, savedCartItem, "product added to cart"));
// });
const addTocart = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const { userId } = req.body;
  if (!userId) {
    throw new ApiError(400, "invalid request missing required details");
  }
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(400, "Invalid user");
  }
  const product = await Product.findById(productId);
  if (!product) {
    throw new ApiError(400, "Invalid request");
  }

  // retrive data from product models
  const productname = product.productname;
  const price = product.price;

  // Use findOneAndUpdate for atomic increment or creation if the item doesn't exist
  const updatedCartItem = await Cart.findOneAndUpdate(
    { userId, productId }, // Search criteria
    {
      $inc: { quantity: 1 }, // Increment quantity by 1 if exists
      $setOnInsert: { userId, productId, productname, price }, // Insert details if not found
    },
    { new: true, upsert: true } // Return the updated document, create if not found
  );

  // Return success response
  return res
    .status(201) // 201 for creation/update
    .send(
      new ApiResponse(
        201,
        updatedCartItem,
        "Product added to cart successfully"
      )
    );
});

// const getCartData1 = async (req, res) => {
//   const userId = req.query.userId; // Get userId from query parameters
//   // console.log('Received userId:', userId, 'Type:', typeof userId); // Debugging line

//   try {
//     if (!mongoose.Types.ObjectId.isValid(userId)) {
//       return res.status(400).json({ error: "Invalid userId" });
//     }

//     // console.log('Fetching cart data for userId:', userId); // Debugging line
//     // Correctly use new mongoose.Types.ObjectId to ensure the userId is in the right format
//     const objectId = new mongoose.Types.ObjectId(userId);
//     const cartItems = await Cart.find({ userId: objectId }).populate(
//       "productId"
//     );
//     // console.log('Cart items fetched:', cartItems); // Debugging line
//     res.json(cartItems); // Ensure this sends a valid JSON response
//   } catch (error) {
//     console.error("Error fetching cart data:", error);
//     res.status(500).json({ error: "Error fetching cart data" }); // Return error as JSON
//   }
// };

const getCartData = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  // Check if userId is provided
  if (!userId) {
    throw new ApiError(400, "invalid request missing required details");
  }

  const cartItems = await Cart.find({ userId }).populate(
    "productId",
    "productname price"
  ); // Populate product details

  if (!cartItems || cartItems.length === 0) {
    return res
      .status(200)
      .send(new ApiResponse(200, {}, "No items in the cart"));
  }
  return res.status (200).send(new ApiResponse (200, cartItems, 'cart items fetched successfully'))
});

export { addTocart, getCartData };
