import { Router } from "express";
import { checkout, getKey, paymentVerification } from "../controllers/payment.conn.js";

const paymentRouter = Router();

paymentRouter.post("/checkout",checkout)
paymentRouter.post("/paymentverification",paymentVerification)
paymentRouter.get("/getkey",getKey)

export default paymentRouter