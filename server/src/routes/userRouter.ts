import { Router } from "express";
import {
  checkUserDetails,
  deleteUser,
  forgotPassword,
  getUser,
  getUsers,
  loginUser,
  registerUser,
  resetPassword,
  updateUser,
  updateUserProfile,
} from "../controllers/userController";
import { verifyToken } from "../middleware/verifyToken";

const user_router = Router();

user_router.post("/register", registerUser);
user_router.post("/login", loginUser);
user_router.post("/forgot", forgotPassword);
user_router.post("/reset", resetPassword);
user_router.post("/profile", updateUserProfile);

user_router.get("/", verifyToken, getUsers);
user_router.put("/", verifyToken, updateUser);
user_router.get("/check_user_details", verifyToken, checkUserDetails);
user_router.get("/:id", verifyToken, getUser);
user_router.delete("/:id", verifyToken, deleteUser);

export default user_router;
