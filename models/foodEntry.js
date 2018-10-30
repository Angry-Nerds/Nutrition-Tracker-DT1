const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const foodEntrySchema = new Schema({
  foodItem: { type: String, required: true },
  itemNumber: Number,
  energy: Number,
  protein: Number,
  fat: Number,
  carbs: Number,
  fiber: Number,
  sugar: Number,
  date: { type: Date, default: Date.now }
});

const FoodEntry = mongoose.model("FoodEntry", foodEntrySchema);

module.exports = FoodEntry;