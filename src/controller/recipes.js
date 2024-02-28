const { getRecipesModel } = require("../model/recipes");

const RecipesController = {
    getRecipe: async (req, res, next) => {
        try {
            let recipes = await getRecipesModel();
            console.log("recipes controller");
            let result = recipes.rows;
            return res.status(200).json({
                message: `success getRecipe controller`,
                data: result,
            });
        } catch (err) {
            console.log(`recipe controller error`);
            console.log(err);
            return res
                .status(404)
                .json({ message: `failed GetRecipe controller` });
        }
    },
};

module.exports = RecipesController;
