import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

// An interface that describes the properties that are required to Organization
interface OrganizationAttr {
    id: string,
    owner: string,
    name?: string | null,
    website?: string | null,
    industry?: string | null,
    noOfEmployees?: number | null,
    tagline?: string | null,
    description?: string | null,
    logo?: string | null,
    team?: string[] | null
}

// An interface that describes the properties that a Organization Document has
interface OrganizationDoc extends mongoose.Document {
    owner: string,
    name: string | null,
    website: string | null,
    industry: string | null,
    noOfEmployees: number | null,
    tagline: string | null,
    description: string | null,
    logo: string | null,
    team: string[] | null
}

// An interface that describes the properties that a Organization Model has
interface OrganizationModel extends mongoose.Model<OrganizationDoc> {
    build(attrs: OrganizationAttr): OrganizationDoc
}

const organizationSchema = new mongoose.Schema(
    {
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        name: {
            type: String,
            default: null
        },
        website: {
            type: String,
            default: null
        },
        industry: {
            type: String,
            default: null
        },
        noOfEmployees: {
            type: Number,
            default: null
        },
        tagline: {
            type: String,
            default: null
        },
        description: {
            type: String,
            default: null
        },
        logo: {
            type: String,
            default: null
        },
        team: {
            type: [mongoose.Schema.Types.ObjectId],
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

organizationSchema.set("versionKey", "version");
organizationSchema.plugin(updateIfCurrentPlugin);

organizationSchema.statics.build = (attrs: OrganizationAttr) => {
    return new Organization(attrs);
};

const Organization = mongoose.model<OrganizationDoc, OrganizationModel>("Organization", organizationSchema);

export { Organization, OrganizationDoc, OrganizationAttr };
