import Design from '../models/design.model.js';
import { uploadToCloudinary } from '../lib/cloudinary.js';
import fs from 'fs';
import uploadFile from '../util/uploadFile.js';

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
            return res.status(400).json({ message: 'All fields, including files, are required' });
        }

        //upload to cloudinary


        const count = await Design.countDocuments();
        const newCount = count + 1;

        const hbsFilePath = `hbs_files/design${newCount}.hbs`;
        const hbsType = 'text/x-handlebars-template';


        const hbsFileUrl = await uploadFile(hbsFilePath, hbsFile.buffer, hbsType);


        if (!htmlFileUrl || !hbsFileUrl) {
            return res.status(500).json({ message: 'Failed to upload files' });
        }

        const base64Image = `data:${imageFile.mimetype};base64,${imageFile.buffer.toString("base64")}`;
        const imageUrl = await uploadToCloudinary(base64Image, 'design_images');

        const newDesignId = `design${newCount}`;

        // Create the new design document with the correct imageUrl string
        const newDesign = new Design({
            designId: newDesignId,
            title,
            description,
            imageUrl,
            hbsFileUrl,
            htmlFileUrl,
        });

        await newDesign.save();

        res.status(201).json({ message: 'Design added successfully', design: newDesign });

    } catch (error) {
        // This log now provides much more detail for debugging
        console.error('Error adding design:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};