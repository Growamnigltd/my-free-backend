const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

let users = [];

app.post('/api/signup', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }
    users.push({ email, password });
    console.log(`[EMAIL SENT]: Activation link fired to ${email}`);
    res.json({ message: 'Sign up successful! Link sent to your email.' });
});

app.post('/api/forgot-password', (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ message: 'Email is required.' });
    }
    console.log(`[SYSTEM LOG]: Password reset requested for ${email}. Skipping email transmission.`);
    res.json({ message: 'Password reset processed. No email sent per system rules.' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
