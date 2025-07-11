import mongoose from "mongoose";

const lostPostSchema = new mongoose.Schema({

    content_name:{type: String, required: true},
    content_type:{type: String, required: true},
    content_lastused:{type: Object, required: true},
    content_details:{type: Object, required: true},
    content_location:{type: [Object], required: true},
    content_pic:{type: String, required: true},
    loser_id:{type: String, required: true},
    finder_reward:{type: Number, required: true},
    
},{timestamps:true})

const LostPost = mongoose.models.LostPost || mongoose.model('LostPost', lostPostSchema);

export default LostPost