import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from '../models/User.js';

const router = express.Router();

//Creating a new User
router.post('/register', async(req, res) => {
    try{
        const {email, password} = req.body;

        //Create user in DB
        await User.create({email, password});

        res.status(201).json({ message: 'User created successfully' });

    } catch(e){
        res.status(400).json({ error: e.message });
    }
});

//Existing User Logging In
router.post('/login', async(req, res) => {
    console.log('LOGIN ROUTE WAS HIT! Body:', req.body);
    try{

        const {email, password} = req.body;

        //Find User from DB
        const user = await User.findOne({email});
        if (!user) return res.status(401).json({ error: 'Invalied email or password' });

        //Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

        const token = jwt.sign(
            {id: user._id},
            process.env.JWT_SECRET,
            {expiresIn: '1h'}
        );

        res.json({token});

    } catch(e){
        res.status(500).json({ error: e.message });
    }
});

export default router;