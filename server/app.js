import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import userRouter from './route/user.route.js';
import { errorMiddleware } from './middleware/error.js';
import cors from 'cors'
import hotelRouter from './route/hotel.route.js';
import paymentRouter from './route/payment.route.js';
import Razorpay from 'razorpay'


export const app =express()

//middleware
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended: true}));

export const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_API_SECRET,
});

//route
app.use("/api/v1",userRouter)
app.use('/api/v1',hotelRouter)
app.use('/api/v1',paymentRouter)

//testing api
app.get("/test",(req,res,next) =>{
    res.status(200).json({
        success: true,
        message: "api is working"
    })
})

app.all("*",(req,res,next) =>{
    const err = new Error(`route ${req.originalUrl} not found`);
    err.statusCode=404
    next(err)
})

app.use(errorMiddleware)
