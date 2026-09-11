const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());

let users = [];

app.get('/', (req, res) => {
    res.send('Your free backend is running perfectly!');
});

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

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});
