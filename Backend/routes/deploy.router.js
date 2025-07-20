import express from 'express';
import { deployUserPortfolio } from '../controllers/deploy.controller.js';
const Deployrouter = express.Router();
import auth from '../middleware/auth.middleware.js';

Deployrouter.post('/deploy-portfolio', auth, deployUserPortfolio);

export default Deployrouter;