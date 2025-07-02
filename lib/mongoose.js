import mongoose from "mongoose";

let isConnected = false;

export default async function connectDB()
{
    if (isConnected) return;
    try{
        await mongoose.connect(process.env.MongoDB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        isConnected = true;
    } catch(err){
        console.log(err);
    }
}