import {app} from "./app.js";
import connectDB from "./DB/db.js";
import dotenv from 'dotenv'
dotenv.config()


app.listen(process.env.PORT,() =>{
    console.log('server is running')
    connectDB()
})