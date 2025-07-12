import express from 'express';
import { StoreInfo } from '../controllers/info.controller.js';
import auth from '../middleware/auth.middleware.js';


const InfoRouter = express.Router();
// Route to get information

InfoRouter.post('/update-info', auth, StoreInfo);

export default InfoRouter;