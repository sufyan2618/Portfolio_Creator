import express from 'express';
import { GetDesigns, AddDesign } from '../controllers/design.controller.js';
import upload from '../util/storage.js';

const router = express.Router();

router.get('/get-designs', GetDesigns);
router.post('/create-design', upload.fields([
    { name: 'hbsfile', maxCount: 1 },
    { name: 'htmlfile', maxCount: 1 },
    { name: 'image', maxCount: 1 }
]), AddDesign);

export default router;