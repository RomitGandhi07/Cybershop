import express from "express";
import { validateRequest } from "../middlewares/validate-request.middleware";
import { getUserProfile } from "../controllers/user-profile/get-user-profile.controller";
import { updateUserProfile } from "../controllers/user-profile/update-user-profile.controller";
import { UpdateUserProfileValidation } from "../validations/users/update-user-profile.validation";

const router = express.Router();

router.route("/me").get(
    getUserProfile
);

router.route("/me").put(
    UpdateUserProfileValidation(),
    validateRequest,
    updateUserProfile
);


export default router;