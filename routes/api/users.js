const router = require("express").Router();
const usersController = require("../../controllers/usersController");
const axios = require("axios");


// Matches with "/api/users/login"
router.route("/login")
  .post(usersController.findAndVerifyAccount);

// Matches with "/api/users/signup"
router.route("/signup")
  .post(usersController.create)
  .get(usersController.findByEmail);

// Matches with "/api/users/:id"
router.route("/:id")
  .get(usersController.findById);

// Matches with "/api/users/food"
router.route("/food")
  .post(usersController.saveFoodEntry)

router.route("/food/secret")
  .get(usersController.getSecret);

router.route("/food/cals/:id")
  .get(usersController.getFoodEntries);

// Matches with "/api/users/water"
router.route("/water")
  .post(usersController.saveWaterEntry);

// Matches with "/api/users/weight"
router.route("/weight")
  .post(usersController.saveWeight);

router.route("/food/history/:id")
  .get(usersController.getFoodEntries)
  .delete(usersController.deleteFoodEntry);

router.route("/water/history/:id")
  .get(usersController.getWaterEntries)
  .delete(usersController.deleteWaterEntry);

router.route("/weight/history/:id")
  .get(usersController.getWeightEntries)
  .delete(usersController.deleteWeightEntry);

module.exports = router;