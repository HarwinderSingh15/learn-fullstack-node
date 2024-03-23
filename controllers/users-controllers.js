const { v4: uuidV4 } = require("uuid");

const db = require("../config/db");
const HttpError = require("../models/http-error");
const {
  validateSignup,
  validateUpdateUser,
} = require("../helpers/validation_schema");

const DUMMY_USERS = [
  {
    uid: "u1",
    username: "harry",
    first_name: "Harwinder",
    last_name: "Singh",
    dob: "15-08-1999",
    location: "Mohali",
    email: "harry@test.com",
    password: "123456",
  },
];

const getAllUsers = (req, res, next) => {
  res.json({ message: "All users", data: DUMMY_USERS });
};

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
  const { error, value } = validateSignup(req.body);

  if (error) {
    next(
      new HttpError(
        error.details.map((el) => el.message),
        422
      )
    );
    return;
  }

  if (DUMMY_USERS.find((el) => value.email === el.email)) {
    next(new HttpError("Could not create user! email already exits."));
    return;
  }
  const createdUser = {
    uid: uuidV4(),
    ...value,
  };

  `INSERT INTO users (username, password, email, first_name, last_name, address, lat, lng, hobbies, dob, acceptTos, user_role, nri, nri_country) 
VALUES 
('bob_jones', 'securepass', 'bob.jones@example.com', 'Bob', 'Jones', '789 Oak St', 51.5074, -0.1278, 'cooking, gardening', '1978-03-10', true, 3, false, NULL);
`;
  DUMMY_USERS.push(createdUser);
  res.status(201).json(createdUser);
};

const updateUserById = (req, res, next) => {
  const { uid } = req.params;

  const { error, value } = validateUpdateUser(req.body);

  if (error) {
    next(
      new HttpError(
        error.details.map((el) => el.message),
        422
      )
    );
    return;
  }

  const userFound = DUMMY_USERS.find((el) => el.uid === uid);
  const userIdxFound = DUMMY_USERS.findIndex((el) => el.uid === uid);

  if (!userFound) {
    next(new HttpError("No user with this id found!", 404));
    return;
  }
  const { first_name, last_name, dob, location } = value;

  const updatedUser = {
    ...userFound,
    first_name: first_name || userFound.first_name,
    last_name: last_name || userFound.last_name,
    dob: dob || userFound.dob,
    location: location || userFound.location,
  };

  DUMMY_USERS[userIdxFound] = updatedUser;

  res.status(200).json({
    message: "user with this " + uid + " has been updated",
    data: updatedUser,
  });
};

const deleteUserById = (req, res, next) => {
  const { uid } = req.params;

  const userFound = DUMMY_USERS.find((el) => el.uid === uid);
  const findIdx = DUMMY_USERS.findIndex((el) => el.uid === uid);

  if (!userFound) {
    next(new HttpError("No user with this id found!", 404));
    return;
  }

  delete DUMMY_USERS[findIdx];

  res.json({
    message: "User has been deleted successfully",
  });
};

const loginUserByUsernameAndPassword = (req, res, next) => {
  const { email, password } = req.body;

  const userFound = DUMMY_USERS.find((el) => el.email == email);

  if (!userFound) {
    next(new HttpError("No user found with provided email!", 404));
    return;
  }

  if (userFound.password == password) {
    res.json({ message: "Login successfull", data: userFound });
  } else {
    next(new HttpError("Incorrect password!", 401));
    return;
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
  loginUserByUsernameAndPassword,
};
