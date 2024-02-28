const express = require("express");
const router = express.Router();
const recipes = require("./recipes");
const users = require("./usersRouter");

router.use("/recipes", recipes);
router.use("/users", users);

module.exports = router;
