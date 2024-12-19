import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

export const connectDb = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          });
        console.log("Connected to MongoDB successfully!");

    }catch(error){
        console.log("Something wrong to connecting database");
        process.exit(1);
    }
}