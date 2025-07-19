// deploy.controller.js
import axios from 'axios';
import JSZip from 'jszip';
import Info from '../models/info.model.js'; // You only need this model

// Helper function (your existing one is perfect)
const waitForNetlifyDeployReady = async (siteId, deployId, NETLIFY_TOKEN, timeoutMs = 70000, pollInterval = 2000) => {
    // ... no changes needed here, it's correct.
    const start = Date.now();
    let state = 'preparing';

    while (Date.now() - start < timeoutMs) {
        const deployResponse = await axios.get(
            `https://api.netlify.com/api/v1/sites/${siteId}/deploys/${deployId}`,
            { headers: { 'Authorization': `Bearer ${NETLIFY_TOKEN}` } }
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
        const { htmlContent, designId, userId } = req.body;
        const NETLIFY_TOKEN = process.env.NETLIFY_TOKEN;

        if (!NETLIFY_TOKEN) {
            return res.status(500).json({
                success: false,
                error: 'Netlify token not configured'
            });
        }

        // ✅ FIX #1: Use findOne to query by the userId field
        const userInfo = await Info.findOne({ userId: userId });
        if (!userInfo) {
            return res.status(404).json({ success: false, error: 'User info not found.' });
        }

        // Generate a unique site name for Netlify
        const siteName = `portfolio-${userInfo.personalInfo.fullName.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}`;

        // ✅ FIX #2: Correct axios.post syntax
        // The signature is axios.post(url, data, config).
        const siteResponse = await axios.post(
            'https://api.netlify.com/api/v1/sites',
            { // This is the 'data' object
                name: siteName,
                // Note: custom_domain requires a paid Netlify plan.
                // We will use the default .netlify.app URL for now.
            },
            { // This is the 'config' object
                headers: {
                    'Authorization': `Bearer ${NETLIFY_TOKEN}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        const siteId = siteResponse.data.id;
        const siteUrl = siteResponse.data.ssl_url || siteResponse.data.url;

        // Step 2 & 3: ZIP content and Deploy (Your code here is already correct)
        const zip = new JSZip();
        zip.file('index.html', htmlContent);
        const headersFileContent = `/*\n  Content-Type: text/html; charset=utf-8`;

        // Add the _headers file to the zip
        zip.file('_headers', headersFileContent);
        const zipBuffer = await zip.generateAsync({ type: 'nodebuffer' });

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

        // Step 4: Wait for deployment to be ready (Your code here is correct)
        const deployData = await waitForNetlifyDeployReady(siteId, deployId, NETLIFY_TOKEN);

        res.json({
            success: true,
            url: siteUrl, // The main site URL
            siteId,
            deployId,
            deployState: deployData.state,
            deployUrl: deployData.deploy_ssl_url || deployData.deploy_url // The specific URL for this deploy
        });

    } catch (error) {
        console.error('Netlify deployment error:', error.response?.data?.message || error.message);
        res.status(500).json({
            success: false,
            error: error.response?.data?.message || 'Deployment failed'
        });
    }
};
