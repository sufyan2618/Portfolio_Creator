import Info from '../models/info.model.js';
import User from '../models/user.model.js';
import fs from 'fs';
import path from 'path';
import Handlebars from 'handlebars';
import { fileURLToPath } from 'url';
import formatDate from '../util/formatDate.js';



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

        // Find and update the info document
        const updatedInfo = await Info.findOneAndUpdate(
            { userId: id },
            {
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

        // 2. Prepare data for the template
        const templateData = {
            ...portfolioData,
            education: (portfolioData.education || []).map(edu => ({ ...edu, startDate: formatDate(edu.startDate), endDate: formatDate(edu.endDate) })),
            workExperience: (portfolioData.workExperience || []).map(exp => ({ ...exp, startDate: formatDate(exp.startDate), endDate: formatDate(exp.endDate) })),
            currentYear: new Date().getFullYear(),
            hasEducationOrExperience: (portfolioData.education?.length > 0) || (portfolioData.workExperience?.length > 0)
        };

        // 3. Construct the correct path to your template
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        
        // --- THIS IS THE CORRECTED LINE ---
        // It navigates from /backend/controllers up to /backend, then into /public/templates
        const templatePath = path.join(__dirname, '..', 'public', 'templates', designId, 'index.hbs');
        
        // 4. Read the template file
        const templateString = fs.readFileSync(templatePath, 'utf8');
        
        // 5. Compile and send the final HTML
        const compiledTemplate = Handlebars.compile(templateString);
        const finalHtml = compiledTemplate(templateData);

        res.status(200).send(finalHtml);

    } catch (error) {
        // 6. Improved error logging remains for debugging
        console.error("Error in getPortfolioPage:", error); 

        if (error.code === 'ENOENT') {
            return res.status(404).send(`<h1>Design template not found.</h1><p>Checked path: ${error.path}</p>`);
        }

        res.status(500).send(`<h1>Server Error</h1><p>An unexpected error occurred. Check the server console for details.</p><pre>${error.message}</pre>`);
    }
};