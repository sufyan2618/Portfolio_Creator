import axios from 'axios';
import JSZip from 'jszip';
import User from '../models/user.model.js';
import Info from '../models/info.model.js';

// Helper: poll for Netlify deploy to finish
const waitForNetlifyDeployReady = async (siteId, deployId, NETLIFY_TOKEN, timeoutMs = 60000, pollInterval = 2000) => {
    const start = Date.now();
    let state = 'preparing';

    while (Date.now() - start < timeoutMs) {
        const deployResponse = await axios.get(
            `https://api.netlify.com/api/v1/sites/${siteId}/deploys/${deployId}`,
            {
                headers: { 'Authorization': `Bearer ${NETLIFY_TOKEN}` }
            }
        );

        state = deployResponse.data.state;
        if (state === 'ready') return deployResponse.data;
        if (['error', 'failed'].includes(state)) throw new Error(`Deploy failed: ${state}`);

        await new Promise(r => setTimeout(r, pollInterval));
    }
    throw new Error('Timed out waiting for Netlify deploy to become ready');
};

export const deployToNetlify = async (req, res) => {
    try {
        const { htmlContent, userId, designId } = req.body;


        const user = await Info.findById(userId)
        const customdomain = user.personalInfo.fullName.replace(/\s+/g, '-').toLowerCase() + '.netlify.app';

        const NETLIFY_TOKEN = process.env.NETLIFY_TOKEN;
        if (!NETLIFY_TOKEN) {
            return res.status(500).json({
                success: false,
                error: 'Netlify token not configured'
            });
        }

        // Step 1: Create a new site
        const siteResponse = await axios.post(
            'https://api.netlify.com/api/v1/sites',
            { name: `portfolio-${userId}-${designId}-${Date.now()}` },
            { name: customdomain },
            {
                headers: {
                    'Authorization': `Bearer ${NETLIFY_TOKEN}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        const siteId = siteResponse.data.id;
        const siteUrl = siteResponse.data.url;

        // Step 2: ZIP content
        const zip = new JSZip();
        zip.file('index.html', htmlContent);
        const zipBuffer = await zip.generateAsync({ type: 'nodebuffer' });

        // Step 3: Deploy ZIP
        const deployResponse = await axios.post(
            `https://api.netlify.com/api/v1/sites/${siteId}/deploys`,
            zipBuffer,
            {
                headers: {
                    'Authorization': `Bearer ${NETLIFY_TOKEN}`,
                    'Content-Type': 'application/zip'
                }
            }
        );
        const deployId = deployResponse.data.id;

        // Step 4: Wait for deployment to be ready
        const deployData = await waitForNetlifyDeployReady(siteId, deployId, NETLIFY_TOKEN);

        res.json({
            success: true,
            url: siteUrl,
            siteId,
            deployId,
            deployState: deployData.state,
            deployUrl: deployData.deploy_ssl_url || deployData.deploy_url
        });

    } catch (error) {
        console.error('Netlify deployment error:', error);
        res.status(500).json({
            success: false,
            error: error.response?.data?.message || error.message || 'Deployment failed'
        });
    }
};
