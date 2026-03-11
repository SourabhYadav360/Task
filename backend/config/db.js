import mongoose from "mongoose";

 export const connectDB = async ()=> {
    try {
        const res  = await mongoose.connect("mongodb://localhost:27017/task")
        console.log("connect db");
        
    } catch (error) {
        console.log("error in db",error);
        
    }
}