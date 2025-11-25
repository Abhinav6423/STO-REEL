import mongoose, { Schema } from "mongoose";

const bookSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        author: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        coverImage: {
            type: String,
            required: true
        },
        likes: {
            type: Number,
            default: 0
        },
        likedBy: [
            {
                type: Schema.Types.ObjectId,
                ref: "user"
            }
        ],
        chapters: [
            {
                type: Schema.Types.ObjectId,
                ref: "bookChapter"
            }
        ],
        category: {
            type: String,
            enum: ["Action", "Adventure", "Comedy", "Drama", "Fantasy", "Horror", "Romance", "Sci-Fi", "Thriller", "Western"],
            default: "Action",
            required: true
        }
    }
)


// For text-based search (search bar, keywords)
bookSchema.index({
    title: "text",
    author: "text",
    description: "text"
});

// For exact filters and fast sorting
bookSchema.index({ author: 1 });     // find all books by an author
bookSchema.index({ category: 1 });   // filter by category
bookSchema.index({ likes: -1 });     // sort by most liked


export default mongoose.model("Book", bookSchema);