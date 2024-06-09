import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: true
    },
    commentor: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    replies: [{type: mongoose.Schema.ObjectId, ref: "Comment"}]
}, {
    timestamps: true
})

export const Comment = mongoose.model("Comment", commentSchema)