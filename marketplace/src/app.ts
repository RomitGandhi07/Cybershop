import express, { json, urlencoded } from "express";
import { errorHandler } from "./middlewares/error.middlewares";
import UserRouter from "./routes/authentication.routes"
import UserProfileRouter from "./routes/user-profile.routes";
import OrganizationRouter from "./routes/organization.routes";
import { ICurrentUser } from "./interfaces";

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

app.use("/api/v1/authentication", UserRouter);
app.use("/api/v1/users", UserProfileRouter);
app.use("/api/v1/users/organizations", OrganizationRouter);

app.use(errorHandler);

export default app;