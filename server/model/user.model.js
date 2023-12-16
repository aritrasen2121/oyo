import { Schema, model } from "mongoose";


const userSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    bookings:[
        {
            type: Schema.Types.ObjectId,
            ref: 'hotel'
        }
    ]
    
})

export default model("user",userSchema)