import express from "express";
import { createJobProposal } from "../controllers/proposal/create-proposal.controller";
import { getProposalDetails } from "../controllers/proposal/get-proposal-details.controller";
import { deleteProposal } from "../controllers/proposal/delete-proposal.controller";
import { listProposal } from "../controllers/proposal/list-proposal.controller";


const router = express.Router();



export default router;