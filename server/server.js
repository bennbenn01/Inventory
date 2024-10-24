import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import users from './routes/api/users.js'
import errorHandler from './Middlewares/errorHandler.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

mongoose.connect(process.env.MONGO_API,{
    dbName: 'inventory'
})
.then(()=> console.log('MongoDB Connected'))
.catch(error => console.error(error));

app.get('/', (req, res)=> {
    res.send("Server is Online");
});

app.use('/users', users);

app.use(errorHandler);

app.listen(PORT, ()=> {
    console.log(`The Server is running on http://localhost:${PORT}`);
});