import express from "express";
import { registerUser } from "../controllers/users/register.controller";
import { UserRegisterValidation } from "../validations/users/register.validation";
import { validateRequest } from "../middlewares/validate-request.middleware";
import { UserLoginValidation } from "../validations/users/login.validation";
import { loginUser } from "../controllers/users/login.controller";

const router = express.Router();

router.route("/register").post(
    UserRegisterValidation(),
    validateRequest,
    registerUser
);

router.route("/login").post(
    UserLoginValidation(),
    validateRequest,
    loginUser
);

// router.route("/login").post(userLoginValidator(), validate, loginUser);
// router.route("/refresh-token").post(refreshAccessToken);

export default router;