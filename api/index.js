const express = require('express');
const cors = require('cors');
const path = require('path');
const { Resend } = require('resend');

const app = express();
const PORT = process.env.PORT || 10000;

// Remember to replace this with your actual Resend API Key if it gets overwritten!
const resend = new Resend('re_YOUR_COPIED_API_KEY_HERE');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

let users = [];

// 1. SIGN UP (Customized Email text)
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
            subject: '🚀 Welcome! Activate Your New Account',
            html: `
                <div style="font-family: sans-serif; padding: 20px; color: #333;">
                    <h2>Welcome to Our Platform! 🎉</h2>
                    <p>Thank you for signing up. We are thrilled to have you on board.</p>
                    <p>Please click the button below to verify your email address and activate your account:</p>
                    <a href="https://vercel.app" style="background-color: #0070f3; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 15px 0;">Verify Email Address</a>
                    <p style="color: #666; font-size: 12px;">If you did not create this account, you can safely ignore this email.</p>
                </div>
            `
        });
        res.json({ message: 'Sign up successful! Check your email for the activation link.' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to send signup email.' });
    }
});

// 2. FORGOT PASSWORD (Customized Email text)
app.post('/api/forgot-password', async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ message: 'Email is required.' });
    }

    try {
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: '🔒 Reset Your Password Request',
            html: `
                <div style="font-family: sans-serif; padding: 20px; color: #333;">
                    <h2>Password Reset Request</h2>
                    <p>We received a request to reset the password for your account.</p>
                    <p>Click the secure link below to choose a brand-new password:</p>
                    <a href="https://vercel.app" style="background-color: #ff0000; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 15px 0;">Reset Password</a>
                    <p>This link will expire shortly for security reasons.</p>
                    <p style="color: #666; font-size: 12px;">If you did not request a password reset, please ignore this email or contact support if you have questions.</p>
                </div>
            `
        });
        res.json({ message: 'Password reset link sent! Please check your email inbox.' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to send password reset email.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
