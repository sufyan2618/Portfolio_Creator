import design from '../models/design.model.js';
import uploadToCloudinary from '../util/cloudinary.js'; // Assuming you have a utility to upload to Cloudinary
import fs from 'fs';
import path from 'path';
import upload from '../util/storage.js';


// Handler to get all designs
export const GetDesigns = async (req, res) => {
    try {
        const designs = await design.find();
        res.status(200).json(designs);
    } catch (error) {
        console.error('Error fetching designs:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// Handler to add a new design
export const AddDesign = async (req, res) => {
    // Expecting files: 'hbsfile' and 'htmlfile'; fields: title, description, image
    upload.fields([
        { name: 'hbsfile', maxCount: 1 },
        { name: 'htmlfile', maxCount: 1 },
        { name: 'image', maxCount: 1 }
    ])(req, res, async (err) => {
        if (err) {
            console.error('Upload error:', err);
            return res.status(500).json({ message: 'Upload failed' });
        }

        try {
            const { title, description } = req.body;
            const hbsfilePath = req.files['hbsfile'] ? req.files['hbsfile'][0].path : null;
            const htmlfilePath = req.files['htmlfile'] ? req.files['htmlfile'][0].path : null;
            const imagePath = req.files['image'] ? req.files['image'][0].path : null;

            if (!title || !description || !imagePath || !hbsfilePath || !htmlfilePath) {
                return res.status(400).json({ message: 'All fields are required' });
            }

            // Upload image to Cloudinary
            const imageUrl = await uploadToCloudinary(imagePath);

            // Clean up local image file after upload
            fs.unlinkSync(imagePath);

            // Save hbs file to /backend/public/templates/
            const hbsDestPath = path.resolve('backend', 'public', 'templates', path.basename(hbsfilePath));
            fs.renameSync(hbsfilePath, hbsDestPath);

            // Save html file to /frontend/public/designs/
            const htmlDestPath = path.resolve('frontend', 'public', 'designs', path.basename(htmlfilePath));
            fs.renameSync(htmlfilePath, htmlDestPath);

            // Generate new design ID
            count = await design.countDocuments();
            const newDesignId = `design${count + 1}`;

            // Create new design document
            const newDesign = new design({
                designId: newDesignId,
                title,
                description,
                imageUrl,
            });

            await newDesign.save();

            res.status(201).json({ message: 'Design added successfully', design: newDesign });
        } catch (error) {
            console.error('Error adding design:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    });
};