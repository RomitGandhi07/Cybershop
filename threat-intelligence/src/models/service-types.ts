import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

// An interface that describes the properties that are required to create a new Service Type
interface ServiceAttr {
    name: string,
}

// An interface that describes the properties that a Service Type Document has
interface ServiceTypeDoc extends mongoose.Document {
    id: string,
    name: string,
    version: string
}

// An interface that describes the properties that a Service Type Model has
interface ServiceTypeModel extends mongoose.Model<ServiceTypeDoc> {
    build(attrs: ServiceAttr): ServiceTypeDoc
}

const serviceTypeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
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

serviceTypeSchema.set("versionKey", "version");
serviceTypeSchema.plugin(updateIfCurrentPlugin);

serviceTypeSchema.statics.build = (attrs: ServiceAttr) => {
    return new ServiceType(attrs);
};

const ServiceType = mongoose.model<ServiceTypeDoc, ServiceTypeModel>("ServiceType", serviceTypeSchema);

export { ServiceType, ServiceTypeDoc as ServiceDoc, ServiceAttr };
