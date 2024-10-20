import User from '../Models/User.js'
import userFeedback from '../Models/userFeedback.js'
import dotenv from 'dotenv'
import fs from 'fs' 
import { format } from 'date-fns'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'

dotenv.config();

const fileSystem = fs;
const logsFilePath = './Logs/logs.txt';
const logsDirPath = './Logs';
const envFilePath = './.env';

function generatedKey(){
    return crypto.randomBytes(32).toString('hex')
}

function updatedToken(token){
    let envContent = fs.readFileSync(envFilePath, 'utf8');
    const tokenRegex = /TOKEN=.*\n?/;

    if(tokenRegex.test(envContent)){
        envContent = envContent.replace(tokenRegex, `TOKEN=${token}\n`)
    }else{
        envContent += `TOKEN=${token}\n`;
    }

    try {
        fs.writeFileSync(envFilePath, envContent);
        console.log('Token saved to .env file');
    } catch (err) {
        console.error('Error writing to .env file', err);
    }
}

const logActivity = (status, userName)=> {
    const now = Date();
    const formattedDate = format(now, 'HH:mm a MM/dd/yyyy');
    const logEntry = `Date: ${formattedDate}\t Status: ${status} \tUser: ${userName} \t\t\n`;

    if(!fileSystem.existsSync(logsDirPath)){
        fileSystem.mkdirSync(logsDirPath);
        console.log("Logs Directory was been created");
    }

    if(!fileSystem.existsSync(logsFilePath)){
        fileSystem.writeFileSync(logsFilePath, logEntry);
        console.log("Logs was been created");
    }else{
        fileSystem.appendFileSync(logsFilePath, logEntry);
        console.log("Logs was been updated");
    }
};

const loginUser = async (req, res)=> {
    const { userName, passWord } = req.body;

    try{
        const user = await User.findOne({ userName });

        if(!user || user.passWord !== passWord){
            return res.status(400).json({message: 'Invalid username or password'});
        }

        logActivity('Log-in', userName);
        
        let secretKey = process.env.TOKEN;
        
        if (!secretKey) {
            secretKey = generatedKey();
            updatedToken(secretKey);
        }
        
        const token = jwt.sign({userName: user.userName}, secretKey, {expiresIn: '24h'});
        console.log('Generated token:', token);

        res.json({message: 'Login Successful', userName, token});
    }catch(error){
        console.error(error);
        res.status(500).json({message: 'Server Error'});
    }
};

const logoutUser = (req, res)=>{
    const { userName } = req.body;

    try{
        logActivity('Log-out', userName);

        const newToken = generatedKey();
        updatedToken(newToken);

        res.json({message: 'Logout', newToken});
    }catch(error){
        console.error(error);
        res.status(500).json({message: 'Server Error'});
    }
};

const findUser = async (req, res)=> {
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
};

const findUsers = async (req, res)=> {
    try{
        const result = await User.find();

        if(result.length > 0){
            return res.status(200).json(result);
        }else{
            return res.status(404).json({message: 'User was not found'});
        }
    }catch(error){
        console.error(error);
        res.status(404).json({message: 'Error on Receiving Information of User'});
    }
};

const newUser = async (req, res)=>{
    const { firstName, lastName, userName, passWord, address, age, position, startedDate} = req.body;
    
    try{    
        const existUser = await User.findOne({userName});
        if(existUser){
            return res.status(400).json({message: 'User already exits'});
        }

        const newUser = new User({firstName, lastName, userName, passWord, address, age, position, startedDate});    
        await newUser.save();

        res.status(201).json({message: 'User was created successfully'});
    }catch(error){
        console.error(error);
        res.status(500).json({message: 'Error on Saving Information of User'});
    }
};

const updateUser = async (req, res)=> {
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
            if (startedDate) update.startedDate = startedDate;
        
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
};

const deleteUser = async (req, res)=> {
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
};

//TODO:Separate the sending of feedback

const sendFeedback = async(req, res)=> {
    if (!req.user)
        return res.status(403).json({ message: 'User not authenticated.' });

    const{feedBack} = req.body;
    
    console.log('Received feedback:', req.body);

    try{
        const user = req.user;
        const newFeedBack = new userFeedback({userName: user.userName, feedBack});
        await newFeedBack.save();
        res.status(201).json({message: 'Feedback was created successfully'});    
    }catch(error){
        console.error(error);
        res.status(404).json({message: 'Error on Saving Feedback of User'});
    }
}

const userControllers = {
    loginUser,
    logoutUser,
    findUser,
    findUsers,
    newUser,
    updateUser,
    deleteUser,
    sendFeedback,
}

export default userControllers;