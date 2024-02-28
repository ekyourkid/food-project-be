const express = require("express");
const UsersController = require("../controller/usersController");
const router = express.Router();

router.get("/", UsersController.getUsers);

module.exports = router;
