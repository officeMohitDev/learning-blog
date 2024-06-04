import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    about: {
      type: String,
    },
    profilePicture: String,
    website: String,
    socialLinks: {
      twitter: String,
      linkedin: String,
      github: String,
      medium: String,
      instagram: String,
    },
    location: String,
    birthDate: Date,
    followers: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],
    following: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],
    dateJoined: {
      type: Date,
      default: Date.now,
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    savedPosts: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Post",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", userSchema);
