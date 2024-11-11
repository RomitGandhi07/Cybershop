import express from "express";
import { creteJobPost } from "../controllers/job/create-job-post.controller";
import { validateRequest } from "../middlewares/validate-request.middleware";
import { CreateJobPostValidation } from "../validations/job/create-job-post.validation";
import { updateJobPost } from "../controllers/job/update-job-post.controller";
import { getJobPostDetails } from "../controllers/job/get-job-post-details.controller";
import { UpdateJobPostValidation } from "../validations/job/update-job-post.validation";
import { wishlistJobPost } from "../controllers/job/wishlist-job-post.controller";
import { listWishlistedJobPosts } from "../controllers/job/list-wishlisted-job-posts";
import { listJobPosts } from "../controllers/job/list-job-posts";
import { publishJobPost } from "../controllers/job/publish-job-post.controller";


const router = express.Router();

router.route("/").post(
    CreateJobPostValidation,
    validateRequest,
    creteJobPost
);

router.route("/").get(
    listJobPosts
);

router.route("/wishlist").get(
    listWishlistedJobPosts
);

router.route("/:jobId").put(
    UpdateJobPostValidation,
    validateRequest,
    updateJobPost
);

router.route("/:jobId").get(
    getJobPostDetails
);

router.route("/:jobId/publish").put(
    publishJobPost
);

router.route("/:jobId/wishlist").put(
    wishlistJobPost
);

export default router;