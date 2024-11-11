import express from "express";
import { creteProposal } from "../controllers/proposal/create-proposal.controller";
import { getProposalDetails } from "../controllers/proposal/get-proposal-details.controller";
import { deleteProposal } from "../controllers/proposal/delete-proposal.controller";
import { listProposal } from "../controllers/proposal/list-proposal.controller";


const router = express.Router();

router.route("/").post(
    creteProposal
);

router.route("/").get(
    listProposal
);

router.route("/:proposalId").get(
    getProposalDetails
);

router.route("/:proposalId").delete(
    deleteProposal
);


export default router;