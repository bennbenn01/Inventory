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
    const login = `Date: ${formattedDate}\t Status: Log-in \tUser: ${userName} \t\t\n`;

    try{
        const user = await User.findOne({ userName });

        if(!user || user.passWord !== passWord){
            return res.status(400).json({message: 'Invalid username or password'});
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

        res.json({message: 'Login Successful', userName});

    }catch(error){
        console.error(error);
        res.status(500).json({message: 'Server Error'});
    }
});

app.post('/logout', (req, res)=>{
    const { userName } = req.body;
    const logout = `Date: ${formattedDate}\t Status: Log-out \tUser: ${userName} \t\t\n`;

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
        console.error(error);
        res.status(500).json({message: 'Server Error'});
    }
});

app.get('/find_user', async (req, res)=> {
    const {firstName, lastName} = req.query;

    try{
        const query = {};
        if(firstName) query.firstName = firstName;
        if(lastName) query.lastName = lastName;

        const result = await User.findOne(query);   

        if(result){
            res.status(200).json(result);
        }else{
            return res.status(404).json({message: 'User was not found'});
        }
    }catch(error){
        console.error(error);
        res.status(404).json({message: 'Error on Receiving Information of User'});
    }
});

app.get('/find_users', async (req, res)=> {
    try{
        const result = await User.find();

        if(result.length > 0){
            res.status(200).json(result);
        }else{
            return res.status(404).json({message: 'User was not found'});
        }
    }catch(error){
        console.error(error);
        res.status(404).json({message: 'Error on Receiving Information of User'});
    }
});

app.post('/new_user', async (req, res)=>{
    const { firstName, lastName, userName, passWord } = req.body;
    
    try{    
        const existUser = await User.findOne({userName});
        if(existUser){
            return res.status(400).json({message: 'User already exits'});
        }

        const newUser = new User({firstName, lastName, userName, passWord});    
        await newUser.save();

        res.status(201).json({message: 'User was created successfully'});
    }catch(error){
        console.error(error);
        res.status(500).json({message: 'Error on Saving Information of User'});
    }
});

app.put('/update_user', async (req, res)=> {
    const {firstName, lastName, userName, passWord, address, age, position, startedDate} = req.body;

    if (!userName) {
        return res.status(400).json({ message: 'Username is required' });
    }

    try{
        const query = { userName };

        const update = {};
            if (firstName) update.firstName = firstName;
            if (lastName) update.lastName = lastName;
            if (passWord) update.passWord = passWord;
            if (address) update.address = address;
            if (age) update.age = age;
            if (position) update.position = position;

            if (startedDate) {
                const parsedDate = new Date(startedDate);
                if (isNaN(parsedDate)) {
                    return res.status(400).json({ message: 'Invalid started date' });
                }
                const formattedDate = parsedDate.toISOString().split('T')[0];
                update.startedDate = formattedDate;
            }
        
        const result = await User.updateOne(query, {$set: update});

        if(result.matchedCount > 0){
            if(result.matchedCount > 0){
                res.status(200).json({message: 'User updated successfully'});
            }else{
                res.status(200).json({message: 'User exists but no changes were made'});
            }
        }else{
            res.status(404).json({message: 'User was not found'});
        }
    }catch(error){
        console.error(error);
        res.status(500).json({message: 'Server Error'});
    }
});

app.delete('/delete_user', async (req, res)=> {
    const{firstName, lastName} = req.query;

    try{
        const query = {};
        if(firstName) query.firstName = firstName;
        if(lastName) query.lastName = lastName;

        const result = await User.deleteOne(query);

        if(result){
            res.status(200).json({message: 'User deleted successfully'});
        }else{
            res.status(404).json({message: 'User was not found'});
        }
    }catch(error){
        console.error(error);
        res.status(404).json({message: 'Error on Deleting Information of User'});
    }
});

app.listen(PORT, ()=>{
    console.log(`The Server is running on http://localhost:${PORT}`);
});