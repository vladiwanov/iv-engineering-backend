const wrap = (fn) => async (req, res, next) => {
  try {
    // console.log(
    //   "🚀 ~ file: handle-error.js ~ line 5 ~ wrap ~ TEST POINT is : handle-error - TESTING IS SUCCESSFULL "
    // );
    return await fn(req, res, next);
  } catch (e) {
    // console.log(
    //   "🚀 ~ file: handle-error.js ~ line 5 ~ wrap ~ TEST POINT is : handle-error - TESTING IS PASS BUT IN ERROR  "
    // );
    if (e.name === "ValidationError") {
      e.status == 400;
    }
    next(e);
  }
};
module.exports = wrap;
