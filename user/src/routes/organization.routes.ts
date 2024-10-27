import express from "express";
import { getOrganizationDetails } from "../controllers/organization/get-organization-details.controller";
import { getOrganizationMembers } from "../controllers/organization/get-organization-members.controller";
import { updateOrganizationDetails } from "../controllers/organization/update-organization-details.controller";
import { UpdateOrganizationDetailsValidation } from "../validations/organization/update-organization-details.validation";
import { validateRequest } from "../middlewares/validate-request.middleware";
import { inviteOrganizationMember } from "../controllers/organization/invite-organization-member.controller";
import { InviteOrganizationMemberValidation } from "../validations/organization/invite-organization-member.validation";

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

router.route("/members").put(
    InviteOrganizationMemberValidation,
    validateRequest,
    inviteOrganizationMember
);


export default router;