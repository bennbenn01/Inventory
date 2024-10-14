import jwt from 'jsonwebtoken'
import path from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const restrict = async (req, res, next)=> {
    const token = req.headers['authorization']?.split(' ')[1];

    if(!token){
        return res.sendFile(path.join(__dirname, '..' ,'Views', '403.html'));
    }
    
    jwt.verify(token, process.env.TOKEN, (err, user)=> {
        if (err) {
            return res.status(400).json({ message: 'Invalid token provided. Please try again!' });
        }
        req.user = user;
        next();
    });
}

export default restrict;