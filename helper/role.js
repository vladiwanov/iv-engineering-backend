const {
  HttpCode: {
    OK,
    CREATED,
    NO_CONTENT,
    BAD_REQUEST,
    UNAUTHORIZED,
    FORBIDDEN,
    NOT_FOUND,
    CONFLICT,
  },
} = require("./constants");

// const role = (role) => (req, res, next) => {
//   const roleUser = req.user.gender;
//   if (roleUser !== role) {
//     return res.status(FORBIDDEN).json({
//       status: "error",
//       code: FORBIDDEN,
//       message: "Access denied",
//     });
//   }
//   return next();
// };

const role = (role) => (req, res, next) =>
  req.user.gender !== role
    ? res.status(FORBIDDEN).json({
        status: "error",
        code: FORBIDDEN,
        message: "Access denied",
      })
    : next();

module.exports = role;
