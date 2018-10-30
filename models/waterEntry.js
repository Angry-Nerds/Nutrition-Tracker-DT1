const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const waterEntrySchema = new Schema({
  glassesOfWater: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

const WaterEntry = mongoose.model("WaterEntry", waterEntrySchema);

module.exports = WaterEntry;
