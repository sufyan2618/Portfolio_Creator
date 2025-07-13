import Info from '../models/info.model.js';
import User from '../models/user.model.js';

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

        // Prevent duplicate info for the same user
        // const existingInfo = await Info.findOne({ userId: id });
        // if (existingInfo) {
        //     return res.status(400).json({ message: 'Information already exists for this user' });
        // }

        // Prepare data according to the schema using the 'data' object
        const info = new Info({
            userId: id, 
            personalInfo: data.personalInfo || {},
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

export const UpdateInfo = async () => {
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
