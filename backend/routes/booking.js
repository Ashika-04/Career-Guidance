// routes/bookings.js
const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

// Create a booking
router.post('/', async (req, res) => {
    try {
        const { name, phone, email, stream, expertName, sessionDate, sessionTime } = req.body;

        const newBooking = new Booking({
            name,
            phone,
            email,
            stream,
            expertName,
            sessionDate,
            sessionTime
        });

        await newBooking.save();
        res.status(201).json({ message: 'Booking successful' }); // Success response
    } catch (error) {
        console.error('Error creating booking:', error);
        res.status(500).json({ message: 'Error creating booking' }); // Error response
    }
});

module.exports = router;
