import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

// An interface that describes the properties that are required to invited users
interface InvitedUsersAttr {
    userId: string,
    email: string
}

// An interface that describes the properties that a invited users Document has
interface InvitedUsersDoc extends mongoose.Document {
    id: string,
    userId: string,
    email: string,
    createdAt: string,
    updatedAt: string
}

// An interface that describes the properties that a invited users Model has
interface InvitedUsersModel extends mongoose.Model<InvitedUsersDoc> {
    build(attrs: InvitedUsersAttr): InvitedUsersDoc
}

const invitedUsersSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        email: {
            type: String,
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

invitedUsersSchema.set("versionKey", "version");
invitedUsersSchema.plugin(updateIfCurrentPlugin);

invitedUsersSchema.statics.build = (attrs: InvitedUsersAttr) => {
    return new InvitedUsers(attrs);
};

const InvitedUsers = mongoose.model<InvitedUsersDoc, InvitedUsersModel>("InvitedUsers", invitedUsersSchema);

export { InvitedUsers, InvitedUsersDoc, InvitedUsersAttr };
