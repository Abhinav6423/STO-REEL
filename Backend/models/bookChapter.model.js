import mongoose, { Schema } from "mongoose";

const bookChapterSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    coverImage: {
        type: String,
        required: true
    },
    book: {
        type: Schema.Types.ObjectId,
        ref: "book"
    },
    likes: {
        type: Number,
        default: 0
    },
    likedBY: [
        {
            type: Schema.Types.ObjectId,
            ref: "user"
        }
    ],
    status: {
        type: String,
        enum: ["Published", "Draft"],
        default : "Draft"
    }
}, {
    timestamps: true
})

export default mongoose.model("bookChapter", bookChapterSchema)