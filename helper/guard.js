const passport = require("passport");
require("../config/passport");
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
} = require("./constants");

const guard = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    let token = null;
    if (req.get("Authorization")) {
      token = req.get("Authorization").split(" ")[1];
    }
    if (!user || err || token !== user.token) {
      return res.status(UNAUTHORIZED).json({
        status: "error",
        code: UNAUTHORIZED,
        message: "Unauhrized",
      });
    }
    req.user = user;
    // res.locals.user = user;

    // console.log(
    //   "🍎 🍎 ~ file: guard.js ~ line 30 ~ passport.authenticate ~ req.user:::",
    //   req.user
    // );

    return next();
  })(req, res, next);
};

module.exports = guard;
