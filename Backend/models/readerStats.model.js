import mongoose, { Schema } from "mongoose";

const readerStatsSchema = new Schema({
    reader: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    exp: {
        type: Number,
        default: 0
    },
    level: {
        type: Number,
        default: 0
    },
    rank: {
        type: String,
        enum: ["Beginner", "Intermediate", "Advanced", "Expert"],
        default: "Beginner"
    }

}, {
    timestamps: true
})


readerStatsSchema.index({
    exp: -1,

})


export default mongoose.model("ReaderStats", readerStatsSchema)