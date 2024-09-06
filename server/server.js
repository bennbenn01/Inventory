import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import User from './Models/User.js'
import fs from 'fs'
import { format } from 'date-fns'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const fileSystem = fs;
const now = Date();
const formattedDate = format(now, 'HH:mm a MM/dd/yyyy');
const logsFilePath = './Logs/logs.txt';
const logsDirPath = './Logs';

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_API,{
    dbName: 'inventory'
})
.then(()=> console.log('MongoDB Connected'))
.catch(error => console.error(error));

app.get('/', (req, res)=>{
    res.send('The Server is online.');    
});

app.post('/login', async (req, res)=> {
    const { userName, passWord } = req.body;
    const login = `User:\t${userName} \t\tDate: ${formattedDate}\t\t Status: Log-in\n`;

    try{
        const user = await User.findOne({ userName });

        if(!user || user.passWord !== passWord){
            return res.status(401).json({message: 'Invalid username or password'});
        }

        if(!fileSystem.existsSync(logsDirPath)){
            fileSystem.mkdirSync(logsDirPath);
            console.log("Logs Directory was been created");
        }

        if(!fileSystem.existsSync(logsFilePath)){
            fileSystem.writeFileSync(logsFilePath, login);
            console.log("Logs was been created");
        }else{
            fileSystem.appendFileSync(logsFilePath, login);
            console.log("Logs was been updated");
        }

        res.json({message: 'Login Successful'});
    }catch(error){
        res.status(500).json({message: 'Server Error'});
    }
});

app.post('/logout', async (req, res)=>{
    const { userName } = req.body;
    const logout = `User:\t${userName} \t\tDate: ${formattedDate}\t\t Status: Log-out\n`;

    try{
        if(!fileSystem.existsSync(logsDirPath)){
            fileSystem.mkdirSync(logsDirPath, logout);
            console.log("Logs Directory was been created");
        }
    
        if(!fileSystem.existsSync(logsFilePath)){
            fileSystem.writeFileSync(logsFilePath, logout);
            console.log("Logs was been created");
        }else{
            fileSystem.appendFileSync(logsFilePath, logout);
            console.log("Logs was been updated");
        }

        res.json({message: 'Logout'});
    }catch(error){
        res.status(500).json({message: 'Server Error'});
    }
})

app.get('/find_users', async (req, res)=> {
    try{
        const result = await User.find();

        if(result){
            res.status(200).json(result);
        }else{
            return res.status(404).json({message: 'User was not found'});
        }
    }
    catch(error){
        console.error(error);
        res.status(404).json({message: 'Error on Receiving Information of User'});
    }
});

app.post('/new_user', async (req, res)=>{
    try{
        const result = await User.save();

        if(result){
            res.status(201).json({message: 'User created successfully'});
        }else{
            return res.status(404).json({message: 'User was not found'});
        }
    }
    catch(error){
        console.error(error);
        res.status(404).json({message: 'Error on Saving Information of User'});
    }
});

app.put('/update_user/:id', async (req, res)=> {
    try{
        const userId = req.params.id;
        const result = await User.updateOne(userId);

        if(result){
            res.status(200).json({mesage: 'User updated successfully'});
        }else{
            return res.status(404).json({message: 'User was not found'});
        }
    }catch(error){
        console.error(error);
        res.status(404).json({message: 'Error on Updating Information of User'});
    }
});

app.delete('/delete_user/:id', async (req, res)=> {
    try{
        const userId = req.params.id;
        const result = await User.findByIdAndDelete(userId);

        if(result){
            res.status(202).json({message: 'User deleted successfully'});
        }else{
            return res.status(404).json({message: 'User was not found'});
        }
    }
    catch(error){
        console.error(error);
        res.status(404).json({message: 'Error on Deleting Information of User'});
    }
});

app.listen(PORT, ()=>{
    console.log(`The Server is running on http://localhost:${PORT}`);
});