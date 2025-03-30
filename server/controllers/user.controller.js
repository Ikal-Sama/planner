import User from '../models/user-model.js'
import {generateToken} from '../utils/generateToken.js'
import bcrypt from 'bcryptjs'


export const checkAuth = async(req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log("Error in checkAuth controller:", error.message);
        res.status(500).json({message: "Internal Server Error"});
    }
}


export const loginUser = async(req, res) => {
    try {
        const {email, password} = req.body
        if(!email || !password) {
            return res.status(400).json({message: 'Please provide email and password'})
        }
        const user = await User.findOne({
            email: email,
        })
        if(!user) {
            return res.status(404).json({message: 'Invalid email or password'})
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) {
            return res.status(404).json({message: 'Invalid email or password'})
        }

        generateToken(user._id, res)
       
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isActive: user.isActive
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Server Error in Login'})
    }
}

export const registerUser = async(req, res) => {
    try {
        const {name, email, password} = req.body
        if(!name || !email || !password) {
            return res.status(400).json({message: 'Please provide name, email, and password'})
        }

        const existingUser = await User.findOne({email})
        if(existingUser) {
            return res.status(409).json({message: 'Email already in use'})
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new User({
            name, 
            email, 
            password: hashedPassword
        })

        await newUser.save()
        res.status(201).json({message: 'User registered successfully'})
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Server Error in Registration'})
    }
}


export const logout = async(req, res, next) => {
    res.clearCookie("access_token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
    }).status(200).json({message: "Logged out successfully"});
}



