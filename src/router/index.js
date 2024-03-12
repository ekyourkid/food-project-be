const express = require("express");
const router = express.Router();
const recipes = require("./recipes");
const users = require("./usersRouter");
const category = require("./category");

router.use("/recipes", recipes);
router.use("/users", users);
router.use("/category", category);

module.exports = router;
