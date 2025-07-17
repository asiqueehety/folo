import mongoose from "mongoose";

const foundClaimSchema = new mongoose.Schema({

    claim_message:{type: String, required: true},
    claim_pic:{type: String, required: true},
    post_id:{type: String, required: true},
    finder_id:{type: String, required: true},
    status:{type: String, required: true, default: 'Pending'},

},{timestamps:true})

const FoundClaim = mongoose.models.FoundClaim || mongoose.model('FoundClaim', foundClaimSchema);

export default FoundClaim