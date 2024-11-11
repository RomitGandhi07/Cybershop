import express, { json, NextFunction, urlencoded, Request, Response } from "express";
import { errorHandler } from "./middlewares/error.middlewares";
import { ICurrentUser } from "./interfaces";
import cors from "cors";
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

// app.use((req: Request, res: Response, next: NextFunction) => {
//     req.currentUser = {
//         id: "66e6d47d026901b3dfbd67d9",
//         name: "Romit Gandhi",
//         isEnabled: true,
//         email: "gandhiromit77@gmail.com",
//         type: UserTypesEnum.CLIENT
//     }
//     next();
// })

app.use(errorHandler);

export default app;