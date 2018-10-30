const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  height: { type: Number },
  initialWeight: { type: Number },
  foodEntries: [ { 
    type: Schema.Types.ObjectId, 
    ref: "FoodEntry" } ],
  waterEntries: [ { 
    type: Schema.Types.ObjectId, 
    ref: "WaterEntry" } ],
  weightEntries: [ { 
    type: Schema.Types.ObjectId, 
    ref: "WeightEntry" } ],
  joinDate: { type: Date, default: Date.now }
});

const User = mongoose.model("User", userSchema);

module.exports = User;