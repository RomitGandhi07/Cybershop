import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";
import { JobDurationEnum } from "../enums/job-duration";
import { ProposalStatusEnum } from "../enums/job-status.enum copy";

interface IProposalTerms {
    type: string,
    projectFees: number | null,
    milestones: {
        description: string,
        date: string,
        amount: number   
    }[] | null
}

// An interface that describes the properties that are required to create a new Proposal
interface ProposalAttr {
    organizationId: string,
    userId: string,
    jobId: string,
    coverLetter: string,
    duration: JobDurationEnum,
    terms: IProposalTerms
}

// An interface that describes the properties that a Proposal Document has
interface ProposalDoc extends mongoose.Document {
    id: string,
    organizationId: string,
    userId: string,
    jobId: string,
    status: ProposalStatusEnum,
    coverLetter: string,
    duration: JobDurationEnum,
    terms: IProposalTerms,
    createdAt: string,
    updatedAt: string,
    version: string
}

// An interface that describes the properties that a Proposal Model has
interface ProposalModel extends mongoose.Model<ProposalDoc> {
    build(attrs: ProposalAttr): ProposalDoc
}

const proposalSchema = new mongoose.Schema(
    {
        organizationId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Organization",
            required: true
        },
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
        status: {
            type: String,
            default: ProposalStatusEnum.ACTIVE
        },
        coverLetter: {
            type: String,
            required: true
        },
        duration: {
            type: String,
            required: true
        },
        terms: {
            type: mongoose.Schema.Types.Mixed,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        updatedAt: {
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

proposalSchema.set("versionKey", "version");
proposalSchema.plugin(updateIfCurrentPlugin);

proposalSchema.statics.build = (attrs: ProposalAttr) => {
    return new Proposal(attrs);
};

const Proposal = mongoose.model<ProposalDoc, ProposalModel>("Proposal", proposalSchema);

export { Proposal, ProposalDoc, ProposalAttr };
