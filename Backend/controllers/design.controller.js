import Design from '../models/design.model.js';
import { uploadToCloudinary } from '../lib/cloudinary.js';
import fs from 'fs';

// Handler to get all designs
export const GetDesigns = async (req, res) => {
    try {
        const designs = await Design.find({}).sort({ createdAt: -1 }).select('-__v'); // Exclude __v field
        if (!designs || designs.length === 0) {
            return res.status(404).json({ message: 'No designs found' });
        }
    
        res.status(200).json(designs);
    } catch (error) {
        console.error('Error fetching designs:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const AddDesign = async (req, res) => {
    try {
        const { title, description } = req.body;

        // Multer correctly places files in req.files
        const hbsFile = req.files?.hbsfile?.[0];
        const htmlFile = req.files?.htmlfile?.[0];
        const imageFile = req.files?.image?.[0];

        if (!title || !description || !hbsFile || !htmlFile || !imageFile) {
            // It's good practice to clean up any uploaded files if validation fails
            if (imageFile) fs.unlinkSync(imageFile.path);
            if (hbsFile) fs.unlinkSync(hbsFile.path);
            if (htmlFile) fs.unlinkSync(htmlFile.path);
            return res.status(400).json({ message: 'All fields, including files, are required' });
        }

        // Upload the image to Cloudinary
        const imageUrl = await uploadToCloudinary(imageFile.path, 'design_images');
        
        // Clean up the local image file after successful upload
        fs.unlinkSync(imageFile.path);

        // --- THIS IS THE FIX ---
        // Use the 'secure_url' property from the Cloudinary response object
      

        // Generate a unique ID for the design
        const count = await Design.countDocuments();
        const newDesignId = `design${count + 1}`;

        // Create the new design document with the correct imageUrl string
        const newDesign = new Design({
            designId: newDesignId,
            title,
            description,
            imageUrl, // Now this is a string, which matches your schema
            hbsFilePath: hbsFile.path, 
            htmlFilePath: htmlFile.path,
        });

        await newDesign.save();

        res.status(201).json({ message: 'Design added successfully', design: newDesign });

    } catch (error) {
        // This log now provides much more detail for debugging
        console.error('Error adding design:', error); 
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};