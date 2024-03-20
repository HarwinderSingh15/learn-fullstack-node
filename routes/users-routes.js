const express = require("express");

const usersControllers = require("../controllers/users-controllers");

const router = express.Router();

router.get("/", usersControllers.getAllUsers);

router.get("/:uid", usersControllers.getUserById);

// router.post("/", usersControllers.createUser);

router.patch("/:uid", usersControllers.updateUserById);

router.delete("/:uid", usersControllers.deleteUserById); 

router.post("/signup", usersControllers.createUser);

router.post("/login", usersControllers.loginUserByUsernameAndPassword);

module.exports = router;
