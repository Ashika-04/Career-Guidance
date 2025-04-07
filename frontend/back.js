const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public")); // Serve HTML files

mongoose
  .connect("mongodb://127.0.0.1:27017/authDB", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const User = require("./models/User");

// Signup Route
app.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });

    await newUser.save();
    res.json({ message: "User registered successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error in signup" });
  }
});

// Signin Route
app.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    res.json({ message: "Login successful", redirect: "/index.html" });
  } catch (error) {
    res.status(500).json({ message: "Error in signin" });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
