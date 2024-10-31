import express, { json, urlencoded } from "express";
import { errorHandler } from "./middlewares/error.middlewares";
import UserRouter from "./routes/authentication.routes"
import UserProfileRouter from "./routes/user-profile.routes";
import OrganizationRouter from "./routes/organization.routes";
import FlexibleFieldsRouter from "./routes/flexible-fields.routes";
import { ICurrentUser } from "./interfaces";
import cors from "cors";
import { authenticateUser } from "./middlewares/authenticate-user.middleware";
import cookieParser from "cookie-parser";

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Express {
        interface Request {
            currentUser?: ICurrentUser // TODO: Need interface for this
        }
    }
}

const app = express();

app.use(express.json());

app.locals.cookieOptions = {
    signed: true,
    secure: true,
    httpOnly: true,
    sameSite: "strict",
};

app.use(
    cors({
        // origin: "*",
        credentials: true,
        // preflightContinue: true
    }),
);

app.use(json({
    limit: "4mb"
}));

app.use(urlencoded({
    extended: true,
    limit: "60mb"
}));

app.use(cookieParser(process.env.COOKIE_SECRET));

app.use("/api/v1/authentication", UserRouter);
app.use("/api/v1/users/fields", FlexibleFieldsRouter);
app.use("/api/v1/users", UserProfileRouter);
app.use("/api/v1/users/organizations", authenticateUser, OrganizationRouter);

app.use(errorHandler);

export default app;