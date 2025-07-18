import express from 'express';
import { GetDesigns, AddDesign } from '../controllers/design.controller.js';
import multer from 'multer';
const storage = multer.memoryStorage(); 
const upload = multer({ storage: storage });


const Designrouter = express.Router();

Designrouter.get('/get-designs', GetDesigns);
Designrouter.post('/create-design', 
  upload.fields([
    { name: 'hbsfile', maxCount: 1 },
    { name: 'image', maxCount: 1 }
  ]), 
  AddDesign
);

export default Designrouter;