import { Router } from "express";
import { addHotel, getHotelById, getHotelByQuery, getHotels } from "../controllers/hotel.conn.js";

const hotelRouter = Router();

hotelRouter.get("/hotels",getHotels)
hotelRouter.get("/hotel/:id",getHotelById)
hotelRouter.get("/hotel",getHotelByQuery)
hotelRouter.post('/addhotel',addHotel)


export default hotelRouter