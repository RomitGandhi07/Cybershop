import express from "express";
import { registerUser } from "../controllers/authentication/register.controller";
import { UserRegisterValidation } from "../validations/users/register.validation";
import { validateRequest } from "../middlewares/validate-request.middleware";
import { UserLoginValidation } from "../validations/users/login.validation";
import { loginUser } from "../controllers/authentication/login.controller";
import { verifyEmail } from "../controllers/authentication/verify-email.controller";
import { forgotPasswordRequest } from "../controllers/authentication/forgot-password-request.controller";
import { ForgotPasswordRequestValidation } from "../validations/users/forgot-password-request.validation";
import { resetForgottenPassword } from "../controllers/authentication/reset-forgotten-password.controller";
import { ResetForgotPasswordRequestValidation } from "../validations/users/reset-forgotten-password.validation";
import { logoutUser } from "../controllers/authentication/logout-user.controller";
import { getUserProfile } from "../controllers/user-profile/get-user-profile.controller";
import { updateUserProfile } from "../controllers/user-profile/update-user-profile.controller";
import { UpdateUserProfileValidation } from "../validations/users/update-user-profile.validation";

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

// router.route("/refreshToken").post(refreshAccessToken);

router.route("/verifyEmail/:verificationToken").get(verifyEmail);

router
    .route("/forgotPassword")
    .post(
        ForgotPasswordRequestValidation(),
        validateRequest,
        forgotPasswordRequest
    );
router
    .route("/resetPassword")
    .put(
        ResetForgotPasswordRequestValidation(),
        validateRequest,
        resetForgottenPassword
    );


// Secured Routes
router.route("/logout").post(logoutUser);


export default router;