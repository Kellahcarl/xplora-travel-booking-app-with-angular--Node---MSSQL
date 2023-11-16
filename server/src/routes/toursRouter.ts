import { Router } from "express";
import { verifyToken } from "../middleware/verifyToken";
import { createTour, deleteTour, getTour, getTours, updateTour } from "../controllers/toursController";

const tour_router = Router();

tour_router.get("/", verifyToken, getTours)
tour_router.post("/", verifyToken, createTour)
tour_router.put("/", verifyToken, updateTour)
tour_router.get("/:tour_id", verifyToken, getTour)
tour_router.delete("/:tour_id", verifyToken, deleteTour)

export default tour_router;