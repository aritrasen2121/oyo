import dotenv from "dotenv";
dotenv.config();
import { catchAsyncError } from "../middleware/catchAsyncError.js";
import { instance } from "../app.js";
import crypto from 'crypto'

export const checkout = catchAsyncError(async (req, res) => {
  const options = {
    amount: Number(req.body.amount * 100), // amount in the smallest currency unit
    currency: "INR",
  };
  const order = await instance.orders.create(options);
  res.status(200).json({
    success: true,
    order,
  });
});

export const paymentVerification = catchAsyncError(async (req, res) => {
  const {razorpay_payment_id,razorpay_order_id,razorpay_signature} = req.body
  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
    .update(body.toString())
    .digest("hex");
  
    const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    
    res.redirect(
      `http://localhost:5173/paymentsuccessful`
    );
  } else {
    res.status(400).json({
      success: false,
    });
  }
});

export const getKey = catchAsyncError(async (req, res) => {
  res.status(200).json({
    success: true,
    key: process.env.RAZORPAY_API_KEY,
  });
});
