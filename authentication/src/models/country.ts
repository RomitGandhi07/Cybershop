import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

// An interface that describes the properties that are required to create a new Country
interface CountryAttr {
  id: string,
  name: string,
}

// An interface that describes the properties that a Country Document has
interface CountryDoc extends mongoose.Document {
  name: string,
  version: string
}

// An interface that describes the properties that a Country Model has
interface CountryModel extends mongoose.Model<CountryDoc> {
  build(attrs: CountryAttr): CountryDoc
}

const countrySchema = new mongoose.Schema(
    {
        name: {
            type: String,
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

countrySchema.set("versionKey", "version");
countrySchema.plugin(updateIfCurrentPlugin);

countrySchema.statics.build = (attrs: CountryAttr) => {
    return new Country({
        _id: attrs.id,
        name: attrs.name
    });
};

const Country = mongoose.model<CountryDoc, CountryModel>("Country", countrySchema);

export { Country, CountryDoc, CountryAttr };
