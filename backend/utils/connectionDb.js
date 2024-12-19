import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

export const connectDb = async()=>{
    
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB successfully!");

    }catch(error){
        console.log("Something wrong to connecting database",error);
        process.exit(1);
    }
}