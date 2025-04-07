const mongoose = require("mongoose");

const ExpertSchema = new mongoose.Schema({
  name: String,
  specialization: [String],
  level: String,
});

module.exports = mongoose.model("Expert", ExpertSchema);
