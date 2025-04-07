const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  educationLevel: String,
  expert: String,
  sessionDate: String,
  sessionTime: String,
});

module.exports = mongoose.model("Booking", BookingSchema);