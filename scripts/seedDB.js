const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/nutritiontrackerdb"
);

const userSeed = [
  {
    email: "sarah@gmail.com",
    password: "abc123",
    height: 55,
    initialWeight: 150,
    joinDate: new Date(Date.now())
  },
  {
    email: "sam@gmail.com",
    password: "abc456",
    height: 59,
    initialWeight: 160,
    joinDate: new Date(Date.now())
  }
];

db.User
  .remove({})
  .then(() => db.User.collection.insertMany(userSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

  db.WeightEntry.create({"weight": 140})
    .then(function(dbWeight) {
      return db.User.findOneAndUpdate({_id: "5bcfebb86af5c94418549851"}, { $push: { weightEntries: dbWeight._id } }, { new: true });
    })
    .then(data => {
      console.log(data.result.n + " records inserted!");
      process.exit(0);
    })
    .catch(err => {
      console.error(err);
      process.exit(1);
    });