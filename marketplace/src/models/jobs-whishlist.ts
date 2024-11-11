import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

// An interface that describes the properties that are required to create a new JobsWhishlist
interface JobsWhishlistAttr {
    userId: string,
    jobId: string
}

// An interface that describes the properties that a JobsWhishlist Document has
interface JobsWhishlistDoc extends mongoose.Document {
    id: string,
    userId: string,
    jobId: string
    version: string
}

// An interface that describes the properties that a JobsWhishlist Model has
interface JobsWhishlistModel extends mongoose.Model<JobsWhishlistDoc> {
    build(attrs: JobsWhishlistAttr): JobsWhishlistDoc
}

const jobsWhishlistSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        jobId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Job",
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    },
    {
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
            },
        },
    }
);

jobsWhishlistSchema.set("versionKey", "version");
jobsWhishlistSchema.plugin(updateIfCurrentPlugin);

jobsWhishlistSchema.statics.build = (attrs: JobsWhishlistAttr) => {
    return new JobsWhishlist(attrs);
};

const JobsWhishlist = mongoose.model<JobsWhishlistDoc, JobsWhishlistModel>("JobsWhishlist", jobsWhishlistSchema);

export { JobsWhishlist, JobsWhishlistDoc, JobsWhishlistAttr };
