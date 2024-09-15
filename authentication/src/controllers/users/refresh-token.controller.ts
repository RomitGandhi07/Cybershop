// import { Request, Response } from "express";
// import { asyncHandler } from "../../utils/asyncHandler";
// import { User } from "../../models/user";
// import { ApiResponse } from "../../utils/ApiResponse";
// import { ApiError } from "../../utils/ApiError";

// export const refreshAccessToken = asyncHandler(async (req: Request, res: Response) => {
//   const incomingRefreshToken =
//     req.cookies.Token2;

//   if (!incomingRefreshToken) {
//     throw new ApiError(401, "Unauthorized request");
//   }

//   try {
//     const decodedToken = jwt.verify(
//       incomingRefreshToken,
//       process.env.REFRESH_TOKEN_SECRET
//     );
//     const user = await User.findById(decodedToken?._id);
//     if (!user) {
//       throw new ApiError(401, "Invalid refresh token");
//     }

//     // check if incoming refresh token is same as the refresh token attached in the user document
//     // This shows that the refresh token is used or not
//     // Once it is used, we are replacing it with new refresh token below
//     if (incomingRefreshToken !== user?.refreshToken) {
//       // If token is valid but is used already
//       throw new ApiError(401, "Refresh token is expired or used");
//     }
//     const options = {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//     };

//     const { accessToken, refreshToken: newRefreshToken } =
//       await generateAccessAndRefreshTokens(user._id);

//     // Set access token and refresh token
//     res.cookie("Token1", accessToken, options);
//     res.cookie("Token2", refreshToken, options);

//     return res
//       .status(200)
//       .cookie("accessToken", accessToken, options)
//       .cookie("refreshToken", newRefreshToken, options)
//       .json(
//         new ApiResponse(
//           200,
//           { accessToken, refreshToken: newRefreshToken },
//           "Access token refreshed"
//         )
//       );
//   } catch (error) {
//     throw new ApiError(401, error?.message || "Invalid refresh token");
//   }
// });