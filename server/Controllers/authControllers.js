import User from '../Models/User.js'
import userFeedback from '../Models/userFeedback.js'
import Item from '../Models/Item.js'
import dotenv from 'dotenv'
import fs from 'fs' 
import { format } from 'date-fns'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import path from 'path'
import multer from 'multer'
import { fileURLToPath } from 'url'

dotenv.config();

const fileSystem = fs;
const logsDirPath = './Logs';
const adminLogsFilePath = './Logs/admin_logs.txt';
const userLogsFilePath = './Logs/user_logs.txt';
const envFilePath = './.env';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.join(__dirname, '..', 'uploads');

if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); 
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); 
    },
});
  
const upload = multer({ storage });

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

const adminlogActivity = (status, userName)=> {
    const now = Date();
    const formattedDate = format(now, 'HH:mm a MM/dd/yyyy');
    const logEntry = `Date: ${formattedDate}\t Status: ${status} \tUser: ${userName} \t\t\n`;

    if(!fileSystem.existsSync(logsDirPath)){
        fileSystem.mkdirSync(logsDirPath);
        console.log("Logs Directory was been created");
    }

    if(!fileSystem.existsSync(adminLogsFilePath)){
        fileSystem.writeFileSync(adminLogsFilePath, logEntry);
        console.log("Admin Logs was been created");
    }else{
        fileSystem.appendFileSync(adminLogsFilePath, logEntry);
        console.log("Admin Logs was been updated");
    }
};

const userlogActivity = (status, userName)=> {
    const now = Date();
    const formattedDate = format(now, 'HH:mm a MM/dd/yyyy');
    const logEntry = `Date: ${formattedDate}\t Status: ${status} \tUser: ${userName} \t\t\n`;

    if(!fileSystem.existsSync(logsDirPath)){
        fileSystem.mkdirSync(logsDirPath);
        console.log("Logs Directory was been created");
    }

    if(!fileSystem.existsSync(userLogsFilePath)){
        fileSystem.writeFileSync(userLogsFilePath, logEntry);
        console.log("User Logs was been created");
    }else{
        fileSystem.appendFileSync(userLogsFilePath, logEntry);
        console.log("User Logs was been updated");
    }
};

const loginUser = async (req, res)=> {
    const { userName, passWord } = req.body;

    try{
        const user = await User.findOne({ userName });

        if(!user || user.passWord !== passWord){
            return res.status(400).json({message: 'Invalid username or password'});
        }

        let secretKey = process.env.TOKEN;
        
        if (!secretKey) {
            secretKey = generatedKey();
            updatedToken(secretKey);
        }
        
        const role = user.role;
        const token = jwt.sign({userName: user.userName, role}, secretKey, {expiresIn: '24h'});
        console.log('Generated token:', token);
            
        if(role === 'admin'){
            adminlogActivity('Log-in', userName);
        }else if(role === 'user'){
            userlogActivity('Log-in', userName);
        }else{
            res.status(404).json({message: 'User was not found'});
        }

        res.json({message: 'Login Successful', userName, token, role});
    }catch(error){
        console.error(error);
        res.status(500).json({message: 'Server Error'});
    }
};

const logoutUser = async (req, res)=> {
    const { userName } = req.body;

    try{
        const user = await User.findOne({userName});

        if(user){
            if(user.role === 'admin'){
                adminlogActivity('Log-out', userName);
            }
            else if(user.role === 'user'){
                userlogActivity('Log-out', userName);
            }
            else{
                res.status(404).json({message: 'User was not found'});
            }
        }else{
            res.status(404).json({message: 'User was not found'});
        }

        const newToken = generatedKey();
        updatedToken(newToken);

        res.json({message: 'Logout', newToken});
    }catch(error){
        console.error(error);
        res.status(500).json({message: 'Server Error'});
    }
};

//Admin Control

const newUser = async (req, res)=>{
    const { firstName, lastName, userName, passWord, address, age, position, startedDate } = req.body;
    
    try{    
        const existUser = await User.findOne({userName});
        if(existUser){
            return res.status(400).json({message: 'User already exist'});
        }      

        const newUser = new User({firstName, lastName, userName, passWord, address, age, position, startedDate});    
        await newUser.save();

        res.status(201).json({message: 'User was created successfully'});
    }catch(error){
        console.error(error);
        res.status(500).json({message: 'Error on Saving Information of User'});
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

const updateUser = async (req, res)=> {
    const {firstName, lastName, userName, passWord, address, age, position, startedDate} = req.body;

    if (!userName) {
        return res.status(400).json({ message: 'Username is required' });
    }

    try{
        const query = { userName };

        const user = await User.findOne(query);

        if(user){
            if (!user)
                return res.status(404).json({message: 'User was not found'});

            if(user.role === 'admin')
                return res.status(403).json({message: 'Cannot update an admin user'});

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
                if(result.modifiedCount > 0){
                    res.status(200).json({message: 'User updated successfully'});
                }else{
                    res.status(200).json({message: 'User exists but no changes were made'});
                }
            }else{
                res.status(404).json({message: 'User was not found'});
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

        const user = await User.findOne(query);

        if(user){
            if(user.role === 'admin')
                return res.status(403).json({message: 'Cannot delete an admin user'})

            const result = await User.deleteOne(query);

            if(result.deletedCount > 0){
                res.status(200).json({message: 'User deleted successfully'});
            }else{
                res.status(404).json({message: 'User was not found'});
            }
        }else{
            return res.status(404).json({message: 'User was not found'});
        }
    }catch(error){
        console.error(error);
        res.status(404).json({message: 'Error on Deleting Information of User'});
    }
};

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

//Item Control

const newItem = async(req, res)=> {
    const { numberOfitems, itemName, startedDate, expirationDate, itemPrice, itemDiscount } = req.body;

    try{
        const itemPicture = req.file ? `/uploads/${req.file.filename}` : null;

        const existItem = await Item.findOne({itemName: itemName});
        if(existItem){
            return res.status(400).json({message: 'Item already exist'});
        }

        const newItem = new Item({numberOfitems, itemPicture, itemName, startedDate, expirationDate, itemPrice, itemDiscount});
        await newItem.save();

        res.status(201).json({message: 'Item was created successfully'});
    }catch(error){
        console.error(error);
        res.status(500).json({message: 'Error on Saving Information of Item'})
    }
}

const findItem = async(req, res)=> {
    try{
        const itemName = req.query;

        const result = await Item.findOne(itemName);

        if(result){
            res.status(200).json(result);
        }else{
            return res.status(404).json({message: 'Item was not found'});
        }
    }catch(error){
        console.error(error);
        res.status(404).json({message: 'Error on Receiving Information of Item'});
    }
}

const findItems = async(req, res)=> {
    try{
        const result = await Item.find();

        if(result.length > 0){
            return res.status(200).json(result);
        }else
            return res.status(404).json({message: 'Item was not found'});
    }catch(error){
        console.error(error);
        res.status(404).json({message: 'Error on Receiving Information of Item'});
    }
}

const updateItem = async (req, res) => {
    const { numberOfitems, itemName, startedDate, expirationDate, itemPrice, itemDiscount } = req.body;

    if (!itemName) {
        return res.status(400).json({ message: 'Item name is required' });
    }

    try {
        const query = { itemName };

        let itemPicture = null;

        const item = await Item.findOne(query);

        if (item) {
            if (req.file) {
                itemPicture = `/uploads/${req.file.filename}`;
            } else {
                itemPicture = item.itemPicture; 
            }

            const update = {};
            if (numberOfitems) update.numberOfitems = numberOfitems;
            if (itemPicture) update.itemPicture = itemPicture;
            if (itemName) update.itemName = itemName;
            if (startedDate) update.startedDate = startedDate;
            if (expirationDate) update.expirationDate = expirationDate;
            if (itemPrice) update.itemPrice = itemPrice;
            if (itemDiscount) update.itemDiscount = itemDiscount;

            const result = await Item.updateOne(query, { $set: update });

            if (result.matchedCount > 0) {
                if (result.modifiedCount > 0) {
                    res.status(200).json({ message: 'Item updated successfully' });
                } else {
                    res.status(200).json({ message: 'Item exists but no changes were made' });
                }
            } else {
                res.status(404).json({ message: 'Item not found' });
            }
        } else {
            res.status(404).json({ message: 'Item not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
}

const deleteItem = async(req, res)=> {
    const { itemName } = req.body;

    try{
        const result = await Item.deleteOne({ itemName });

        if(result.deletedCount > 0){
            res.status(200).json({message: 'Item deleted successfully'});
        }else{
            res.status(404).json({message: 'Item was not found'});
        }
    }catch(error){
        console.error(error);
        res.status(404).json({message: 'Error on Deleting Information of User'});
    }
}

const authControllers = {
    loginUser,
    logoutUser,
    newUser,
    findUser,
    findUsers,
    updateUser,
    deleteUser,
    newItem,
    findItem,
    findItems,
    updateItem,
    deleteItem,
    sendFeedback,
}

export default authControllers;