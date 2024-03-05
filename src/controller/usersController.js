const { v4: uuidv4 } = require("uuid");
const {
    getUsersModel,
    getUsersByIdModel,
    getUsersDetailModel,
    getUsersDetaiCountlModel,
    createUsersModel,
    updateUsersModel,
    deleteUserModel,
} = require("../model/usersModel");

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
                .json({ message: `failed GetRecipe, in controller` });
        }
    },
    getUsersById: async (req, res, next) => {
        try {
            let { id } = req.params;
            if (id === "") {
                return res.status(404).json({ message: `params id invalid` });
            }
            let users = await getUsersByIdModel(id);
            console.log("users controller");
            let result = users.rows;
            if (!result.length) {
                return res
                    .status(404)
                    .json({ message: `user not found or id ivalid` });
            }
            console.log(result);
            return res.status(200).json({
                message: `success get user by id controller`,
                data: result[0],
            });
        } catch (err) {
            console.log(err);
            return res
                .status(404)
                .json({ message: `failed get user by id, in controller` });
        }
    },
    getUsersDetail: async (req, res, next) => {
        try {
            // check searchBy
            let searchBy;
            if (req.query.searchBy === "") {
                if (
                    req.query.searchBy === "first_name" ||
                    req.query.searchBy === "last_name"
                ) {
                    searchBy = req.query.searchBy;
                } else {
                    searchBy = "first_name";
                }
            } else {
                searchBy = "first_name";
            }

            // check sortBy
            let sortBy;
            if (req.query.sortBy === "") {
                if (
                    req.query.sortBy === "created_at" ||
                    req.query.sortBy === "updated_at"
                ) {
                    sortBy = req.query.sortBy;
                } else {
                    sortBy = "created_at";
                }
            } else {
                sortBy = "created_at";
            }

            // check sort
            let sort;
            if (req.query.sort === "") {
                if (req.query.sort === "ASC" || req.query.sort === "DESC") {
                    sort = req.query.sort;
                } else {
                    sort = "ASC";
                }
            } else {
                sort = "ASC";
            }

            let search = req.query.search || "";
            let limit = req.query.limit || 3;
            let offset = ((req.query.page || 1) - 1) * parseInt(limit);

            let data = { searchBy, search, sortBy, sort, limit, offset };

            let users = await getUsersDetailModel(data);
            let count = await getUsersDetaiCountlModel(data);
            let total = count.rowCount;
            let result = users.rows;
            let page_next;
            if (req.query.page == Math.round(total / parseInt(limit))) {
                page_next = 0;
            } else {
                page_next = parseInt(req.query.page) + 1;
            }
            let pagination = {
                page_total: Math.round(total / parseInt(limit)),
                page_prev: parseInt(req.query.page) + 1,
                page_next,
                total_data: total,
            };

            return res.status(200).json({
                message: `success get users detail`,
                data: result,
                pagination,
            });
        } catch (err) {
            console.log("get users detail error");
            console.log(err);
            return res
                .status(404)
                .json({ message: "failed get users detail Controller" });
        }
    },
    createUsers: async (req, res, next) => {
        try {
            let { first_name, last_name, age, address } = req.body;
            if (
                !first_name ||
                first_name === "" ||
                !last_name ||
                last_name === "" ||
                !age ||
                age === "" ||
                !address ||
                address === ""
            ) {
                return res.json({ code: 404, message: "input invalid" });
            }
            let data = {
                id: uuidv4(),
                first_name,
                last_name,
                age,
                address,
            };
            let result = await createUsersModel(data);
            if (result.rowCount === 1) {
                return res
                    .status(201)
                    .json({ code: 201, message: "success input data" });
            }
            return res
                .status(401)
                .json({ code: 401, message: `failed input data` });
        } catch (err) {
            console.log(err);
            return res
                .status(404)
                .json({ message: `failed create user in controller` });
        }
    },
    updateUsers: async (req, res, next) => {
        try {
            // check param & body
            let { id } = req.params;
            if (id === "") {
                return res.status(404).json({ message: `params invalid` });
            }
            let { first_name, last_name, age, address } = req.body;

            // check users
            let users = await getUsersByIdModel(id);
            let resultUsers = users.rows;
            if (!resultUsers.length) {
                return res
                    .status(404)
                    .json({ message: `users not found or id invalid` });
            }
            let newUsers = resultUsers[0];
            let data = {
                id,
                first_name: first_name || newUsers.first_name,
                last_name: last_name || newUsers.last_name,
                age: age || newUsers.age,
                address: address || newUsers.address,
            };
            let result = await updateUsersModel(data);
            if (result.rowCount === 1) {
                return res
                    .status(201)
                    .json({ code: 201, message: "success update data" });
            }
            return res
                .status(401)
                .json({ code: 401, message: "failed update data" });
        } catch (err) {
            console.log(err);
            return res
                .status(404)
                .json({ message: `failed update user in controller` });
        }
    },
    deleteUsers: async (req, res, next) => {
        try {
            let id = req.params.id;
            let users = await deleteUserModel(id);
            let dataUsers = users.rows;
            if (!dataUsers) {
                return res
                    .status(404)
                    .json({ message: `user by id not found or id ivalid` });
            }
            console.log(dataUsers);
            return res
                .status(200)
                .json({ message: `delete user by id with ${id} success` });
        } catch (err) {
            console.log(err);
            return res
                .status(404)
                .json({ message: `delete user by id failed, in controller` });
        }
    },
};

module.exports = UsersController;
