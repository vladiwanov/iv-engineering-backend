const express = require("express");
const router = express.Router();
const controllers = require("../../controllers/users");
const guard = require("../../helper/guard");
// const {
//   newItemValid,
//   updateItemValid,
//   idValidation,
// } = require("../../routes/contacts/items-validation");
// const handleError = require("../../helper/handle-error");
const res = require("express/lib/response");
const uploadAvatar = require("../../helper/upload-avatar");

// // =================================================
// //
// const { getAllUsers } = require("../../model/users");
// //
// router.get("/", async (req, res, next) => {
//   try {
//     const usersList = await getAllUsers();
//     return res.status(200).json({
//       status: "success",
//       code: 200,
//       data: { usersList },
//     });
//   } catch (e) {
//     next(e);
//   }
// });
// // ===================================================

router.get("/current", guard, controllers.current);
router.post("/registration", controllers.signUp);
router.post("/login", controllers.login);
router.post("/logout", guard, controllers.logout);
// router.post("/logout", controllers.logout);
router.patch(
  "/avatars",
  guard,
  uploadAvatar.single("avatar"),
  controllers.updateAvatar
);
module.exports = router;
