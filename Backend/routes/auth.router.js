import express from 'express';
import { Signup, Login, Logout, Check_Auth } from '../controllers/auth.controller.js';
import auth from '../middleware/auth.middleware.js';

const Authrouter = express.Router();

// Route for user signup
Authrouter.post('/signup', Signup);

// Route for user login
Authrouter.post('/login', Login);

// Route for user logout
Authrouter.post('/logout',auth, Logout);

Authrouter.get('/check-auth', auth, Check_Auth);

// Export the Authrouter
export default Authrouter;