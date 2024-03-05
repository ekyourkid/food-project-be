const express = require("express");
const router = express.Router();
const recipes = require("./recipes");
const users = require("./usersRouter");
const kategori = require("./kategori");

router.use("/recipes", recipes);
router.use("/users", users);
router.use("/kategori", kategori);

module.exports = router;
