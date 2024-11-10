import express from "express";
import { UpdateOrganizationDetailsValidation } from "../validations/organization/update-organization-details.validation";
import { validateRequest } from "../middlewares/validate-request.middleware";
import { updateEnvironmentDetails } from "../controllers/environment/update-environment-details.controller";
import { getEnvironmentDetails } from "../controllers/environment/get-environment-details.controller";


const router = express.Router();

router.route("/").get(
    getEnvironmentDetails
);

router.route("/").put(
    UpdateOrganizationDetailsValidation(),
    validateRequest,
    updateEnvironmentDetails
);


export default router;