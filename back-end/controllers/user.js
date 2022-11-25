import User from "../models/userModel.js";
import asynchandler from 'express-async-handler';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register = asynchandler(async(req, res) => {

    const {name, email, password} = req.body;

    if (!name || ! email || !password){
        res.status(400)
        throw new Error('Fill all fields')
    }

    const userExist = await User.findOne({email})

    if (userExist){
        res.status(400)
        throw new Error('User already exist')
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: hash
    });

    if (user){
        res.status(201).json({
            _id : user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid input')
    }
});

export const login = asynchandler(async(req, res) => {

    const {email, password} = req.body;

    const user = await User.findOne({email})

    if (user && (await bcrypt.compare(password, user.password))){
        res.status(201).json({
            _id : user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid Credatials')
    }
});

export const profile = asynchandler(async(req, res) => {

    res.status(200).json(req.user)
});

const generateToken = (id) => {

    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '15d',
    })
}