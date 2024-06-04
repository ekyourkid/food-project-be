const express = require("express");
const UsersController = require("../controller/usersController");
const router = express.Router();
const { authentification } = require("../middleware/auth");
const upload = require("../middleware/photo");

router.post("/login", UsersController.loginUsers);
router.post("/regist", UsersController.registUsers);
router.get("/activated/:id/:otp", UsersController.verification);
router.get("/", UsersController.getUsers);
router.get("/detail", UsersController.getUsersDetail);
router.get("/:id", UsersController.getUsersById);
// router.post(
//     "/register",
//     upload.single("photo_profile"),
//     UsersController.registerUsers
// );
// router.get("/activated/:id/:otp", UsersController.verification);
router.put("/:id", upload.single("photo_profile"), UsersController.updateUsers);
router.delete("/:id", UsersController.deleteUsers);
module.exports = router;
