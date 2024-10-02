import express from "express";
import { registerUser } from "../controllers/users/register.controller";
import { UserRegisterValidation } from "../validations/users/register.validation";
import { validateRequest } from "../middlewares/validate-request.middleware";
import { UserLoginValidation } from "../validations/users/login.validation";
import { loginUser } from "../controllers/users/login.controller";
import { verifyEmail } from "../controllers/users/verify-email.controller";
import { forgotPasswordRequest } from "../controllers/users/forgot-password-request.controller";
import { ForgotPasswordRequestValidation } from "../validations/users/forgot-password-request.validation";
import { resetForgottenPassword } from "../controllers/users/reset-forgotten-password.controller";
import { ResetForgotPasswordRequestValidation } from "../validations/users/reset-forgotten-password.validation";
import { logoutUser } from "../controllers/users/logout-user.controller";
import { getUserProfile } from "../controllers/users/get-user-profile.controller";
import { updateUserProfile } from "../controllers/users/update-user-profile.controller";
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

router.route("/me").get(
    getUserProfile
);

router.route("/me").put(
    UpdateUserProfileValidation(),
    validateRequest,
    updateUserProfile
);


export default router;