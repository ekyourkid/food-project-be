const express = require("express");
const UsersController = require("../controller/usersController");
const router = express.Router();
const { authentification } = require("../middleware/auth");

router.get("/", UsersController.getUsers);
router.get("/detail", UsersController.getUsersDetail);
router.get("/:id", authentification, UsersController.getUsersById);
router.post("/register", UsersController.registerUsers);
router.post("/login", UsersController.loginUsers);
router.post("/", UsersController.createUsers);
router.put("/:id", UsersController.updateUsers);
router.delete("/:id", UsersController.deleteUsers);
module.exports = router;
