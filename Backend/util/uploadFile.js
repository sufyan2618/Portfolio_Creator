import supabaseAdminClient from "../lib/supabaseAdminClient.js";

const bucketName = 'public-files';

const uploadFile = async (filePath, fileData, type) => {
    try {
        // Upload the file to Supabase storage
        const { data: uploadData, error: uploadError } = await supabaseAdminClient.storage
            .from(bucketName)
            .upload(filePath, fileData, {
                contentType: type,
                upsert: false // Consider adding upsert option
            });

        if (uploadError) {
            throw new Error(`Error uploading file: ${uploadError.message}`);
        }

        // Correctly get the public URL of the uploaded file
        const { data: urlData } = supabaseAdminClient.storage
            .from(bucketName)
            .getPublicUrl(uploadData.path);

        if (!urlData.publicUrl) {
            throw new Error('Could not retrieve public URL.');
        }

        console.log('Public URL:', urlData.publicUrl);
        return urlData.publicUrl; // Return the public URL

    } catch (error) {
        console.error('Upload File Error:', error);
        throw error;
    }
};

export default uploadFile;
