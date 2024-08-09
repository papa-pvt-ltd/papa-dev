const instance = require('../RazorpayInstence');
const crypto = require('crypto');
const Payment = require("../models/Payment.js");
const dotenv = require('dotenv');

dotenv.config();


const checkout = async (req, res) => {
  try {

    // Ensure req.body.amount is present and valid
    if (!req.body.amount || isNaN(Number(req.body.amount))) {
      throw new Error('Invalid or missing amount in request body');
    }

    const options = {
      amount: Number(req.body.amount * 100), // Convert amount to paise
      currency: "INR",
    };

    const order = await instance.orders.create(options);

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error('Error in checkout:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const paymentVerification = async (req, res) => {
  try {
    // console.log(req.body)
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.Key_Secret)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;
// console.log(expectedSignature)
// console.log(razorpay_signature,razorpay_order_id,razorpay_payment_id)
// console.log(isAuthentic)

    if (isAuthentic) {
      await Payment.create({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      });

      res.redirect(`http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`);  //its changed when going to live...
    } else {
      res.status(400).json({ success: false });
    }
  } catch (error) {
    console.error('Error in payment verification:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { checkout, paymentVerification };
