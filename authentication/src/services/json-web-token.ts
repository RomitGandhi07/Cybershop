import { promisify } from "util";
import { Secret, SignOptions, sign, verify } from "jsonwebtoken";
import { GetAccessTokenParams } from "../interfaces";


export class jsonWebToken {
    static async getAccessToken({ id, email }: GetAccessTokenParams) {
        return {
            accessToken: await promisify<GetAccessTokenParams, Secret, SignOptions>(sign)(
                { id, email }, `${process.env.JWT_SECRET}`,
                { expiresIn: 60 * 60 , algorithm: "HS256" }) // 1 hour access token
        };
    }

    static async getRefreshToken({ id, pkceEnabled }: { id: string, pkceEnabled: boolean }) {
        return {
            refreshToken: await promisify<{ id: string, pkceEnabled: boolean }, Secret, SignOptions>(sign)(
                { id, pkceEnabled }, `${process.env.JWT_SECRET}`,
                { expiresIn: 24 * 60 * 60, algorithm: "HS256" }) // 24 hours refersh token
        };
    }

    static async getDetailsFromAccessToken({ accessToken }: { accessToken: string }) {
        try {
            return verify(accessToken, `${process.env.JWT_SECRET}`) as { accessToken: string };
        }
        catch (err) {
            throw new Error(); // TODO: Need different error message
        }
    }

    static getRefreshTokenDetails({ refreshToken }: { refreshToken: string }) {
        try {
            return verify(refreshToken, `${process.env.JWT_SECRET}`, { algorithms: ["HS256"] }) as { refreshToken: string, pkceEnabled: boolean };
        }
        catch (err) {
            throw new Error(); // TODO: Need different error message
        }
    }
}
