const express = require("express");
const RecipesController = require("../controller/recipes");
const router = express.Router();

router.get("/", RecipesController.getRecipe);

module.exports = router;
