import express from 'express';
import { Signup, Login, Logout } from '../controllers/auth.controller.js';
import auth from '../middleware/auth.middleware.js';

const router = express.Router();

// Route for user signup
router.post('/signup', Signup);

// Route for user login
router.post('/login', Login);

// Route for user logout
router.post('/logout',auth, Logout);

