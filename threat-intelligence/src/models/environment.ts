/* eslint-disable */ 
import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

interface EnvironmentAttrs {
    organizationId: string,

    // Enviroment General Attrs
    generalInformation?: {
        numberOfADUsers?: number,
        numberOfPhysicalServers?: number,
        numberOfVirtualServers?: number,
        virtualization?: string[],
        serverOSs?: string[],
        numberOfWorkstations?: number,
        workstationOSs?: string[],
        outOfBandManagement?: string[],
        outOfBandManagementNotes?: string,
    },

    // Backup Attrs
    backup?: {
        backupSolution?: string[],
        backupSource?: string[],
        backupType?: string[],
        backupsDomainJoined?: string[],
        backupNotes?: string,
    },

    // Email Attrs
    email?: {
        emailSolution?: string[],
        emailAuthentication?: string[],
        emailNotes?: string,
    },

    // IT & Security controls || Solution Attrs
    itAndSecurityControls?: {
        firewallSolution?: string[],
        firewallNotes?: string,
        antivirusSolution?: string[],
        antivirusNotes?: string,
        edrSolution?: string[],
        edrNotes?: string,
        mfaDeployed?: string[],
        mfaSolutions?: string[],
        remoteAccessSolution?: string[],
        remoteAccessNotes?: string,
        systemManagementSolution?: string[],
        systemManagementNotes?: string,
        pamSolution?: string[],
        pamSolutionNotes?: string,
        segmentationSolution?: string[],
        segmentationSolutionNotes?: string
    }
}

interface EnvironmentDoc extends mongoose.Document {
    id: string,
    organizationId: string,

    // General Docs
    generalInformation: {
        numberOfADUsers: number | null,
        numberOfPhysicalServers: number | null,
        numberOfVirtualServers: number | null,
        virtualization: string[] | null,
        serverOSs: string[] | null,
        numberOfWorkstations: number | null,
        workstationOSs: string[] | null,
        outOfBandManagement: string[] | null,
        outOfBandManagementNotes: string | null,
        createdAt: string,
        createdBy: string,
        updatedAt: string | null,
        updatedBy: string | null,
    } | null | {},

    // backup Docs
    backup: {
        backupSolution: string[] | null,
        backupSource: string[] | null,
        backupType: string[] | null,
        backupsDomainJoined: string[] | null,
        backupNotes: string | null,
        createdAt: string,
        createdBy: string,
        updatedAt: string | null,
        updatedBy: string | null,
    } | null | {},

    // Email Docs
    email: {
        emailSolution: string[] | null,
        emailAuthentication: string[] | null,
        emailNotes: string | null,
        createdAt: string,
        createdBy: string,
        updatedAt: string | null,
        updatedBy: string | null,
    } | null | {},

    // Solution Docs
    itAndSecurityControls: {
        firewallSolution: string[] | null,
        firewallNotes: string | null,
        antivirusSolution: string[] | null,
        antivirusNotes: string | null,
        edrSolution: string[] | null,
        edrNotes: string | null,
        mfaDeployed: string[] | null,
        mfaSolutions: string[] | null,
        remoteAccessSolution: string[] | null,
        remoteAccessNotes: string | null,
        systemManagementSolution: string[] | null,
        systemManagementNotes: string | null,
        pamSolution: string[] | null,
        pamSolutionNotes: string | null,
        segmentationSolution: string[] | null,
        segmentationSolutionNotes: string | null,
        createdAt: string,
        createdBy: string,
        updatedAt: string | null,
        updatedBy: string | null,
    } | null | {},

    version: number
}

// An interface that describes the properties that a Organization Enviroment Module model has
interface EnvironmentModel extends mongoose.Model<EnvironmentDoc> {
    build(attrs: EnvironmentAttrs): EnvironmentDoc
}

const environmentGeneralSchema = new mongoose.Schema(
    {
        numberOfADUsers: {
            type: Number,
            default: null
        },
        numberOfPhysicalServers: {
            type: Number,
            default: null
        },
        numberOfVirtualServers: {
            type: Number,
            default: null
        },
        virtualization: {
            type: [mongoose.Schema.Types.ObjectId],
            default: []
        },
        serverOSs: {
            type: [mongoose.Schema.Types.ObjectId],
            default: null
        },
        numberOfWorkstations: {
            type: Number,
            default: null
        },
        workstationOSs: {
            type: [mongoose.Schema.Types.ObjectId],
            default: null
        },
        outOfBandManagement: {
            type: [mongoose.Schema.Types.ObjectId],
            default: null
        },
        outOfBandManagementNotes: {
            type: String,
            default: null
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            default: null
        },
        updatedAt: {
            type: Date,
            default: Date.now
        },
        updatedBy: {
            type: mongoose.Schema.Types.ObjectId,
            default: null
        }
    }, { _id: false }
);

const environmentActiveDirectorySchema = new mongoose.Schema(
    {
        numberOfDCs: {
            type: Number,
            default: null
        },
        numberOfDomains: {
            type: Number,
            default: null
        },
        trustRelationships: {
            type: [mongoose.Schema.Types.ObjectId],
            default: null
        },
        adFunctionalLevel: {
            type: [mongoose.Schema.Types.ObjectId],
            default: null
        },
        azureAD: {
            type: Boolean,
            default: null
        },
        azurePasswordWriteback: {
            type: Boolean,
            default: null
        },
        adNotes: {
            type: String,
            default: null
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            default: null
        },
        updatedAt: {
            type: Date,
            default: Date.now
        },
        updatedBy: {
            type: mongoose.Schema.Types.ObjectId,
            default: null
        }
    }, { _id: false }
);

const environmentBackupsSchema = new mongoose.Schema(
    {
        backupSolution: {
            type: [mongoose.Schema.Types.ObjectId],
            default: null
        },
        backupSource: {
            type: [mongoose.Schema.Types.ObjectId],
            default: null
        },
        backupType: {
            type: [mongoose.Schema.Types.ObjectId],
            default: null
        },
        backupsDomainJoined: {
            type: [mongoose.Schema.Types.ObjectId],
            default: null
        },
        backupNotes: {
            type: String,
            default: null
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            default: null
        },
        updatedAt: {
            type: Date,
            default: Date.now
        },
        updatedBy: {
            type: mongoose.Schema.Types.ObjectId,
            default: null
        }
    }, { _id: false }
);

const environmentEmailSchema = new mongoose.Schema(
    {
        emailSolution: {
            type: [mongoose.Schema.Types.ObjectId],
            default: null
        },
        emailAuthentication: {
            type: [mongoose.Schema.Types.ObjectId],
            default: null
        },
        emailNotes: {
            type: String,
            default: null
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            default: null
        },
        updatedAt: {
            type: Date,
            default: Date.now
        },
        updatedBy: {
            type: mongoose.Schema.Types.ObjectId,
            default: null
        }
    }, { _id: false }
);

const environmentSolutionsSchema = new mongoose.Schema(
    {
        firewallSolution: {
            type: [mongoose.Schema.Types.ObjectId],
            default: null
        },
        firewallNotes: {
            type: String,
            default: null
        },
        antivirusSolution: {
            type: [mongoose.Schema.Types.ObjectId],
            default: null
        },
        antivirusNotes: {
            type: String,
            default: null
        },
        edrSolution: {
            type: [mongoose.Schema.Types.ObjectId],
            default: null
        },
        edrNotes: {
            type: String,
            default: null
        },
        mfaDeployed: {
            type: [mongoose.Schema.Types.ObjectId],
            default: null
        },
        mfaSolutions: {
            type: [mongoose.Schema.Types.ObjectId],
            default: null
        },
        pamSolution: {
            type: [mongoose.Schema.Types.ObjectId],
            default: null
        },
        pamSolutionNotes: {
            type: String,
            default: null
        },
        segmentationSolution: {
            type: [mongoose.Schema.Types.ObjectId],
            default: null
        },
        segmentationSolutionNotes: {
            type: String,
            default: null
        },
        remoteAccessSolution: {
            type: [mongoose.Schema.Types.ObjectId],
            default: null
        },
        remoteAccessNotes: {
            type: String,
            default: null
        },
        systemManagementSolution: {
            type: [mongoose.Schema.Types.ObjectId],
            default: null
        },
        systemManagementNotes: {
            type: String,
            default: null
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            default: null
        },
        updatedAt: {
            type: Date,
            default: Date.now
        },
        updatedBy: {
            type: mongoose.Schema.Types.ObjectId,
            default: null
        }
    }, { _id: false }
);

const environmentSchema = new mongoose.Schema(
    {
        organizationId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Organization",
            required: true,
            unique: true
        },
        generalInformation: {
            type: environmentGeneralSchema,
            default: null
        },
        activeDirectory: {
            type: environmentActiveDirectorySchema,
            default: null
        },
        backup: {
            type: environmentBackupsSchema,
            default: null
        },
        email: {
            type: environmentEmailSchema,
            default: null
        },
        itAndSecurityControls: {
            type: environmentSolutionsSchema,
            default: null
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

environmentSchema.set("versionKey", "version");
environmentSchema.plugin(updateIfCurrentPlugin);

environmentSchema.statics.build = (attrs: EnvironmentAttrs) => {
    return new Environment(attrs);
};

const Environment = mongoose.model<EnvironmentDoc, EnvironmentModel>("environment", environmentSchema);

export { Environment, EnvironmentDoc };
