import mongoose from "mongoose";

const tagsSchema = new mongoose.Schema({
    tag: {
        type: String,
        required: true
    }
}, {
    timestamps: true
}
)

export const Tag = mongoose.model("Tag", tagsSchema)