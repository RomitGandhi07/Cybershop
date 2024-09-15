import mongoose from "mongoose";
import app from "./app";

/**
 * @method connectDatabase
 * @description This function will perform the Database connection via Mongo URI
 */
const connectDatabase = async () => {
    mongoose.set("strictQuery", true);
    mongoose.set("toJSON", { flattenMaps: false });
    //mongoose.set("sanitizeFilter", true);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    await mongoose.connect(process.env.MONGO_URI, {
        dbName: "authentication"
    });
    console.info("connect to db successfully");
};

/**
 * @method handleValidationError
 * @description This will handle the validation error for all the env variable keys
 */
const handleValidationError = () => {
    if (!process.env.MONGO_URI) {
        throw new Error("MONGO_URI must be defined");
    }
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET must be defined");
    }
    if (!process.env.MAIL_USER || !process.env.MAIL_PASSWORD) {
        throw new Error("Mail user and password must be defined");
    }
};

const main = async () => {
    handleValidationError();
    await connectDatabase();
}

main().then(() => {
    app.listen("3001", () => {
        console.info("Server is running on the port 3001");
    });
}).catch(err => {
    console.error(err);
})