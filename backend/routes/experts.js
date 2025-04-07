// routes/experts.js
const express = require('express');
const router = express.Router();
const Expert = require('../models/Expert');

// Fetch experts by stream
router.get('/', async (req, res) => {
    try {
        const level = req.query.level;
        const experts = await Expert.find({ level: level });
        res.json(experts);
    } catch (error) {
        console.error('Error fetching experts:', error);
        res.status(500).json({ message: 'Error fetching experts' });
    }
});

module.exports = router;
