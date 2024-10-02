import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import users from './routes/api/users.js'
import { fileURLToPath } from 'url'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use('/design', (express.static('design')));
app.use((express.static('Views')));

mongoose.connect(process.env.MONGO_API,{
    dbName: 'inventory'
})
.then(()=> console.log('MongoDB Connected'))
.catch(error => console.error(error));


app.use((req, res, next)=>{
    const allowedOrigin = process.env.PORT;
    const origin = req.headers.origin;

    if(origin === allowedOrigin){
        next(app.use('/users', users));
    }else{
        res.sendFile(path.join(__dirname, 'Views', '403.html'));
    }

});

app.all('*', (req, res)=>{
    res.sendFile(path.join(__dirname, 'Views', '403.html'));
});

app.listen(PORT, ()=>{
    console.log(`The Server is running on http://localhost:${PORT}`);
});