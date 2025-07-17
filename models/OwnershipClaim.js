import mongoose from "mongoose";

const ownershipClaimSchema = new mongoose.Schema({

    claim_message:{type: String, required: true},
    claim_pic:{type: String, required: true},
    post_id:{type: String, required: true},
    loser_id:{type: String, required: true},
    status:{type: String, required: true, default: 'Pending'},

},{timestamps:true})

const OwnershipClaim = mongoose.models.OwnershipClaim || mongoose.model('OwnershipClaim', ownershipClaimSchema);

export default OwnershipClaim