import mongoose  from "mongoose";

const DesignSchema = new mongoose.Schema({
    designId: { type: String, required: true }, 
    title : { type: String, required: true },
    description: { type: String, required: true }, 
    imageUrl: { type: String, required: true }, 
}, {
    timestamps: true, 
})

const Design = mongoose.model('Design', DesignSchema);
export default Design;