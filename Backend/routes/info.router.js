import express from 'express';
import { StoreInfo, UpdateInfo, GetInfo, GetPortfolioPage } from '../controllers/info.controller.js';
import auth from '../middleware/auth.middleware.js';
import multer from 'multer';
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


const InfoRouter = express.Router();
// Route to get information

InfoRouter.post('/store-info', auth, upload.fields([
    { name: 'profileImage', maxCount: 1 },
    { name: 'projectImages', maxCount: 10 },
]), StoreInfo);

InfoRouter.post('/update-info', auth, upload.fields([
    { name: 'profileImage', maxCount: 1 },
    { name: 'projectImages', maxCount: 10 },
]) , UpdateInfo);

InfoRouter.get('/:id', auth, GetInfo);

InfoRouter.get('/portfolio/:userId/:designId', auth, GetPortfolioPage);



export default InfoRouter;