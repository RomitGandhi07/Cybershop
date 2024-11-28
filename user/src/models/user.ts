import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";
import { ReferenceValue } from "../interfaces";
import { referenceValueMongooseSchema } from "../utils/reference-value-mongoose-schema";
import { UserTypesEnum } from "../enums/user-types.enum";

// An interface that describes the properties to define a new User
interface UserAttrs {
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    country: ReferenceValue,
    type: UserTypesEnum,
    emailVerificationToken: string,
    emailVerificationExpiry: number,
    organizationId?: string | null
}

// An interface that describes the properties that User Document has
interface UserDoc extends mongoose.Document {
    id: string,
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    country: ReferenceValue,
    type: UserTypesEnum,
    isEmailVerified: boolean,
    forgotPasswordToken: string | null,
    forgotPasswordExpiry: number | null,
    emailVerificationToken: string | null,
    emailVerificationExpiry: number | null,
    refreshToken: string | null,
    organizationId: string | null,
    isEnabled: boolean,
    createdAt: string,
    updatedAt: string,
    version: number
}

// An interface that describes the properties that a User model has
interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs: UserAttrs): UserDoc,
}

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            unique: true,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        country: {
            type: referenceValueMongooseSchema("Country"),
            required: true
        },
        type: {
            type: String,
            required: true
        },
        isEmailVerified: {
            type: Boolean,
            default: false,
        },
        forgotPasswordToken: {
            type: String,
            default: null
        },
        forgotPasswordExpiry: {
            type: Date,
            default: null
        },
        emailVerificationToken: {
            type: String,
            default: null,
        },
        emailVerificationExpiry: {
            type: Date,
            default: null,
        },
        refreshToken: {
            type: String,
            default: null
        },
        organizationId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Organization",
            default: null
        },
        isEnabled: {
            type: Boolean,
            default: true
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

userSchema.set("versionKey", "version");
userSchema.plugin(updateIfCurrentPlugin);

userSchema.pre("save", function (done) {
    // eslint-disable-next-line no-invalid-this
    this.updatedAt = new Date();
    done();
});

userSchema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs);
};


const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User, UserModel, UserDoc };
