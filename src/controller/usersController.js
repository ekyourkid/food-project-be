const { getUsersModel } = require("../model/usersModel");

const UsersController = {
    getUsers: async (req, res, next) => {
        try {
            let users = await getUsersModel();
            console.log("users controller");
            let result = users.rows;
            return res.status(200).json({
                message: `success getUser controller`,
                data: result,
            });
        } catch (err) {
            console.log(`users controller error`);
            console.log(err);
            return res
                .status(404)
                .json({ message: `failed GetRecipe controller` });
        }
    },
};

module.exports = UsersController;
