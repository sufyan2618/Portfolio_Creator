import express from 'express';
import { StoreInfo, UpdateInfo, GetInfo } from '../controllers/info.controller.js';
import auth from '../middleware/auth.middleware.js';


const InfoRouter = express.Router();
// Route to get information

InfoRouter.post('/update-info', auth, StoreInfo);
InfoRouter.post('/update-info', auth, UpdateInfo);
InfoRouter.get('/:id', auth, GetInfo);


export default InfoRouter;