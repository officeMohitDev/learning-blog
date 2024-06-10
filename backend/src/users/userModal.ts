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
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    about: {
      type: String,
    },
    role: {
      type: String,
      enum: ["user", "author"], // Add the possible roles here
      default: "user", // Optionally set a default value
    },
    image: String,
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
        ref: "Blog",
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Pre-save middleware to set the default role
userSchema.pre("save", function (next) {
  if (!this.role) {
    this.role = "user"; // Set the default role if not provided
  }
  next();
});


export const User = mongoose.model("User", userSchema);
