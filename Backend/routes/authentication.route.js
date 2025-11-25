import { registerUser, loginUser, logoutUser } from "../controllers/authentication.controller.js";
import express from "express";
import { verifyToken } from "../middlewares/verifyToken.middleware.js"
import { validateUser } from "../middlewares/express-validator-middleware.js";
const router = express.Router();

router.post("/register", validateUser, registerUser);
router.post("/login", validateUser, loginUser);
router.get("/logout", verifyToken, logoutUser);




export default router;