import multer from "multer";
import Design from "../models/design.model.js";
import fs from "fs";       // Import the file system module
import path from "path";   // Import the path module

const storage = multer.diskStorage({
    destination: async (req, file, cb) => {
        try {
            // 1. Determine the name for the new design's folder (e.g., 'design1')
            const count = await Design.countDocuments();
            const designFolder = `design${count + 1}`;
            
            let destPath = '';

            // 2. Determine the full path for the destination directory
            if (file.fieldname === 'hbsfile') {
                destPath = path.join('backend', 'public', 'templates', designFolder);
            } else if (file.fieldname === 'htmlfile') {
                destPath = path.join('frontend', 'public', 'designs', designFolder);
            } else if (file.fieldname === 'image') {
                destPath = path.join('frontend', 'public', 'portImages');
            } else {
                return cb(new Error('Invalid fieldname'), null);
            }

            // 3. Create the directory if it doesn't already exist
            // The 'recursive: true' option prevents errors if the folder exists
            fs.mkdirSync(destPath, { recursive: true });
            
            // 4. Set the final destination for the file
            cb(null, destPath);

        } catch (err) {
            cb(err);
        }
    },
    filename: (req, file, cb) => {
        // 5. Provide a specific, correct filename with its extension
        if (file.fieldname === 'hbsfile') {
            cb(null, 'index.hbs');
        } else if (file.fieldname === 'htmlfile') {
            cb(null, 'index.html');
        } else if (file.fieldname === 'image') {
            // Give the image a unique name to prevent conflicts
            cb(null, Date.now() + path.extname(file.originalname));
        } else {
            cb(new Error('Invalid fieldname'), null);
        }
    }
});

const upload = multer({ storage });
export default upload;
