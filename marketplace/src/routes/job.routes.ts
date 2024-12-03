import express from "express";
import { creteJobPost } from "../controllers/job/create-job-post.controller";
import { validateRequest } from "../middlewares/validate-request.middleware";
import { CreateJobPostValidation } from "../validations/job/create-job-post.validation";
import { updateJobPost } from "../controllers/job/update-job-post.controller";
import { getJobPostDetailsForSeviceProvider } from "../controllers/job/get-job-post-details-for-service-provider.controller";
import { UpdateJobPostValidation } from "../validations/job/update-job-post.validation";
import { wishlistJobPost } from "../controllers/job/wishlist-job-post.controller";
import { listWishlistedJobPostsForServiceProvider } from "../controllers/job/list-wishlisted-job-posts-for-service-provider.controller";
import { listJobPostsForServiceProvider } from "../controllers/job/list-job-posts-for-service-provider.controller";
import { publishJobPost } from "../controllers/job/publish-job-post.controller";
import { listActiveJobPostsForClient } from "../controllers/job/list-active-job-posts-for-client.controller";
import { listDraftJobPostsForClient } from "../controllers/job/list-draft-job-posts-for-client.controller";
import { listCompletedJobPostsForClient } from "../controllers/job/list-completed-job-posts-for-client.controller";
import { deleteJobPost } from "../controllers/job/delete-job-post.controller";
import { createJobProposal } from "../controllers/proposal/create-proposal.controller";
import { listProposal } from "../controllers/proposal/list-proposal.controller";
import { getProposalDetails } from "../controllers/proposal/get-proposal-details.controller";
import { deleteProposal } from "../controllers/proposal/delete-proposal.controller";
import { updateProposalStatus } from "../controllers/proposal/update-proposal-status.controller";


const router = express.Router();

router.route("/").post(
    CreateJobPostValidation,
    validateRequest,
    creteJobPost
);

router.route("/serviceProvider").get(
    listJobPostsForServiceProvider
);

router.route("/serviceProvider/wishlist").get(
    listWishlistedJobPostsForServiceProvider
);

router.route("/client").get(
    listActiveJobPostsForClient
);

router.route("/client/draft").get(
    listDraftJobPostsForClient
);

router.route("/client/completed").get(
    listCompletedJobPostsForClient
);

router.route("/:jobId").put(
    UpdateJobPostValidation,
    validateRequest,
    updateJobPost
);

router.route("/:jobId").delete(
    deleteJobPost
);

router.route("/:jobId/serviceProvider").get(
    getJobPostDetailsForSeviceProvider
);

router.route("/:jobId/client").get(
    getJobPostDetailsForSeviceProvider
);

router.route("/:jobId/publish").put(
    publishJobPost
);

router.route("/:jobId/wishlist").put(
    wishlistJobPost
);

router.route("/:jobId/proposals").post(
    createJobProposal
)

router.route("/:jobId/proposals").get(
    listProposal
);

router.route("/:jobId/proposals/:proposalId").get(
    getProposalDetails
);

router.route("/:jobId/proposals/:proposalId").delete(
    deleteProposal
);

router.route("/:jobId/proposals/:proposalId/status").put(
    updateProposalStatus
);

export default router;