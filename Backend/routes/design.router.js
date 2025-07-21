import express from 'express';
import { GetDesigns, AddDesign } from '../controllers/design.controller.js';
import adminAuth from '../middleware/adminAuth.middleware.js';
import multer from 'multer';
const storage = multer.memoryStorage(); 
const upload = multer({ storage: storage });
import { redisCache } from '../middleware/redisCache.js';



const Designrouter = express.Router();

Designrouter.get('/get-designs', redisCache, GetDesigns);
Designrouter.post('/create-design', 
  upload.fields([
    { name: 'htmlFile', maxCount: 1 },
    { name: 'hbsfile', maxCount: 1 },
    { name: 'image', maxCount: 1 }
  ]), 
  adminAuth,
  AddDesign
);

export default Designrouter;