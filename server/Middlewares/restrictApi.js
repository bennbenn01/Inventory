import jwt from 'jsonwebtoken'

const restrict = async (req, res, next)=> {
    const token = req.headers['authorization']?.split(' ')[1];

    if(!token){
        return res.status(403).json({message: 'No token providied. Please try again!'});
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