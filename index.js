const express = require('express');
const cors = require('cors');
const path = require('path');
const { Resend } = require('resend');

const app = express();
const PORT = process.env.PORT || 10000;

// PASTE YOUR RESEND API KEY INSIDE THESE QUOTES:
const resend = new Resend('re_YOUR_COPIED_API_KEY_HERE');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

let users = [];

// 1. SIGN UP (Sends real email)
app.post('/api/signup', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }
    
    users.push({ email, password });

    try {
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'Activate Your Account',
            html: '<p>Welcome! Click <a href="https://vercel.app">here</a> to activate your account.</p>'
        });
        res.json({ message: 'Sign up successful! Check your email for the activation link.' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to send signup email.' });
    }
});

// 2. FORGOT PASSWORD (Now sends a real password reset link!)
app.post('/api/forgot-password', async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ message: 'Email is required.' });
    }

    try {
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'Reset Your Password',
            html: '<p>You requested a password reset. Click <a href="https://vercel.app">here</a> to set a new password.</p>'
        });
        res.json({ message: 'Password reset link sent! Please check your email inbox.' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to send password reset email.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
