const Users = require("../model/users");
const {
  HttpCode: {
    OK,
    CREATED,
    NO_CONTENT,
    BAD_REQUEST,
    UNAUTHORIZED,
    NOT_FOUND,
    CONFLICT,
  },
} = require("../helper/constants");
require("dotenv").config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const jwt = require("jsonwebtoken");
const User = require("../model/schemas/user-schema");

// ----------------REGISTRATION-----------------------

const signUp = async (req, res, next) => {
  const { email } = req.body;
  const user = await Users.findByEmail(email);
  if (user) {
    return res.status(CONFLICT).json({
      status: "error",
      code: CONFLICT,
      message: "this email is already used",
    });
  }
  try {
    const newUser = await Users.create(req.body);
    return res.status(CREATED).json({
      status: "success",
      code: CREATED,
      data: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        gender: newUser.gender,
      },
    });
  } catch (e) {
    next(e);
  }
};

// ----------LOGIN-----------------------

const login = async (req, res, next) => {
  // console.log("ЧТО ПРИШЛО НА СЕРВЕР ДЛЯ АВТОРИЗАЦИИ::🥁:", req.body);
  const { email, password } = req.body;
  // console.log("🎯  🎲::: ~ file: users.js ~ line 52 ~ login ~ email", email);

  const user = await Users.findByEmail(email);

  // console.log("USER INCONTROLLERS:::", user);
  const isValidPassword = await user?.validPassword(password);

  if (!user) {
    return res.status(UNAUTHORIZED).json({
      status: "error",
      code: UNAUTHORIZED,
      message: "invalid credentials (invalid login)",
    });
  } else if (!isValidPassword) {
    return res.status(UNAUTHORIZED).json({
      status: "errror",
      code: UNAUTHORIZED,
      message: "invalid credentials (invalid password)",
    });
  } else {
    const payload = { id: user.id };

    const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: "2h" });

    await Users.updateToken(user.id, token);

    return res.status(OK).json({
      status: "success",
      code: OK,
      data: { token },
    });
  }
};

// -----------------REFRESH ------(GET_CURRENT)------
const current = async (req, res, next) => {
  // console.log("текущий пользователь:::🚫::::", req.body);
  // const token = req.body.token;
  // const newItem = await User.findOne({ token });
  //  const id = newItem?.id;
  // console.log("current User:::🚫::::", id);
  //  await Users.updateToken(id, null);
  return;
};

// -----------------LOGOUT-----------------

const logout = async (req, res, next) => {
  console.log("кого на сервере надо разлогинить:::🚫::::", req.body);
  const token = req.body.token;
  const newItem = await User.findOne({ token });
  const id = newItem?.id;
  console.log("кого надо разлогинить:::🚫::::", id);
  await Users.updateToken(id, null);
  return res.status(NO_CONTENT).json({});
};

const updateAvatar = async (req, res, next) => {
  return {};
};

module.exports = { signUp, login, logout, updateAvatar, current };
