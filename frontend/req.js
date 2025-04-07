// Required Packages
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Initialize App
const app = express();
app.use(cors());
app.use(express.json()); // Built-in body parser

// Secret Key for JWT
const SECRET_KEY = "your_secret_key"; // Make this more secure for production

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/UIT-Testdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.log("❌ MongoDB Connection Error:", err));

// User Schema and Model
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobilenumber: { type: String, required: true }
});
const User = mongoose.model('User', UserSchema);

// Server Port
const PORT = process.env.PORT || 5001;

// Start Server
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

// Signup Route
app.post('/signup', async (req, res) => {
    try {
        const { username, password, email, mobilenumber } = req.body;

        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create User
        const newUser = new User({
            username,
            password: hashedPassword,
            email,
            mobilenumber
        });
        await newUser.save();

        res.json({ message: "Signup successful!", id: newUser._id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error signing up", error });
    }
});

// Sign-in Route
app.post('/signin', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find User by Username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        // Validate Password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid password" });
        }

        // Generate JWT Token
        const token = jwt.sign(
            { userId: user._id, username: user.username },
            SECRET_KEY,
            { expiresIn: '1h' }
        );

        res.json({ message: "Sign-in successful", token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error });
    }
});

// Generic Error Handler
app.use((err, req, res, next) => {
    console.error("Server Error:", err);
    res.status(500).send('Something broke!');
});
