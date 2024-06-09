import mongoose from "mongoose"
import { config } from "./config"

export const connectToDb = async() => {
    try {
        await mongoose.connect(config.mongoUrl as string).then(res => console.log("connected to database"));
    } catch (error) {
        console.log("error:", error)
    }
} 