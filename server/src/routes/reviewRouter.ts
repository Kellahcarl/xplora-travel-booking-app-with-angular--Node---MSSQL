import { Router } from "express";
import { verifyToken } from "../middleware/verifyToken";
import { createReview, deleteReview, getReview, getReviews, getUserReview, updateReview } from "../controllers/reviewController";


const review_router = Router();

review_router.get("/", verifyToken, getReviews);
review_router.post("/", verifyToken, createReview);
review_router.put("/", verifyToken, updateReview);
review_router.get("/user/:user_id", verifyToken, getUserReview);
review_router.get("/:review_id", verifyToken, getReview);
review_router.delete("/:review_id", verifyToken, deleteReview);

export default review_router;
