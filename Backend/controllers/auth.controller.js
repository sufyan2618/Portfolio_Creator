import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/user.model';



export const Signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        if (password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters long' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({ name, email, password: hashedPassword });
        await user.save();
        const token = generateToken(user._id)
        res.cookie('token', token, {
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            httpOnly: true,
            secure: false,
            sameSite: 'Strict',
        });
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ message: `error creating user: ${error.message}` });
    }

}

export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }
        const token = generateToken(user._id)
        res.cookie('token', token, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: false,
            sameSite: 'Strict',
        });
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
        });


    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: `error logging in: ${error.message}` });

    }
}

export const Logout = async (req, res) => {
    try {
        res.clearCookie('token');
        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({ message: `error logging out: ${error.message}` });
    }
}

export const Check_Auth = async (req, res) => {
    try {
        res.status(200).json(req.user);

    } catch (error) {
        console.error('Check_Auth error:', error);
        res.status(500).json("Internal Server Error")
    }
}