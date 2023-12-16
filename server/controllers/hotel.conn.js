import { catchAsyncError } from '../middleware/catchAsyncError.js'
import Hotel from '../model/hotel.model.js'

export const getHotels = catchAsyncError(async (req,res,next) =>{
    try {
        const hotels=await Hotel.find();
        res.status(200).json({
            success: true,
            hotels
        })
    } catch (err) {
        return next(new ErrorHandler(err.message,400))
    }
})

export const getHotelById = catchAsyncError(async (req,res,next) =>{
    try {
        const id =req.params.id
        const hotel=await Hotel.findById(id);
        res.status(200).json({
            success: true,
            hotel
        })
    } catch (err) {
        return next(new ErrorHandler(err.message,400))
    }
})

export const getHotelByQuery = catchAsyncError(async (req,res,next) =>{
    try {
        const {query} =req.query;
        const hotel=await Hotel.find({$or:[{name:query}, {location: query}] });
        res.status(200).json({
            success: true,
            hotel
        })
    } catch (err) {
        return next(new ErrorHandler(err.message,400))
    }
})

export const addHotel = catchAsyncError(async (req,res,next) =>{
    try {
        const {name, image, description, location, ratings, price, maplocation} = req.body

        if(!name || !image || !description || !location || !ratings || !price || !maplocation) return next(new ErrorHandler("enter all the fields",400))

        const hotel = await Hotel.create({
            name, image, description, location, ratings, price, maplocation
        })

        res.status(201).json({
            success: true,
            hotel
        })
    } catch (err) {
        return next(new ErrorHandler(err.message,400))
    }    
    
})


