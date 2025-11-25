import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profilePic: {
        type: String,
        default: "https://icon-library.com/images/avatar-icon-images/avatar-icon-images-13.jpg"
    },
    creatorStats : {
        type : Schema.Types.ObjectId,
        ref: "creatorStats"
    },
    readerStats : {
        type : Schema.Types.ObjectId,
        ref: "readerStats"
    }


}, {
    timestamps: true
})


//hash password before saving to db 
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next(); // Skip if password not changed

    try {
        // Hash password with salt rounds = 10
        this.password = await bcrypt.hash(this.password, 10);
        next();
    } catch (err) {
        next(err);
    }
});

//compare entered password with hashed password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

//generate token 
userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: "1d", // Access token valid for 1 day
        }
    );
};



const User = mongoose.model("User", userSchema);
export default User;