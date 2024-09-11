import express from "express";
import { registerUser } from "../controllers/users/register.controller";
import { UserRegisterValidation } from "../validations/users/register.validation";
import { validateRequest } from "../middlewares/validate-request.middleware";
const router = express.Router();

router.route("/register").post(
    UserRegisterValidation(),
    validateRequest,
    registerUser
);

// router.route("/login").post(userLoginValidator(), validate, loginUser);
// router.route("/refresh-token").post(refreshAccessToken);

export default router;