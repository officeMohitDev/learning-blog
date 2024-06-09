import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    subTitle: {
        type: String,
    },
    author: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: 'User' // Assuming you have a User model for authors
    },
    posterImg: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    tags: [{
        type: String
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment' // Assuming you have a Comment model
    }],
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    views: {
        type: Number,
        default: 0
    },
    free: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
})


export const Blog = mongoose.model("Blog", blogSchema)