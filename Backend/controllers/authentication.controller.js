import User from "../models/authentication.model.js";
import CreatorStats from "../models/creatorStats.model.js";

export const registerUser = async (req, res) => {
    try {
        const { username, email, password, profilePic } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ success: false, message: "Please enter all fields" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        const user = new User({ username, email, password, profilePic });
        await user.save();

        await CreatorStats.create(
            {
                author : user._id,
                
            }
        )

        const accessToken = user.generateAccessToken();

        res.cookie("access_token", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 24 * 60 * 60 * 1000, // 1 day
        });

        res.status(201).json({
            success: true,
            message: "✅ User registered successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                profilePic: user.profilePic,
            },
            token: accessToken,
        });
    } catch (error) {
        console.error("❌ Error registering user:", error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Please enter all fields" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }



        const accessToken = user.generateAccessToken();

        res.cookie("access_token", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 24 * 60 * 60 * 1000,
        });

        res.status(200).json({
            success: true,
            message: "✅ User logged in successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                profilePic: user.profilePic,
            },
            token: accessToken,
        });
    } catch (error) {
        console.error("❌ Error logging in user:", error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const logoutUser = async (req, res) => {
    try {
        res.clearCookie("access_token");
        res.status(200).json({ success: true, message: "✅ User logged out successfully" });
    } catch (error) {
        console.error("❌ Error logging out user:", error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}
