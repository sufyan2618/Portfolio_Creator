import multer from "multer";
import Design from "../models/design.model.js";
import path from "path";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === 'hbsfile') {
            cb(null, 'public/templates');
        } else if (file.fieldname === 'htmlfile') {
            cb(null, '../Frontend/public/designs');
        } else if (file.fieldname === 'image') {
            cb(null, '../Frontend/public/portImages');
        } else {
            cb(new Error('Invalid fieldname'), null);
        }
    },
    // Generate a unique filename on each upload to prevent conflicts
    filename: async (req, file, cb) => {
            const count = await Design.countDocuments();
            const filename = `design${count + 1}`;
            if (file.fieldname === 'hbsfile') {
                cb(null, `${filename}.hbs`);
            } else if (file.fieldname === 'htmlfile') {
                cb(null, `${filename}.html`);
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