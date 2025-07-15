import mongoose  from "mongoose";

const DesignSchema = new mongoose.Schema({
    designId: { type: String, required: true }, // Unique identifier for the design
    title : { type: String, required: true }, // Title of the design
    description: { type: String, required: true }, // Description of the design
    imageUrl: { type: String, required: true }, // URL of the design image
})

const Design = mongoose.model('Design', DesignSchema);
export default Design;