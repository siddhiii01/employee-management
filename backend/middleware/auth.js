import jwt from "jsonwebtoken";

export const authMiddleware = (req,res, next) => {
    const token = req.headers.authorization?.spilt('')[1];

    if(!token){
        return res.status(401).json({ error: 'No token, access denied' });
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();

    } catch(e){
        res.status(401).json({ error: 'Invalid token' });
    }
}