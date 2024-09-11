import express, { json, urlencoded } from "express";
import { errorHandler } from "./middlewares/error.middlewares";
import UserRouter from "./routes/user.routes";

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Express {
        interface Request {
            currentUser?: any // TODO: Need interface for this
        }
    }
}

const app = express();

app.use(express.json());

app.locals.cookieOptions = {
    signed: process.env.NODE_ENV !== "test",
    secure: true,
    httpOnly: true,
    sameSite: "strict",
};

app.use(json({
    limit: "4mb"
}));

app.use(urlencoded({
    extended: true,
    limit: "60mb"
}));

app.use("/api/v1/authentication/users", UserRouter);

app.use(errorHandler);

export default app;