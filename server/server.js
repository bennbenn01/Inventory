import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import users from './routes/api/users.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/design', (express.static('design')));
app.use((express.static('Views')));

mongoose.connect(process.env.MONGO_API,{
    dbName: 'inventory'
})
.then(()=> console.log('MongoDB Connected'))
.catch(error => console.error(error));

app.use('/users', users);

app.get('/', (req, res)=>{
    res.send('The Server is online.');  
});

app.get('/404(.html)?', (req, res)=> {
    res.sendFile(path.join(__dirname, 'Views', '404.html'));
});

app.listen(PORT, ()=>{
    console.log(`The Server is running on http://localhost:${PORT}`);
});