import express, { Request, Response } from "express";
import { pickFromObject, SALT_ROUNDS } from "../../utils";
import { User } from "../../models/user";
import bcrypt from "bcrypt";
import { Country } from "../../models/country";
import { ApiError } from "../../utils/ApiError";

const router = express.Router()

router.post("/authentication/signup", async (req: Request, res: Response) => {

})