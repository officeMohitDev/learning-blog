import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { User } from "./userModal";
import createHttpError from "http-errors";
import bcrypt from "bcrypt";
import { loginSchema, registerSchema } from "../validators/auth-validator";
import { config } from "../config/config";
import { sign } from "jsonwebtoken";
import path from "node:path";
import cloudinary from "../config/cloudinary";
import fs from 'fs'
import { userUpdateSchema } from "../validators/user-validator";
import getUserIdFromAuthorizationHeader from "../utils/token";
import { ObjectId } from "mongoose";
import { Blog } from "../blogs/blogModal";

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, username, password, name } = registerSchema.parse(req.body);

    const userExist = await User.findOne({ $or: [{ email }, { username }] });

    const avatar  = `https://avatar.iran.liara.run/public/boy?username=${username}`

    if (userExist) {
      const errr = createHttpError(
        400,
        "User with email or username already exist"
      );
      return next(errr);
    }

    const hashedPass = await bcrypt.hash(password, 10);

    const user = await User.create({
      username: username,
      name: name,
      email: email,
      password: hashedPass,
      image: avatar
    });

    res.status(201).json(user);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const formattedErrors = error?.errors?.map((err) => ({
        path: err.path[0],
        message: err.message,
      }));
      return res.status(400).json({ errors: formattedErrors[0] });
    }
    next(error);
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = loginSchema.parse(req.body);

    const user = await User.findOne({ email });

    if (!user) {
      const error = createHttpError(404, "no user exist for provided email");
      return next(error);
    }

    const isPassCorrect = await bcrypt.compare(password, user.password as string);

    if (!isPassCorrect) {
      const error = createHttpError(400, "username or password is incorrect");
      return next(error);
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};


export const getUserDetails = async ( 
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user =  await User.findOne({username: req.params.username}).populate("followers").populate('following').populate("savedPosts");
    if (!user) {
      const error = createHttpError(404, "User not found");
      return next(error)
    }

    const blog = await Blog.find({author: user._id})
    res.status(200).json({
      user, blog
    })
  } catch (error) {
    next(error)
  }
}

export const updateUserDetails = async (req: Request,
  res: Response,
  next: NextFunction) => {
  try {
    const data = req.body;
    const files = req.files as { [fieldName: string]: Express.Multer.File[] };
    console.log(data)
    console.log('Form Data:', data);
    if (files && files['userPfp'] && files['userPfp'].length > 0) {
        console.log('File:', files);
        const file = files['userPfp'] && files['userPfp'][0]; // Access file using 'userPfp' field name
        const pfpImageMimeType = files['userPfp'][0].mimetype.split("/").at(-1);
        const fileName =  files['userPfp'][0].filename;
        const filePath = path.resolve(__dirname, "../../public/data/uploads", fileName)
        
        const uploadResult = await cloudinary.uploader.upload(filePath, {
          filename_override: fileName,
          folder: "userPfps",
          format: pfpImageMimeType
        });

        await fs.promises.unlink(filePath)

        const data = req.body
        const imageUrl = uploadResult.secure_url;
        const userId = req.body.userId;
        let parseddata = userUpdateSchema.parse(req.body);
        parseddata.image = imageUrl; // Add the imageUrl to the parseddata object

        const user = await User.findOne({ _id: userId })

        if (!user) {
          const error = createHttpError(404, "User not found")
          return next(error)
        }

        const updateUser = await User.findOneAndUpdate({ _id: userId }, parseddata)

        console.log("parseddata", parseddata);

        res.status(200).json(updateUser);

    } else {
      let parseddata = userUpdateSchema.parse(req.body);
      const userId = req.body.userId;
      const user = await User.findOne({ _id: userId })

      if (!user) {
        const error = createHttpError(404, "User not found")
        return next(error)
      }

      const updateUser = await User.findOneAndUpdate({ _id: userId }, parseddata)
      res.status(200).json(updateUser);
    }
  } catch (error) {
    next(error);
  }
}


export const profileMe =  async (req: Request,
  res: Response,
  next: NextFunction) => {
    try {
      const id = req.body.id;
      console.log(id)
      const user = await User.findOne({_id: id});
      if (!user) {
        const error = createHttpError(404, "user not found")
        return next(error)
      }

      res.status(200).json(user)
    } catch (error) {
      next(error)
    }
  }


  export const followUnfollowUser = async (req: Request,
    res: Response,
    next: NextFunction) => {
      try {
        const userId = req.params.userId;
        const followingUserId = getUserIdFromAuthorizationHeader(req); // Extracting the following user ID from the Authorization header
        if (!userId) {
          const error = createHttpError(400, "Please provide userid");
          next(error);
          return;
        }
  
        const followedUser = await User.findOne({ _id: userId });
        if (!followedUser) {
          const error = createHttpError(404, "User not found");
          next(error);
          return;
        }

        if(!followingUserId) {
          const error = createHttpError(404, "User not found");
          next(error);
          return;
        }

        const isAlreadyFollowed = followedUser.followers.includes(followingUserId as any);
  
        if (isAlreadyFollowed) {
          // Unfollow the user
          const updatedFollowedUser = await User.findByIdAndUpdate({_id: userId}, { $pull: { followers: followingUserId } }, { new: true });
          const updatedFollowingUser = await User.findByIdAndUpdate({_id: followingUserId}, { $pull: { following: userId } }, { new: true })
          res.status(200).json({ message: "User unfollowed", user: {updatedFollowedUser, updatedFollowingUser} });
        } else {
          // Follow the user
          const updatedFollowedUser = await User.findByIdAndUpdate({_id: userId}, { $addToSet: { followers: followingUserId } }, { new: true });
          const updatedFollowingUser = await User.findByIdAndUpdate({_id: followingUserId}, { $addToSet: { following: userId } }, { new: true })
          res.status(200).json({ message: "User followed", user: {updatedFollowedUser, updatedFollowingUser} });
        }
      } catch (error) {
        next(error);
      }
    };


export const getAuthorData = async(req: Request,
  res: Response,
  next: NextFunction) => {
    try {
      const authors = await User.find({role: "author"});
      if (!authors.length) {
        const error = createHttpError(404, "No author found")
        return next(error)
      }

      res.status(200).json(authors)
    } catch (error) {
      next(error)
    }
  }