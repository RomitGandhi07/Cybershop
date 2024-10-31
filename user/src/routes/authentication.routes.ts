import express from "express";
import { registerUser } from "../controllers/authentication/register.controller";
import { UserRegisterValidation } from "../validations/authentication/register.validation";
import { validateRequest } from "../middlewares/validate-request.middleware";
import { UserLoginValidation } from "../validations/authentication/login.validation";
import { loginUser } from "../controllers/authentication/login.controller";
import { verifyEmail } from "../controllers/authentication/verify-email.controller";
import { forgotPasswordRequest } from "../controllers/authentication/forgot-password-request.controller";
import { ForgotPasswordRequestValidation } from "../validations/authentication/forgot-password-request.validation";
import { resetForgottenPassword } from "../controllers/authentication/reset-forgotten-password.controller";
import { ResetForgotPasswordRequestValidation } from "../validations/authentication/reset-forgotten-password.validation";
import { logoutUser } from "../controllers/authentication/logout-user.controller";
import { forgotPasswordTokenValidate } from "../controllers/authentication/forgot-password-token-validate.controller";
import { ForgotPasswordTokenValidation } from "../validations/authentication/forgot-password-token-validate.validation";
import { authenticateUser } from "../middlewares/authenticate-user.middleware";
import { getInvitationDetails } from "../controllers/authentication/get-invitation-details.controller";

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
    .route("/forgotPassword/request")
    .post(
        ForgotPasswordRequestValidation(),
        validateRequest,
        forgotPasswordRequest
    );

router
    .route("/forgotPassword/validate")
    .post(
        ForgotPasswordTokenValidation,
        validateRequest,
        forgotPasswordTokenValidate
    );

router
    .route("/forgotPassword")
    .put(
        ResetForgotPasswordRequestValidation(),
        validateRequest,
        resetForgottenPassword
    );


router.route("/invitation").get(
    getInvitationDetails
);


// Secured Routes
router.route("/logout").post(
    authenticateUser,
    logoutUser
);


export default router;