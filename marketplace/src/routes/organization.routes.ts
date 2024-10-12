import express from "express";
import { getOrganizationDetails } from "../controllers/organization/get-organization-details.controller";
import { getOrganizationMembers } from "../controllers/organization/get-organization-members.controller";
import { updateOrganizationDetails } from "../controllers/organization/update-organization-details.controller";
import { UpdateOrganizationDetailsValidation } from "../validations/organization/update-organization-details.validation";
import { validateRequest } from "../middlewares/validate-request.middleware";

const router = express.Router();

router.route("/").get(
    getOrganizationDetails
);

router.route("/").put(
    UpdateOrganizationDetailsValidation(),
    validateRequest,
    updateOrganizationDetails
);

router.route("/members").get(
    getOrganizationMembers
);


export default router;