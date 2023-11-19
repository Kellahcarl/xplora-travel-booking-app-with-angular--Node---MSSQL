import { Router } from "express";
import { verifyToken } from "../middleware/verifyToken";
import {
  createBooking,
  deleteBooking,
  getBooking,
  getBookings,
  getUserBookings,
  updateBooking,
} from "../controllers/bookingController";

const booking_router = Router();

booking_router.get("/", verifyToken, getBookings);
booking_router.post("/", verifyToken, createBooking);
booking_router.put("/", verifyToken, updateBooking);
booking_router.get("/user/:user_id", verifyToken, getUserBookings);
booking_router.get("/:booking_id", verifyToken, getBooking);
booking_router.delete("/:booking_id", verifyToken, deleteBooking);

export default booking_router;
