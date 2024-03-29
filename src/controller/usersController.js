const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
    getUsersModel,
    getUsersByIdModel,
    getUsersDetailModel,
    getUsersDetaiCountlModel,
    registerUsersModel,
    updateUsersModel,
    deleteUserModel,
    loginUserModel,
    activatedUsers,
} = require("../model/usersModel");
const cloudinary = require("../config/photo");
const { sendEmailActivated } = require("../helpers/email");

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
            let result = users.rows;
            if (!result.length) {
                return res
                    .status(404)
                    .json({ message: `user not found or id ivalid` });
            }
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
                    req.query.searchBy === "username" ||
                    req.query.searchBy === "email"
                ) {
                    searchBy = req.query.searchBy;
                } else {
                    searchBy = "username";
                }
            } else {
                searchBy = "username";
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
    registerUsers: async (req, res, next) => {
        try {
            let { username, email, password, address, photo_profile } =
                req.body;
            let hashedPassword = await bcrypt.hash(password, 10);
            if (
                !username ||
                username === "" ||
                !email ||
                email === "" ||
                !password ||
                password === "" ||
                !address ||
                address === ""
            ) {
                return res.json({ code: 404, message: "input invalid" });
            }

            console.log("photo profile");
            console.log(req.file);
            if (!req.file) {
                return res.json({
                    code: 404,
                    message: "photo required",
                });
            }

            if (!req.isFileValid) {
                return res.json({
                    code: 404,
                    message: req.isFileValidMessage,
                });
            }

            const imageUpload = await cloudinary.uploader.upload(
                req.file.path,
                {
                    folder: "photo profile",
                }
            );
            console.log("cloudinary");
            console.log(imageUpload);

            if (!imageUpload) {
                return res.json({ code: 404, message: "Upload photo failed" });
            }

            let id = uuidv4();
            let otp = uuidv4();
            let data = {
                id,
                username,
                email,
                password: hashedPassword,
                address,
                photo_profile: imageUpload.secure_url,
                otp,
            };

            let url = `http://localhost:3000/users/activated/${id}/${otp}`;

            let sendOTP = await sendEmailActivated(email, url, username);

            if (!sendOTP) {
                return res.status(401).json({
                    code: 401,
                    message: "register failed when send email",
                });
            }

            let result = await registerUsersModel(data);
            if (result.rowCount === 1) {
                return res.status(201).json({
                    code: 201,
                    message:
                        "register success please check your email for activated account",
                });
            }
            return res
                .status(401)
                .json({ code: 401, message: `failed input data` });
        } catch (err) {
            console.log(err);
            return res
                .status(404)
                .json({ message: `failed regist user in controller` });
        }
    },
    loginUsers: async (req, res, next) => {
        try {
            let { email, password } = req.body;
            if (email === "" || email !== email) {
                return res.status(404).json({ message: "email is required" });
            }
            let userData = await loginUserModel(email);
            let result = userData.rows;

            if (!result.length) {
                return res.status(404).json({ message: `user not found` });
            }

            if (userData && userData.is_verif === false) {
                return res.status(401).json({
                    status: 401,
                    message:
                        "email not verified, please check your email to activated",
                });
            }

            const userDataFromDB = result[0];
            if (!userDataFromDB.password) {
                return res.status(404).json({ message: `password not set` });
            }

            let isPasswordValid = await bcrypt.compare(
                password,
                userDataFromDB.password
            );

            if (isPasswordValid) {
                const token = jwt.sign(
                    {
                        id: userDataFromDB.id,
                        username: userDataFromDB.username,
                        address: userDataFromDB.address,
                    },
                    process.env.JWT_SECRET,
                    { expiresIn: "1d" }
                );
                return res.status(201).json({
                    status: 201,
                    message: "login success",
                    access_token: token,
                });
            } else {
                return res.status(403).json({ message: "Wrong Password" });
            }
        } catch (err) {
            console.log(err);
            return res
                .status(404)
                .json({ message: `failed login user in controller` });
        }
    },

    verification: async (req, res, next) => {
        let { id, otp } = req.params;

        let user = await getUsersByIdModel(id);
        if (user.rowCount === 0) {
            return res
                .status(404)
                .json({ status: 404, message: "email not register" });
        }
        let userData = user.rows[0];

        if (otp !== userData.otp) {
            return res
                .status(404)
                .json({ status: 404, message: "otp invalid" });
        }

        let activated = await activatedUsers(id);

        if (!activated) {
            return res
                .status(404)
                .json({ status: 404, message: "account failed verifivation" });
        }

        return res
            .status(201)
            .json({ status: 201, message: "account success verification" });
    },

    updateUsers: async (req, res, next) => {
        try {
            // check param & body
            let { id } = req.params;
            if (id === "") {
                return res.status(404).json({ message: `params invalid` });
            }
            let { username, email, password, address } = req.body;

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
                username: username || newUsers.username,
                email: email || newUsers.email,
                password: password || newUsers.password,
                address: address || newUsers.address,
            };

            console.log("photo profile");
            console.log(req.file);
            if (!req.file) {
                // update without photo
                data.photo_profile = newUsers.photo_profile;
                let result = await updateUsersModel(data);
                if (result.rowCount === 1) {
                    return res
                        .status(201)
                        .json({ code: 201, message: "success update data" });
                }
            } else if (req.file) {
                // update with photo
                if (!req.isFileValid) {
                    return res.json({
                        code: 404,
                        message: req.isFileValidMessage,
                    });
                }
                const imageUpload = await cloudinary.uploader.upload(
                    req.file.path,
                    {
                        folder: "photo profile",
                    }
                );
                console.log("cloudinary");
                console.log(imageUpload);

                if (!imageUpload) {
                    return res.json({
                        code: 404,
                        message: "Upload photo failed",
                    });
                }
                data.photo_profile = imageUpload.secure_url;
                let result = await updateUsersModel(data);
                if (result.rowCount === 1) {
                    return res
                        .status(201)
                        .json({ code: 201, message: "success update data" });
                }
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
