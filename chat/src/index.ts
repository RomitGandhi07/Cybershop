import mongoose from "mongoose";
import app from "./app";
import http from "http";
import { Server } from "socket.io";
import { createClient } from "redis";
import { createAdapter } from "@socket.io/redis-adapter";
import { SocketService } from "./services/socket";


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
        dbName: "chat"
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
    // if (!process.env.JWT_SECRET) {
    //     throw new Error("JWT_SECRET must be defined");
    // }
    // if (!process.env.COOKIE_SECRET) {
    //     throw new Error("COOKIE_SECRET must be defined");
    // }
    // if (!process.env.MAIL_USER || !process.env.MAIL_PASSWORD) {
    //     throw new Error("Mail user and password must be defined");
    // }
};

const connectRedis = async (io: Server) => {
    const pubClient = createClient({ url: "redis://localhost:6379" });
    const subClient = pubClient.duplicate();

    await Promise.all([
        pubClient.connect(),
        subClient.connect()
    ]);

    io.adapter(createAdapter(pubClient, subClient, {
        key: "chat"
    }) as any);
}

const main = async () => {
    const server = http.createServer(app);
    const io = new Server(server, {
        path: "/socket.io/connection",
        transports: ["websocket"]
    });

    handleValidationError();
    await connectDatabase();
    await connectRedis(io);

    return { server, io };
}

main().then(({ server, io }) => {
    new SocketService(io);
    console.info("PORT", process.env.PORT ?? 3003)
    server.listen(process.env.PORT ?? "3003", () => {
        console.info("Server is running on the port" + (process.env.PORT ?? 3003));
    });
}).catch(err => {
    console.error(err);
})