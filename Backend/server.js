import express from 'express';
const app = express();
import dotenv from 'dotenv';
dotenv.config();

app.get('/', (req, res) => {
    res.json({ message: 'Hello World!' });
})


app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
