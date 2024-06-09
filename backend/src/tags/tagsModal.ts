import mongoose from "mongoose";

const tagsSchema = new mongoose.Schema({
    tag: {
        type: String,
        required: true
    },
    description: {
        type: String
    }
}, {
    timestamps: true
}
)

export const Tag = mongoose.model("Tag", tagsSchema)