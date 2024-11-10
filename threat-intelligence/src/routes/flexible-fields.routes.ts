import express from "express";
import { validateRequest } from "../middlewares/validate-request.middleware";
import { getFlexibleFields } from "../controllers/flexible-fields/get-flexible-fields.controller";
import { getFlexibleFieldsByKeys } from "../controllers/flexible-fields/get-flexible-fields-by-keys.controller";
import { GetFlexibleFieldsByKeysValidation } from "../validations/flexible-fields/get-flexible-fields-by-keys.validation";

const router = express.Router();

router.route("/").get(
    getFlexibleFields
);

router.route("/byKeys").post(
    GetFlexibleFieldsByKeysValidation,
    validateRequest,
    getFlexibleFieldsByKeys
);


export default router;