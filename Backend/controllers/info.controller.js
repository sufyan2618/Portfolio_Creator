import Info from '../models/info.model.js';
import User from '../models/user.model.js';
import Handlebars from 'handlebars';
import formatDate from '../util/formatDate.js';
import Design from '../models/design.model.js';
import { uploadToCloudinary } from '../lib/cloudinary.js';


Handlebars.registerHelper('formatDate', formatDate);

export const StoreInfo = async (req, res) => {
    console.log(req.body);
    try {
        const { id } = req.body;
        if (!id) {
            return res.status(400).json({ message: 'User ID is missing' });
        }
        
        const data = JSON.parse(req.body.data);

        const profileImageFile = req.files?.profileImage?.[0];
        const projectImageFiles = req.files?.projectImages || [];


        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const uploadPromises = [];
        if (profileImageFile) {
            const b64 = `data:${profileImageFile.mimetype};base64,${profileImageFile.buffer.toString("base64")}`;
            uploadPromises.push(uploadToCloudinary(b64, 'profile_images'));
        }
        projectImageFiles.forEach(file => {
            const b64 = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;
            uploadPromises.push(uploadToCloudinary(b64, 'project_images'));
        });

        const uploadedUrls = await Promise.all(uploadPromises);


        if (profileImageFile) {
            data.personalInfo.profilePictureUrl = uploadedUrls.shift();
        }
        data.projects.forEach((project, index) => {
            project.imageUrls = [uploadedUrls[index]]; // Direct 1-to-1 mapping
        });

        const newInfo = new Info({
            userId: id,
            ...data
        })
        await newInfo.save();

        res.status(200).json({ message: 'Information added successfully', info: newInfo });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: `Server error: ${error.message}` });
    }
};

export const UpdateInfo = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
            return res.status(400).json({ message: 'User ID is missing' });
        }
        
        const data = JSON.parse(req.body.data);

        const profileImageFile = req.files?.profileImage?.[0];
        const projectImageFiles = req.files?.projectImages || [];


        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const uploadPromises = [];
        if (profileImageFile) {
            const b64 = `data:${profileImageFile.mimetype};base64,${profileImageFile.buffer.toString("base64")}`;
            uploadPromises.push(uploadToCloudinary(b64, 'profile_images'));
        }
        projectImageFiles.forEach(file => {
            const b64 = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;
            uploadPromises.push(uploadToCloudinary(b64, 'project_images'));
        });

        const uploadedUrls = await Promise.all(uploadPromises);


        if (profileImageFile) {
            data.personalInfo.profilePictureUrl = uploadedUrls.shift();
        }
        data.projects.forEach((project, index) => {
            project.imageUrls = [uploadedUrls[index]]; // Direct 1-to-1 mapping
        });


        console.log("10. Attempting to save to MongoDB...");
        const updatedInfo = await Info.findOneAndUpdate(
            { userId: id },
            { $set: data },
            { new: true, upsert: true, runValidators: true }
        );

        res.status(200).json({ message: 'Information updated successfully', info: updatedInfo });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: `Server error: ${error.message}` });
    }
}

export const GetInfo = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if user exists
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Fetch the info document for the user
        const info = await Info.findOne({ userId: id })
        if (!info) {
            return res.status(404).json({ message: 'Information not found for this user' });
        }


        res.status(200).json(info);
    } catch (error) {
        console.error('Error fetching information:', error);
        res.status(500).json({ message: `Error fetching information: ${error.message}` });
    }
};


export const GetPortfolioPage = async (req, res) => {
    try {
        const { userId, designId } = req.params;

        // 1. Fetch user data
        const portfolioData = await Info.findOne({ userId }).lean();
        if (!portfolioData) {
            return res.status(404).send('<h1>Portfolio data not found.</h1>');
        }

        const designData = await Design.findOne({ designId }).lean();
        if (!designData) {
            return res.status(404).send('<h1>Design template not found.</h1>');
        }


        const templateData = {
            ...portfolioData,
            education: (portfolioData.education || []).map(edu => ({ ...edu, startDate: formatDate(edu.startDate), endDate: formatDate(edu.endDate) })),
            workExperience: (portfolioData.workExperience || []).map(exp => ({ ...exp, startDate: formatDate(exp.startDate), endDate: formatDate(exp.endDate) })),
            currentYear: new Date().getFullYear(),
            hasEducationOrExperience: (portfolioData.education?.length > 0) || (portfolioData.workExperience?.length > 0)
        };


        const response = await fetch(designData.hbsFileUrl)

        const templateString = await response.text();

        
        const compiledTemplate = Handlebars.compile(templateString);
        const finalHtml = compiledTemplate(templateData);

        res.status(200).send(finalHtml);

    } catch (error) {
        
        console.error("Error in getPortfolioPage:", error); 
        res.status(500).send(`<h1>Server Error</h1><p>An unexpected error occurred. Check the server console for details.</p><pre>${error.message}</pre>`);
    }
};