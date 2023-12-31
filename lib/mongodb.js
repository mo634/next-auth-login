import mongoose from "mongoose";

export const connectMongodb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("Connected to MongoDB")
    } catch (error) {
        console.log("error while connect to MongoDB")
    }
}
