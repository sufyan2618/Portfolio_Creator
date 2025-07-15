import multer from "multer";
import Design from "../models/design.model";

const count = 0; // Initialize count of documents (fetch during startup)
Design.countDocuments().then(c => { count = c; });

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === 'hbsfile') {
            cb(null, 'backend/public/templates');
        } else if (file.fieldname === 'htmlfile') {
            cb(null, 'frontend/public/designs');
        } else if (file.fieldname === 'image') {
            cb(null, 'frontend/public/images');
        } else {
            cb(new Error('Invalid fieldname'), null);
        }
    },
    filename: (req, file, cb) => {
        const uniqueName = `design-${count + 1}}`;
        cb(null, uniqueName);
    }
})

const upload = multer({ storage });
export default upload;