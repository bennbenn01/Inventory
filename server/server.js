import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import api from './routes/api.js'
import path from 'path'
import { fileURLToPath } from 'url'
import errorHandler from './Middlewares/errorHandler.js'

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); 
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

mongoose.connect(process.env.MONGO_API,{
    dbName: 'inventory'
})
.then(()=> console.log('MongoDB Connected'))
.catch(error => console.error(error));

app.get('/', (req, res)=> {
    res.send("Server is Online");
});

app.use('/v1/data', api);

app.use(errorHandler);

app.listen(PORT, ()=> {
    console.log(`The Server is running on http://localhost:${PORT}`);
});