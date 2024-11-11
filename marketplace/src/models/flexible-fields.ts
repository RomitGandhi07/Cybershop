import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";
import { FlexibleFieldValue } from "../interfaces";

// An interface that describes the properties that are required in values


interface IncidentFlexibleEventAttr {
    id: string,
    version: number
}

// An interface that describes the properties that Flexible fields attrs have
interface FlexibleValueAttr {
    name: string,
    key: string,
    values: FlexibleFieldValue[],
    multiChoice: boolean,
    creatable: boolean
}

// An interface that describes the properties that a flexible field has
interface FlexibleFieldDoc extends mongoose.Document {
    id: string,
    name: string,
    key: string,
    values: FlexibleFieldValue[],
    multiChoice: boolean,
    creatable: boolean,
    createdAt: string,
    updatedAt: string,
    version: number
}

// An interface that describes the properties that a Industry Flexible Field Model has
interface IncidentFlexibleFieldModel extends mongoose.Model<FlexibleFieldDoc> {
    build(attrs: FlexibleValueAttr): FlexibleFieldDoc;
    findByEvent(event: IncidentFlexibleEventAttr): Promise<FlexibleFieldDoc>;
}

const ValuesSchema = new mongoose.Schema({
    value: {
        type: String,
        required: true
    }
},
{
    versionKey: false,
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
        },
    },
});

const flexibleFieldSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        key: {
            type: String,
            required: true,
            unique: true
        },
        values: {
            type: [ValuesSchema],
            required: true
        },
        multiChoice: {
            type: Boolean,
            required: true
        },
        creatable: {
            type: Boolean,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        updatedAt: {
            type: Date,
            default: Date.now,
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

flexibleFieldSchema.set("versionKey", "version");
flexibleFieldSchema.plugin(updateIfCurrentPlugin);

flexibleFieldSchema.pre("save", function (done) {
    // eslint-disable-next-line no-invalid-this
    this.updatedAt = new Date();
    done();
});

flexibleFieldSchema.statics.build = (attrs: FlexibleValueAttr) => {
    return new FlexibleField(attrs);
};

flexibleFieldSchema.statics.findByEvent = (event: IncidentFlexibleEventAttr) => {
    return FlexibleField.findOne({ _id: event.id, version: event.version - 1 });
};

const FlexibleField = mongoose.model<FlexibleFieldDoc, IncidentFlexibleFieldModel>("FlexibleFields", flexibleFieldSchema);

export { FlexibleField, FlexibleFieldDoc };
