import express from "express";
import { registerUser } from "../controllers/users/register.controller";
const router = express.Router();

router.route("/register").post(registerUser);
// router.route("/login").post(userLoginValidator(), validate, loginUser);
// router.route("/refresh-token").post(refreshAccessToken);

export default router;