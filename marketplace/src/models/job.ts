import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";
import { ReferenceValue } from "../interfaces";
import { referenceValueMongooseSchema } from "../utils/reference-value-mongoose-schema";
import { JobComplexityEnum } from "../enums/job-complexity";
import { JobExpertiseEnum } from "../enums/job-expertise";
import { JobDurationEnum } from "../enums/job-duration";
import { JobBudgetTypes } from "../enums/job-budget-types.enum";
import { JobStatusEnum } from "../enums/job-status.enum";

interface IJobBudget {
    type: JobBudgetTypes,
    fixedFee?: number | null
    hourlyRate?: {
        from: number,
        to: number
    } | null
}

// An interface that describes the properties that are required to create a new Job
interface JobAttr {
    organizationId: string,
    title: string,
    createdBy: ReferenceValue
}

// An interface that describes the properties that a Job Document has
interface JobDoc extends mongoose.Document {
    id: string,
    organizationId: string,
    title: string,
    services: ReferenceValue[] | null,
    complexity: JobComplexityEnum | null,
    expertise: JobExpertiseEnum | null,
    duration: JobDurationEnum | null,
    budget: IJobBudget | null,
    description: string | null,
    createdBy: ReferenceValue,
    updatedBy: ReferenceValue,
    createdAt: string,
    updatedAt: string,
    status: JobStatusEnum,
    published: boolean,
    publishedAt: string,
    version: string
}

// An interface that describes the properties that a Job Model has
interface JobModel extends mongoose.Model<JobDoc> {
    build(attrs: JobAttr): JobDoc
}

const jobSchema = new mongoose.Schema(
    {
        organizationId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Organization",
            required: true
        },
        title: {
            type: String,
            required: true
        },
        services: {
            type: [referenceValueMongooseSchema("Service")],
            default: null
        },
        complexity: {
            type: String,
            default: null
        },
        expertise: {
            type: String,
            default: null
        },
        duration: {
            type: String,
            default: null
        },
        budget: {
            type: mongoose.Schema.Types.Mixed,
            default: null
        },
        description: {
            type: String,
            default: null
        },
        status: {
            type: String,
            default: JobStatusEnum.DRAFT
        },
        published: {
            type: Boolean,
            default: false
        },
        createdBy: {
            type: referenceValueMongooseSchema("User"),
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        updatedAt: {
            type: Date,
            default: Date.now
        },
        publishedAt: {
            type: Date,
            default: null
        },
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

jobSchema.set("versionKey", "version");
jobSchema.plugin(updateIfCurrentPlugin);

jobSchema.statics.build = (attrs: JobAttr) => {
    return new Job(attrs);
};

const Job = mongoose.model<JobDoc, JobModel>("Job", jobSchema);

export { Job, JobDoc, JobAttr };
