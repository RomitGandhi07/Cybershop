import express, { json, NextFunction, urlencoded, Request, Response } from "express";
import { errorHandler } from "./middlewares/error.middlewares";
import SeviceRouter from "./routes/service.routes";
import JobRouter from "./routes/job.routes";
import ProposalRouter from "./routes/proposal.routes";
import { ICurrentUser } from "./interfaces";
import cors from "cors";
import { authenticateUser } from "./middlewares/authenticate-user.middleware";
import cookieParser from "cookie-parser";
import { UserTypesEnum } from "./enums/user-types.enum";

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

app.use((req: Request, res: Response, next: NextFunction) => {
    req.currentUser = {
        id: "6741888018d180d3daf61f8b",
        name: "Romit Gandhi",
        isEnabled: true,
        email: "gandhiromit77@gmail.com",
        type: UserTypesEnum.CLIENT,
        organizationId: "6741888418d180d3daf61f8d"
    }
    next();
})

app.use("/api/v1/marketplace/services", SeviceRouter);
app.use("/api/v1/marketplace/jobs", JobRouter);
app.use("/api/v1/marketplace/jobs/:jobId/proposals", ProposalRouter);

app.use(errorHandler);

export default app;