import express from 'express';
const app = express();
app.use(express.json());
import dotenv from 'dotenv';
dotenv.config();
import connectDb from './lib/connectDb.js';
import Authrouter from './routes/auth.router.js';
import cookieParser from 'cookie-parser';

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/api/auth', Authrouter);






const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    connectDb();
});
