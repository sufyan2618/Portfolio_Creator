// design.router.js
import express from 'express';
import { GetDesigns, AddDesign } from '../controllers/design.controller.js';
import upload from '../util/storage.js';

const Designrouter = express.Router();

Designrouter.get('/get-designs', GetDesigns);
Designrouter.post('/create-design', 
  upload.fields([
    { name: 'hbsfile', maxCount: 1 },
    { name: 'htmlfile', maxCount: 1 },
    { name: 'image', maxCount: 1 }
  ]), 
  AddDesign
);

export default Designrouter;