import express from "express";
import { getServices } from "../controllers/service/get-services.controller";


const router = express.Router();

router.route("/").get(
    getServices
);




export default router;