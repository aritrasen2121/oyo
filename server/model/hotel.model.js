import { Schema, model } from "mongoose";


const hotelSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    location:{
        type: String,
        required: true
    },
    ratings: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    maplocation: {
        type: String,
        required: true
    }
    
})

export default model("hotel",hotelSchema)