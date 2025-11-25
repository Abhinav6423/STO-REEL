import mongoose, { Schema } from "mongoose";

const creatorStatsSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    exp: {
        type: Number,
        default: 0
    },

    expToNextLevel: {
        type: Number,
        default: 100
    },

    level: {
        type: Number,
        default: 0
    },
    rank: {
        type: String,
        enum: ["Beginner", "Intermediate", "Advanced", "Expert"],
        default: "Beginner"
    },
    books: [
        {
            type: Schema.Types.ObjectId,
            ref: "book"
        }
    ],
    shortStories: [
        {
            type: Schema.Types.ObjectId,
            ref: "shortStory"
        }
    ],
    totalBooks: {
        type: Number,
        default: 0
    },
    totalShortStories: {
        type: Number,
        default: 0
    }

}, {
    timestamps: true
})


creatorStatsSchema.index({
    exp: -1,

})

// change levels and exp to next level
creatorStatsSchema.pre("save", async function (next) {
    if (!this.isModified("exp")) {
        return next();
    }

    if (this.exp >= this.expToNextLevel) {
        this.level = this.level + 1;
        this.exp = this.exp - this.expToNextLevel;
        this.expToNextLevel = this.expToNextLevel * 2;
    }

    next();

})

//change ranks based on Level
creatorStatsSchema.pre("save", async function (next) {
    if (this.level >= 100) {
        this.rank = "Expert"
    } else if (this.level >= 50) {
        this.rank = "Advanced"
    } else if (this.level >= 25) {
        this.rank = "Intermediate"
    } else {
        this.rank = "Beginner"
    }

    next();
})

export default mongoose.model("CreatorStats", creatorStatsSchema)