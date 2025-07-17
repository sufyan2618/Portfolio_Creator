import express from 'express';
const app = express();
app.use(express.json());
import dotenv from 'dotenv';
dotenv.config();
import connectDb from './lib/connectDb.js';
import Authrouter from './routes/auth.router.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import InfoRouter from './routes/info.router.js';
import Designrouter from './routes/design.router.js';

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true, // Allow cookies to be sent with requests
}));


app.use('/api/auth', Authrouter);
app.use('/api/info', InfoRouter);
app.use('/api/design', Designrouter);
// Serve static files from the 'public' directory
app.use(express.static('public'));


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    connectDb();
});
