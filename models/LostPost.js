import mongoose from "mongoose";

const lostPostSchema = new mongoose.Schema({

    content_name:{type: String, required: true},
    content_type:{type: String, required: true},
    content_id:{type: Object, required: true},
    content_location:{type: [Object], required: true},
    content_image:{type: String, required: true},
    loser_id:{type: String, required: true},
    
},{timestamps:true})

const LostPost = mongoose.models.LostPost || mongoose.model('LostPost', lostPostSchema);

export default LostPost