import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    username:{type: String, required: true},
    email:{type: String, required: true},
    pw_hash:{type: String, required: true},
    phone:{type: String, required: true},
    address:{type: Object, required: true},
    role:{type: String, required: true},
},{timestamps:true})

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User