import mongoose from "mongoose";

const foundPostSchema = new mongoose.Schema({

    content_name:{type: String, required: true},
    content_type:{type: String, required: true},
    content_foundwhen:{type: Object, required: true},
    content_details:{type: Object, required: true},
    content_location:{type: [Object], required: true},
    content_pic:{type: String, required: true},
    finder_id:{type: String, required: true},


},{timestamps:true})

const FoundPost = mongoose.models.FoundPost || mongoose.model('FoundPost', foundPostSchema);

export default FoundPost