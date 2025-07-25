import express from 'express';
const app = express();
app.use(express.json());
import dotenv from 'dotenv';
dotenv.config();
import path from 'path';
import connectDb from './lib/connectDb.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import Authrouter from './routes/auth.router.js';
import InfoRouter from './routes/info.router.js';
import Designrouter from './routes/design.router.js';
import Adminrouter from './routes/admin.router.js';
import Deployrouter from './routes/deploy.router.js';
import noCache from './middleware/noCache.js';

app.use(noCache)
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true, // Allow cookies to be sent with requests
}));


if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, '../Frontend/dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, '../Frontend/dist/index.html'));
  
    })
  }
    


app.use('/api/auth', Authrouter);
app.use('/api/info', InfoRouter);
app.use('/api/design', Designrouter);
app.use('/api/admin', Adminrouter);
app.use('/api/deploy', Deployrouter);
// Serve static files from the 'public' directory
app.use(express.static('public'));


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    connectDb();
});
