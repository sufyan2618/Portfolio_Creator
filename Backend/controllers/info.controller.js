import Info from '../models/info.model.js';
import User from '../models/user.model.js';
import Handlebars from 'handlebars';
import formatDate from '../util/formatDate.js';
import Design from '../models/design.model.js';
import { uploadToCloudinary } from '../lib/cloudinary.js';


Handlebars.registerHelper('formatDate', formatDate);

export const StoreInfo = async (req, res) => {
    try {
        const { id, data } = req.body;

        // Check if user exists
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Validate data
        if (!data || typeof data !== 'object') {
            return res.status(400).json({ message: 'Invalid information data' });
        }


        const existingInfo = await Info.findOne({ userId: id });
        if (existingInfo) {
            return res.status(400).json({ message: 'Information already exists for this user' });
        }

        // Prepare data according to the schema using the 'data' object
        const info = new Info({
            userId: id, 
            personalInfo: data.personalInfo || {},
            services: data.services || [],
            about: data.about || '',
            skills: data.skills || [],
            education: data.education || [],
            workExperience: data.workExperience || [],
            projects: data.projects || [],
            certifications: data.certifications || [],
            languages: data.languages || [],
            interests: data.interests || [],
            socialLinks: data.socialLinks || {},
            additionalInfo: data.additionalInfo || ''
        });

        await info.save();

        res.status(201).json({ message: 'Information stored successfully', info });
    } catch (error) {
        console.error('Error storing information:', error);
        res.status(500).json({ message: `Error storing information: ${error.message}` });
    }
};

export const UpdateInfo = async (req, res) => {
    console.log(req.body);
    try {
        const { id, data } = req.body;
        console.log(id);
        const profileImage = req.files?.profileImage?.[0];
        const projectImages = req.files?.projectImage || [];


        // Check if user exists
        const user = await User.findById(id);
        console.log('User found:', user);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Validate data
        if (!data || typeof data !== 'object') {
            return res.status(400).json({ message: 'Invalid information data' });
        }

        // If profileImage is provided, upload it to Cloudinary
        let profileImageUrl = '';
        if (profileImage) {
            const base64Image = `data:${profileImage.mimetype};base64,${profileImage.buffer.toString("base64")}`;
            profileImageUrl = await uploadToCloudinary(base64Image, 'profile_images');
            if (!profileImageUrl) {
                return res.status(500).json({ message: 'Failed to upload profile image' });
            }
            // Add profileImageUrl to personalInfo if it exists
            if (!data.personalInfo) {
                data.personalInfo = {};
            }
            data.personalInfo.profileImageUrl = profileImageUrl;
        }
        // If projectImages are provided, upload them to Cloudinary
        let projectImageUrls = [];
        if (projectImages.length > 0) {
            for (const projectImage of projectImages) {
                const base64Image = `data:${projectImage.mimetype};base64,${projectImage.buffer.toString("base64")}`;
                const projectImageUrl = await uploadToCloudinary(base64Image, 'project_images');
                if (!projectImageUrl) {
                    return res.status(500).json({ message: 'Failed to upload project image' });
                }
                projectImageUrls.push(projectImageUrl);
            }
            // Add projectImageUrls to projects if it exists
            if (!data.projects) {
                data.projects = [];
            }
            data.projects = data.projects.map((project, index) => {
                if (projectImageUrls[index]) {
                    return {
                        ...project,
                        projectImageUrl: projectImageUrls[index] // Add the uploaded image URL
                    };
                }
                return project; // Return the project unchanged if no image URL is available
            });
        }



        // Find and update the info document
        const updatedInfo = await Info.findOneAndUpdate(
            { userId: id },
            {
                personalInfo: data.personalInfo || {},
                services: data.services || [],
                about: data.about || '',
                services: data.services || [],
                skills: data.skills || [],
                education: data.education || [],
                workExperience: data.workExperience || [],
                projects: data.projects || [],
                certifications: data.certifications || [],
                languages: data.languages || [],
                interests: data.interests || [],
                socialLinks: data.socialLinks || {},
                additionalInfo: data.additionalInfo || ''
            },
            { new: true, runValidators: true }
        );

        if (!updatedInfo) {
            return res.status(404).json({ message: 'Information not found for this user' });
        }

        res.status(200).json({ message: 'Information updated successfully', info: updatedInfo });
        
    } catch (error) {
        console.error('Error updating information:', error);
        res.status(500).json({ message: `Error updating information: ${error.message}` });
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
        const info = await Info.findOne({ userId: id });
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