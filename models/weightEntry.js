const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const weightEntrySchema = new Schema({
  weight: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

const WeightEntry = mongoose.model("WeightEntry", weightEntrySchema);

module.exports = WeightEntry;