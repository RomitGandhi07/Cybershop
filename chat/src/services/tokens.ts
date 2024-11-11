import crypto from "crypto";
import { USER_TEMPORARY_TOKEN_EXPIRY } from "../utils"
import { promisify } from "util";
import { Secret, SignOptions, sign } from "jsonwebtoken";
import { GetAccessTokenParams } from "../interfaces";

export class TokenService {
    static generateTemporaryToken (expiryTime = USER_TEMPORARY_TOKEN_EXPIRY) {
        // This token should be client facing
        // for example: for email verification unHashedToken should go into the user's mail
        const unHashedToken = crypto.randomBytes(20).toString("hex");
      
        // This should stay in the DB to compare at the time of verification
        const hashedToken = crypto
          .createHash("sha256")
          .update(unHashedToken)
          .digest("hex");

        // This is the expiry time for the token (20 minutes - default) or provided time
        const tokenExpiry = Date.now() + expiryTime;
      
        return { unHashedToken, hashedToken, tokenExpiry };
      }

      static async getAccessToken({ id, email, type, name, isEnabled }: GetAccessTokenParams) {
        return {
            accessToken: await promisify<GetAccessTokenParams, Secret, SignOptions>(sign)(
                { id, email, type, name, isEnabled }, `${process.env.JWT_SECRET}`,
                { expiresIn: 60 * 60 , algorithm: "HS256" }) // 1 hour access token
        };
    }

    static async getRefreshToken({ id }: { id: string }) {
        return {
            refreshToken: await promisify<{ id: string }, Secret, SignOptions>(sign)(
                { id }, `${process.env.JWT_SECRET}`,
                { expiresIn: 24 * 60 * 60, algorithm: "HS256" }) // 24 hours refersh token
        };
    }
}