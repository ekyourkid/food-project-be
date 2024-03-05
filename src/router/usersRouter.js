const express = require("express");
const UsersController = require("../controller/usersController");
const router = express.Router();

router.get("/", UsersController.getUsers);
router.get("/detail", UsersController.getUsersDetail);
router.get("/:id", UsersController.getUsersById);
router.post("/", UsersController.createUsers);
router.put("/:id", UsersController.updateUsers);
router.delete("/:id", UsersController.deleteUsers);
module.exports = router;
