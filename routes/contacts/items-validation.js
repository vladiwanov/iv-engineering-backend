const res = require("express/lib/response");
const { optional, allow } = require("joi");
const Joi = require("joi");
const mongoose = require("mongoose");

const schemaCreateContact = Joi.object({
  persons: Joi.array().min(0).max(100).optional(),
  name: Joi.string().min(0).max(30).optional(),
  firstName: Joi.string().min(0).max(30).optional(),
  lastName: Joi.string().min(0).max(30).optional(),
  position: Joi.string().min(0).max(30).optional(),
  company: Joi.string().min(0).max(30).optional(),
  talkingRezult: Joi.string().min(0).max(3000).optional(),
  callingDate: Joi.string().min(0).max(30).optional(), //. - must be changed
  nextCallingDate: Joi.string().min(0).max(30).optional(), //. - must be changed
  licence: Joi.boolean().optional(),
  from: Joi.string().optional(),
  tel: Joi.string().min(0).max(300).optional(),
  address: Joi.string().min(0).max(400).optional(),
  web: Joi.string().min(0).max(100).optional(),
  direction: Joi.string().min(0).max(30).optional(),
  comment: Joi.string().min(0).max(3000).optional(),
  dataSubmit: Joi.date().optional(),
  priority: Joi.boolean().optional(),
  // email: Joi.string()
  //   .email({
  //     minDomainSegments: 1,
  //     tlds: { allow: ["com", "net", "ua", "org", "pro", "me"] },
  //   })
  //   .optional(),

  // --------test---------------
  email: Joi.string().min(0).max(30).optional(),
});

const schemaQueryContact = Joi.object({
  // sortBy: Joi.string()
  // .valid("name", "id", "direction", "dataSubmit")
  // .optional(),
  // sortByDesc: Joi.string()
  // .valid("name", "id", "direction", "dataSubmit")
  // .optional(),
  // filter: Joi.string()
  // .valid("name", "id", "direction", "dataSubmit")
  // .optional(),
  // persons: Joi.array()
  //   .valid("firstNAme", "lastName", "position", "email", "tel")
  //   .min(0)
  //   .max(100)
  //   .optional(),
  // firstName: Joi.string().min(0).max(30).optional(),
  // lastName: Joi.string().min(0).max(30).optional(),
  // position: Joi.string().min(0).max(30).optional(),
  // company: Joi.string().min(0).max(30).optional(),
  // limit: Joi.number().integer().min(0).max(50).optional(),
  // offset: Joi.number().integer().min(0).optional(),
  // from: Joi.string().optional(),
  // name: Joi.string().min(0).max(30).optional(),
  // licence: Joi.boolean().optional(),
  // tel: Joi.string().min(0).max(300).optional(),
  // address: Joi.string().min(0).max(400).optional(),
  // web: Joi.string().min(0).max(100).optional(),
  // direction: Joi.string().min(0).max(30).optional(),
  // talkingRezult: Joi.string().min(0).max(3000).optional(),
  // callingDate: Joi.string().min(0).max(30).optional(), //. - must be changed
  // nextCallingDate: Joi.string().min(0).max(30).optional(),
  // comment: Joi.string().min(0).max(900).optional(),
  // dataSubmit: Joi.date().optional(),
  // priority: Joi.boolean().optional(),
  // email: Joi.string()
  //   .email({
  //     // minDomainSegments: 2,
  //     tlds: { allow: ["com", "net", "ua", "org", "pro", "me"] },
  // })
  // .optional(),
  // --------test---------------
  // email: Joi.string().min(0).max(30).optional(),
}).without("sortBy", "sortByDesc");

const schemaUpdateContact = Joi.object({
  name: Joi.string().min(0).max(30).optional(),
  licence: Joi.boolean().optional(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "ua", "org", "pro", "me"] },
    })
    .optional(),
  persons: Joi.array().min(0).max(100).optional(),
  firstName: Joi.string().min(6).max(30).optional(),
  lastName: Joi.string().min(9).max(30).optional(),
  position: Joi.string().min(0).max(30).optional(),
  tel: Joi.string().min(0).max(300).optional(),
  address: Joi.string().min(0).max(400).optional(),
  web: Joi.string().min(0).max(100).optional(),
  from: Joi.string().optional(),
  company: Joi.string().min(0).max(30).optional(),
  talkingRezult: Joi.string().min(0).max(3000).optional(),
  callingDate: Joi.string().min(0).max(30).optional(), //. - must be changed
  nextCallingDate: Joi.string().min(0).max(30).optional(),
  direction: Joi.string().min(0).max(30).optional(),
  comment: Joi.string().min(0).max(900).optional(),
  contact: Joi.string().min(10).max(12).optional(),
  priority: Joi.boolean().optional(),
});
// .xor(
// "name",
// "from",
// "contact",
// "position",
// "lastName",
// "firstName",
// "company"
// "comments",
// "direction"
// );

// ------------------------------------------ validation-----------------------

const validate = async (schema, object, next) => {
  try {
    await schema.validateAsync(object);
    // console.log(
    //   "🚀 ~ file: items-validation.js ~ line 45 ~ VALIDATION IS SUCCESSFULL::::",
    //   object
    // );
    return next();
  } catch (err) {
    // console.log(
    //   "🚀 ~ file: items-validation.js ~ line 117 ~ validate ~ VALIDATION ERROR because:",
    //   err.message
    // );
    next({ staus: 400, message: err.message.replace(/"/g, "'") });
  }
};

// --------------------------------------------------------------------------------

module.exports = {
  newItemValid: async (req, res, next) => {
    // console.log(
    //   "🚀 ~ file: items-validation.js ~ line 129 ~ newItemValid: ~   ЧТО ПРИШЛО НА ВАЛИДАЦИЮ ИЗ routes/contacts/index.js  REQ-BODY:🔵:++>>",
    //   req.body
    // );

    return await validate(schemaCreateContact, req.body, next);
  },

  queryListValid: async (req, res, next) => {
    // console.log(
    //   "🚀💹 😙 😛 ~ file: items-validation.js ~ line 137 ~ queryListValid: ~ req.user::::",
    //   req.user
    // );
    await validate(schemaQueryContact, req.query, next);
  },

  updateItemValid: async (req, res, next) => {
    // console.log(
    //   "🚀 ~ file: items-validation.js ~ line 144 ~ updateItemValid: ~ req",
    //   req.body
    // );

    return await validate(schemaUpdateContact, req.body, next);
  },

  idValidation: async (req, res, next) => {
    // console.log(
    //   "🚀 ❇️ ✳️ ❎~ file: items-validation.js ~ line 102 ~ idValidation: ~ req",
    //   req.params.id
    // );

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      // console.log(
      //   "🚀 🛑 ⛔️~ file: items-validation.js ~ line 73 ~ idValidation: ~ ERROR",
      //   req.params.id
      // );
      return next({
        staus: "error",
        code: 400,
        message: "invalid object id",
      });
    }
    next();
  },
};
