import Design from '../models/design.model.js';
import { uploadToCloudinary } from '../lib/cloudinary.js';
import uploadFile from '../util/uploadFile.js';
import { deployToNetlify } from '../lib/deployToNetlify.js';
import getOptimizedCloudinaryUrl from '../util/OptimizedCloudinaryUrl.js';


export const GetDesigns = async (req, res) => {
    try {
        const designs = await Design.find({}).sort({ createdAt: -1 }).select('-__v'); 
        if (!designs || designs.length === 0) {
            return res.status(404).json({ message: 'No designs found' });
        }
        const optimizedDesigns = designs.map(design => {
            if (design.imageUrl) {
              design.imageUrl = getOptimizedCloudinaryUrl(design.imageUrl, {
                width: 800,
                format: 'webp',
                quality: 'auto',
              });
            }
            return design;
          });

          console.log('Optimized designs:', optimizedDesigns);
        await req.redisClient.set('designs', JSON.stringify(optimizedDesigns), {
            EX: 3600,
        })
        res.status(200).json(optimizedDesigns);
    } catch (error) {
        console.error('Error fetching designs:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const AddDesign = async (req, res) => {
    try {
        const { title, description } = req.body;

        const htmlFile = req.files?.htmlFile?.[0]; 
        const hbsFile = req.files?.hbsfile?.[0];
        const imageFile = req.files?.image?.[0];

        if (!title || !description || !hbsFile ||  !imageFile, !htmlFile) {
            return res.status(400).json({ message: 'All fields, including files, are required' });
        }

        //upload to cloudinary
        const count = await Design.countDocuments();
        const newCount = count + 1;

        const hbsFilePath = `hbs_files/design${newCount}.hbs`;
        const hbsType = 'text/x-handlebars-template';
        const siteName = `design-${newCount}-${Date.now()}`;
        
        const hbsFileUrl = await uploadFile(hbsFilePath, hbsFile.buffer, hbsType);  //deploy on supabase
        const htmlResponse = await deployToNetlify(htmlFile.buffer.toString(), siteName);  // deploy to netlify for static sites

        if (!hbsFileUrl) {
            return res.status(500).json({ message: 'Failed to upload files' });
        }
        const htmlFileUrl = htmlResponse.url; 
        if (!htmlFileUrl) {
            return res.status(500).json({ message: 'Failed to deploy HTML file' });
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
        await req.redisClient.del('designs'); 

        res.status(201).json({ message: 'Design added successfully', design: newDesign });

    } catch (error) {
        // This log now provides much more detail for debugging
        console.error('Error adding design:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};