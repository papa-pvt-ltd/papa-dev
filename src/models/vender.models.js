import mongoose, { Schema } from "mongoose";

const VenderSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    firm: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Firm",
      },
    ],
    aadhaar: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Aadhaar",
      },
    ],
    pan: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pan",
      },
    ],
    capturePersonImage: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CapturePersonImage",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Vender = mongoose.model("Vender", VenderSchema);
