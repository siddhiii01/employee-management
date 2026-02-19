import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from '../models/User.js';
import { validate } from '../middleware/validate.js';
import { loginSchema } from '../validations/schema.js';
const router = express.Router();



//Existing User Logging In
router.post('/login', validate(loginSchema), async(req, res) => {
    try{

        const {email, password} = req.validatedData;

        //Find User from DB
        const user = await User.findOne({email});
        if (!user) return res.status(401).json({ error: 'Invalied email or password' });

        //Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

        const token = jwt.sign(
            {id: user._id},
            process.env.JWT_SECRET,
            {expiresIn: '24h'}
        );

        res.json({token});

    } catch(e){
        res.status(500).json({ error: e.message });
    }
});

export default router;