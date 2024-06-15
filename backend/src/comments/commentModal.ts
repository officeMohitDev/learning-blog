import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: true
    },
    pinned: Boolean,
    isNested: Boolean,
    topCommentId: {
        type: mongoose.Schema.ObjectId,
        ref: "Comment"
    },
    blogId: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: "Blog"
    },
    commentor: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: "User"
    },
    likes: [{
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }],
    replies: [{ type: mongoose.Schema.ObjectId, ref: "Comment" }]
},
    {
        timestamps: true
    }
)

export const Comment = mongoose.model("Comment", commentSchema)