const express = require("express");
const RecipesController = require("../controller/recipes");
const router = express.Router();

router.get("/", RecipesController.getRecipe);
router.get("/detail", RecipesController.getRecipeDetail);
router.get("/:id", RecipesController.getRecipeById);
router.post("/", RecipesController.InputRecipe);
router.put("/:id", RecipesController.PutRecipe);
router.delete("/:id", RecipesController.deleteRecipe);

module.exports = router;
