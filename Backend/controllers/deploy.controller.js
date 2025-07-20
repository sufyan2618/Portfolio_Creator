import Info from '../models/info.model.js'; 
import { deployToNetlify } from '../lib/deployToNetlify.js';


export const deployUserPortfolio = async (req, res) => {
    try {
        const {htmlContent, userId} = req.body;
        if (!htmlContent || !userId) {
            return res.status(400).json({ success: false, error: 'HTML content and user ID are required' });
        }
        const user = await Info.findOne({userId: userId});
        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }
        const siteName = `portfolio-${user.personalInfo.fullName.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}`;
        const deployResponse = await deployToNetlify(htmlContent, siteName);
        if (deployResponse.success) {
            res.status(200).json({
                success: true,
                url: deployResponse.url,
                deployId: deployResponse.deployId,
                deployData: deployResponse.deployData
            });
        } else {
            res.status(500).json({
                success: false,
                error: 'Deployment failed'
            });
        }

    } catch (error) {
        console.error('Netlify deployment error:', error.response?.data?.message || error.message);
        res.status(500).json({
            success: false,
            error: error.response?.data?.message || 'Deployment failed'
        });
    }
};
