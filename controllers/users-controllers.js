const { v4: uuidV4 } = require("uuid");

const HttpError = require("../models/http-error");

const DUMMY_USERS = [
  {
    uid: "u1",
    username: "harry",
    first_name: "Harwinder",
    last_name: "Singh",
    dob: "15-08-1999",
    location: "Mohali",
  },
];

const getUserById = (req, res, next) => {
  if (req.params?.uid) {
    const userFound = DUMMY_USERS.find((el) => req.params?.uid == el.uid);
    if (userFound) {
      return res.json({
        user_details: userFound,
      });
    } else {
      next(new HttpError("No user found with provided id", 404));
    }
  }
};

const createUser = (req, res, next) => {
  const { username, first_name, last_name, dob, location } = req.body;
  const createdUser = {
    uid: uuidV4(),
    first_name,
    last_name,
    username,
    dob,
    location,
  };
  DUMMY_USERS.push(createdUser);
  res.status(201).json(createdUser);
};

const updateUserById = (req, res, next) => {
  const { uid } = req.params;
  const { username, first_name, last_name, dob, location } = req.body;

  const userFound = DUMMY_USERS.find((el) => el.uid === uid);
  const userIdxFound = DUMMY_USERS.findIndex((el) => el.uid === uid);

  if (!userFound) {
    next(new HttpError("No user with this id found!", 404));
    return;
  }

  const updatedUser = {
    uid: userFound.uid,
    username: username || userFound.username,
    first_name: first_name || userFound.first_name,
    last_name: last_name || userFound.last_name,
    dob: dob || userFound.dob,
    location: location || userFound.location,
  };

  DUMMY_USERS[userIdxFound] = updatedUser;

  res
    .status(200)
    .json({ message: "user with this " + uid + " has been updated" });
};

const deleteUserById = (req, res, next) => {
  const { uid } = req.params;

  const userFound = DUMMY_USERS.find((el) => el.uid === uid);

  if (!userFound) {
    next(new HttpError("No user with this id found!", 404));
    return;
  }

  DUMMY_USERS = DUMMY_USERS.filter((el) => el.uid != userFound.uid);

  res.json({
    message: "User has been deleted successfully",
    data: updatedUser,
  });
};

module.exports = { getUserById, createUser, updateUserById, deleteUserById };
