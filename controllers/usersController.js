const db = require("../models");
const moment = require("moment");
const bcrypt = require('bcrypt');

// Defining methods for the booksController
module.exports = {

  findById: function(req, res) {
    db.User
      .findById(req.params.id)
      .populate("foodEntries")
      .populate("waterEntries")
      .populate("weightEntries")
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findByEmail: function(req, res) {
    db.User
      .findOne({ email: req.body.email })
      .populate("foodEntries")
      .populate("waterEntries")
      .populate("weightEntries")
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  getSecret: function(req, res) {
      db.User
        .findOne({ email: "secret" })
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
  },
  findAndVerifyAccount: function(req, res) {
    //db.User.findOne({ email: req.body.email })
    db.User.findOne({email: req.body.email})
        .then(function(dbUser) {
        // If there's no user with the given email
        if (!dbUser) {
             res.json({
                 message: "Incorrect email."
            });
        }
        else {
            bcrypt.compare(req.body.password, dbUser.password).then(function(match) {
                if (match) {
                    res.json({
                        user: dbUser
                    });
                }
                else {
                    res.json({
                        message: "Incorrect password."
                    });
                }
            });
        }
    });
  },
  findOne: function(req, res) {
        db.User
          .findOne({ email: req.body.email })
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err));
      },
  create: function(req, res) {
    const saltRounds = 10;
    const plainTextPassword = req.body.password;
    bcrypt.hash(plainTextPassword, saltRounds).then(function(hash) {
          db.User
            .create({
                email: req.body.email,
                password: hash,
                height: req.body.height,
                initialWeight: req.body.initialWeight
            })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    });
    
  },
  saveWeight: function(req, res) {
      db.WeightEntry
        .create({
            weight: req.body.weight
        })
        .then(function(dbWeightEntry) {
            return db.User.findOneAndUpdate({_id: req.body.userId}, 
                { $push: { weightEntries: dbWeightEntry._id } }, { new: true });
          })
          .then(function(dbUser) {
            // If we were able to successfully update a User, send it back to the client
            res.json(dbUser);
          })
          .catch(err => res.status(422).json(err));
  },
  saveWaterEntry: function(req, res) {
    db.WaterEntry
      .create({
          glassesOfWater: req.body.glassesOfWater
      })
      .then(function(dbWaterEntry) {
          return db.User.findOneAndUpdate({_id: req.body.userId}, 
              { $push: { waterEntries: dbWaterEntry._id } }, { new: true });
        })
        .then(function(dbUser) {
          // If we were able to successfully update a User, send it back to the client
          res.json(dbUser);
        })
        .catch(err => res.status(422).json(err));
  },
  saveFoodEntry: function(req, res) {
    db.FoodEntry
      .create({
        foodItem: req.body.foodItem,
        itemNumber: req.body.itemNumber,
        energy: req.body.energy,
        protein: req.body.protein,
        fat: req.body.fat,
        carbs: req.body.carbs,
        fiber: req.body.fiber,
        sugar: req.body.sugar
      })
      .then(function(dbFoodEntry) {
          return db.User.findOneAndUpdate({_id: req.body.userId}, 
              { $push: { foodEntries: dbFoodEntry._id } }, { new: true });
        })
        .then(function(dbUser) {
          // If we were able to successfully update a User, send it back to the client
          res.json(dbUser);
        })
        .catch(err => res.status(422).json(err));
  },
  getWeightEntries: function(req, res) {
    db.User.findById(req.params.id)
    // ..and populate all of the weight entries associated with it
        .populate("weightEntries")
        .then(dbUser => res.json(dbUser))
        .catch(err => res.status(422).json(err));
    },
    getWaterEntries: function(req, res) {
    db.User.findById(req.params.id)
    // ..and populate all of the water entries associated with it
        .populate("waterEntries")
        .then(dbUser => res.json(dbUser))
        .catch(err => res.status(422).json(err));
    },
    getFoodEntries: function(req, res) {
        db.User.findById(req.params.id)
        // ..and populate all of the food entries associated with it
            .populate("foodEntries")
            .then(dbUser => res.json(dbUser))
            .catch(err => res.status(422).json(err));
    },
    deleteFoodEntry: function(req, res) {
        db.FoodEntry.remove(
            {
              _id: req.params.id
            },
            function(error, removed) {
              // Log any errors from mongojs
              if (error) {
                //console.log(error);
                res.send(error);
              }
              else {
                // Otherwise, send the mongojs response to the browser
                // This will fire off the success function of the ajax request
                //console.log(removed);
                res.send(removed);
              }
            }
          );
    },
    deleteWaterEntry: function(req, res) {
        db.WaterEntry.remove(
            {
              _id: req.params.id
            },
            function(error, removed) {
              if (error) {
                res.send(error);
              }
              else {
                res.send(removed);
              }
            }
          );
    },
    deleteWeightEntry: function(req, res) {
        db.WeightEntry.remove(
            {
              _id: req.params.id
            },
            function(error, removed) {
              if (error) {
                res.send(error);
              }
              else {
                res.send(removed);
              }
            }
          );
    }
};