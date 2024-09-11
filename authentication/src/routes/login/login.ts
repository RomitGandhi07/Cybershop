import express, { Request, Response, NextFunction } from "express"
import { User } from "../../models/user";
import bcrypt from "bcrypt";
import { jsonWebToken } from "../../services/json-web-token";

const router = express.Router()

router.post("/authentication/login", async (req: Request, res: Response, next: NextFunction) => {
    // Fetch the required fields
    const { email, password, pkceEnabled = false } = req.body;

    // Check whther the user already exists or not
    const user = await User.findOne({ email }).lean().exec();

    if(!user) {
        // Throw new error that user does not exist
        return res.json({error: "Credentials mismatch"});
    }

    // Check whether user's passwords are matching or not, if not then throw an error
    const isPasswordMatching = await bcrypt.compare(password, user.password);
    if(!isPasswordMatching) {
        return res.json({error: "Credentials mismatch"});
    }

    // Generate access token and refresh token
    const accessToken = await jsonWebToken.getAccessToken({
        id: String(user._id),
        email: user.email
    });

    const refreshToken = await jsonWebToken.getRefreshToken({
        id: String(user._id),
        pkceEnabled
    });

    // Set access token and refresh token
    // res.cookie("Token1", accessToken, app.locals.cookieOptions);
    // res.cookie("Token2", refreshToken, app.locals.cookieOptions);

    // Send response
    return res.json({
        status: 200,
        message: "Login successful",
    });
})