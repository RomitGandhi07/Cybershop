import mongoose from "mongoose";

export const referenceValueMongooseSchema = (ref?: string) => {
    return ref ? new mongoose.Schema(
        {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref,
                required: true,
            },
            value: {
                type: String,
                default: "",
            },
        },
        {
            _id: false,
            versionKey: false
        }
    ) :  new mongoose.Schema(
        {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
            },
            value: {
                type: String,
                default: "",
            },
        },
        {
            _id: false,
            versionKey: false
        });
};
