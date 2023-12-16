import { catchAsyncError } from "../middleware/catchAsyncError.js";
import Hotel from "../model/hotel.model.js";
import User from '../model/user.model.js'
import ErrorHandler from "../utils/ErrorHandler.js";


export const register = catchAsyncError(async (req,res,next) =>{
    try {
        const {name, email, password} = req.body

        if(!name || !email || !password) return next(new ErrorHandler("enter all the fields",400))

        let user = await User.findOne({email})

        if(user) return next(new ErrorHandler("user already exixts",400))

        user = await User.create({
            name,
            email,
            password
        })

        res.status(201).json({
            success: true,
        })
    } catch (err) {
        return next(new ErrorHandler(err.message,400))
    }    
    
})

export const login = catchAsyncError(async (req,res,next) =>{
    try {
        const {email,password} = req.body

        if(!email || !password) return next(new ErrorHandler("enter all the fields",400))

        const user = await User.findOne({email})

        if(!user) {
            return next(new ErrorHandler("user not found",400))
        }
        res.status(200).json({
            success: true,
            user
        })
    } catch (err) {
        return next(new ErrorHandler(err.message,400))
    }        
})

