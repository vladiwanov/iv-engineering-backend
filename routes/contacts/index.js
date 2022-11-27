const express = require("express");
const router = express.Router();
const controllers = require("../../controllers/contacts");
const {
  newItemValid,
  updateItemValid,
  idValidation,
  queryListValid,
} = require("../../routes/contacts/items-validation");
const guard = require("../../helper/guard");
const role = require("../../helper/role");
const { Gender } = require("../../helper/constants");
const handleError = require("../../helper/handle-error");
const res = require("express/lib/response");

router
  .get("/", guard, queryListValid, controllers.getAll)
  ///// .get("/", queryListValid, controllers.getAll)
  ///////.post("/", guard, newItemValid, handleError(controllers.create));
  .post("/", newItemValid, handleError(controllers.create));
///// .post("/", handleError(controllers.create));

///// router.get("/man", guard, role(Gender.MALE), controllers.onlyAdmin);
// router.get("/woman", guard, role(Gender.FEMALE), controllers.onlyAdmin);

//// router
/////   .get("/:id", guard, idValidation, controllers.getById)
/////   .delete("/:id", guard, idValidation, controllers.remove)
/////   .put("/:id", guard, idValidation, updateItemValid, controllers.update)
/////   .patch(
// ///    "/:id",
// ///    guard,
/////     idValidation,
/////     updateItemValid,
/////     controllers.featuresUpdate
///// );
router
  .get("/:id", idValidation, controllers.getById)
  .delete("/:id", idValidation, controllers.remove)
  // .delete("/:id", controllers.remove)
  .put("/:id", idValidation, updateItemValid, controllers.update)
  .patch(
    "/:id",
    guard,
    idValidation,
    updateItemValid,
    controllers.featuresUpdate
  );

module.exports = router;
