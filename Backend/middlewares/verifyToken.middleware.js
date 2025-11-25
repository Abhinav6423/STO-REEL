import User from "../models/authentication.model.js";
import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
    try {
        const token = req.cookies.access_token;
        if (!token) {
            return res.status(401).json({ success: false, message: "You are not logged in" })
        }

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET); //verify the token returns the payload of the token that is an object of the user who is logged in
        const user = await User.findById(decoded._id).select("-password");

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: "Error in verifying token" })
    }
}