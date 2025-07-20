import axios from 'axios'
import JSZip from 'jszip'


const waitForNetlifyDeployReady = async (siteId, deployId, NETLIFY_TOKEN, timeoutMs = 70000, pollInterval = 2000) => {
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

export const deployToNetlify = async (htmlContent, siteName) => {
    try {
        const NETLIFY_TOKEN = process.env.NETLIFY_TOKEN;
    if (!NETLIFY_TOKEN) {
        throw new Error('Netlify token not configured');
    }

    const siteResponse = await axios.post(
        'https://api.netlify.com/api/v1/sites',
        {
            name: siteName,
        },
        { 
            headers: {
                'Authorization': `Bearer ${NETLIFY_TOKEN}`,
                'Content-Type': 'application/json'
            }
        }
    );
    const siteId = siteResponse.data.id;
    const siteUrl = siteResponse.data.ssl_url || siteResponse.data.url;
    const zip = new JSZip();
    zip.file('index.html', htmlContent);
    const headersFileContent = `/*\n  Content-Type: text/html; charset=utf-8`;
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
    const deployData = await waitForNetlifyDeployReady(siteId, deployId, NETLIFY_TOKEN);
    return {
        success: true,
        url: siteUrl,
        deployId: deployId,
        deployData: deployData
    };
    
    } catch (error) {
        console.error('Error deploying to Netlify:', error);
        return {
            success: false,
            error: error.message || 'An error occurred while deploying to Netlify.'
        };
    }
}