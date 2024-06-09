import { config as conf } from "dotenv";

conf();
const _config = {
  port: process.env.PORT,
  mongoUrl: process.env.MONGO_URL,
  env: process.env.ENV,
  secret: process.env.JWT_SECRET,
  cloudinaryKey: process.env.CLOUDINARY_KEY,
  cloudinarySecret:process.env.CLOUDINARY_SECRET
};

export const config = Object.freeze(_config);
