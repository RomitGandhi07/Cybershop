import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

// An interface that describes the properties that are required to invited users
interface InvitedUsersAttr {
  id: string,
  userId: string,
  emailIds: string[]
}

// An interface that describes the properties that a invited users Document has
interface InvitedUsersDoc extends mongoose.Document {
  name: string,
  userId: string,
  emailIds: string[]
}

// An interface that describes the properties that a invited users Model has
interface InvitedUsersModel extends mongoose.Model<InvitedUsersDoc> {
  build(attrs: InvitedUsersAttr): InvitedUsersDoc
}

const invitedUsersSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        name: {
            type: [String],
            required: true
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

invitedUsersSchema.set("versionKey", "version");
invitedUsersSchema.plugin(updateIfCurrentPlugin);

invitedUsersSchema.statics.build = (attrs: InvitedUsersAttr) => {
    return new InvitedUsers(attrs);
};

const InvitedUsers = mongoose.model<InvitedUsersDoc, InvitedUsersModel>("InvitedUsers", invitedUsersSchema);

export { InvitedUsers, InvitedUsersDoc, InvitedUsersAttr };
