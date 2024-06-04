import { config as conf } from "dotenv";

conf();
const _config = {
  port: process.env.PORT,
  mongoUrl: process.env.MONGO_URL,
  env: process.env.ENV,
  secret: process.env.JWT_SECRET,
};

export const config = Object.freeze(_config);
