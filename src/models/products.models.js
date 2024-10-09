import mongoose, { Schema } from "mongoose";

const ProductSchema = new Schema(
  {
    productname: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    category: [
      {
        type: String,
        enum: ["toys", "apperals", "chepals"],
      },
    ],
    bestseller: {
      type: Boolean,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: [String],
      required: true,
    },
    age: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    stock: {
      type: String,
      required: true,
    },
    firm: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Firm",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Product = mongoose.model("Product", ProductSchema);
