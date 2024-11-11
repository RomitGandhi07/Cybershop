import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";
import { ReferenceValue } from "../interfaces";
import { referenceValueMongooseSchema } from "../utils/reference-value-mongoose-schema";

// An interface that describes the properties that are required to create a new Service
interface ServiceAttr {
    name: string,
    description: string,
    logo: string,
    type: ReferenceValue
}

// An interface that describes the properties that a Service Document has
interface ServiceDoc extends mongoose.Document {
    id: string,
    name: string,
    description: string,
    logo: string,
    type: ReferenceValue,
    version: string
}

// An interface that describes the properties that a Service Model has
interface ServiceModel extends mongoose.Model<ServiceDoc> {
    build(attrs: ServiceAttr): ServiceDoc
}

const serviceSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        logo: {
            type: String,
            required: true
        },
        type: {
            type: referenceValueMongooseSchema("ServiceType"),
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

serviceSchema.set("versionKey", "version");
serviceSchema.plugin(updateIfCurrentPlugin);

serviceSchema.statics.build = (attrs: ServiceAttr) => {
    return new Service(attrs);
};

const Service = mongoose.model<ServiceDoc, ServiceModel>("Service", serviceSchema);

export { Service, ServiceDoc, ServiceAttr };
