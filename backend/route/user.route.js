import express from "express"
import { login, logout, resetPassword, signup, verifyOtp } from "../controllers/user.controller.js";

const router = express.Router()

router.post("/signup",signup)
router.post("/verify-otp",verifyOtp)
router.post("/login",login)
router.post("/logout",logout)
router.post("/resetpassword",resetPassword) // need to be protected route

export default router;

