const express = require("express");

const usersControllers = require("../controllers/users-controllers");

const router = express.Router();

router.get("/", (req, res, next) => {
  res.json({ user: "Harwinder Singh" });
});

router.get("/:uid", usersControllers.getUserById);

router.post("/", usersControllers.createUser);

router.patch("/:uid", usersControllers.updateUserById);

router.delete("/:uid", usersControllers.deleteUserById);

module.exports = router;
