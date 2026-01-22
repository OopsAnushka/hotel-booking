import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { checkAvailabilityAPI, createBooking, getHotelBooking, getUserBooking } from "../controller/bookingcontroller.js";

const bookingRouter = express.Router();

bookingRouter.post('/check-availability', checkAvailabilityAPI);
bookingRouter.post('/book', protect, createBooking);
bookingRouter.get('/user', protect, getUserBooking);
bookingRouter.get('/hotel', protect, getHotelBooking);

export default bookingRouter;