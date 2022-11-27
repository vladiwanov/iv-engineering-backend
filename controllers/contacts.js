const Contacts = require("../model/contacts");

//.           GET ALL controller
const getAll = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    // console.log("🚀 ~ file: contacts.js ~ line 7 ~ getAll ~ userId", userId);
    const contacts = await Contacts.getAll(userId, req.query);
    // const contacts = await Contacts.getAll( req.query);
    return res.json({
      status: "success",
      code: 200,
      data: { contacts },
    });
  } catch (e) {
    next(e);
  }
};

//.           GET BY ID controller
const getById = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const contact = await Contacts.getById(userId, req.params.id);
    // const contact = await Contacts.getById(req.params.id);
    if (contact) {
      return res.status(200).json({
        status: "success",
        code: 200,
        data: { contact },
      });
    } else {
      return res.status(404).json({
        status: "error",
        code: 404,
        data: { message: "Not Found" },
      });
    }
  } catch (e) {
    next(e);
  }
};

//.           POST controller  (CREATE)
const create = async (req, res, next) => {
  try {
    // console.log("Что пришло после валидации:🈯️::", req.body);
    let newContact = { ...req.body };
    if (!newContact.persons) {
      // console.log(`Такого свойства нет:::${newContact.persons}`);
      const { from, name, email, licence, comment } = req.body;
      newContact = {
        name,
        comment,
        licence,
        from,
        persons: [{ 1: { email } }],
      };
    }

    const userId = req.user?.id;
    const newItem = await Contacts.add(userId, newContact);
    // const newItem = await Contacts.add(userId, req.body);

    // console.log("Что уходит на фронт после создания контата :✅::", newItem);

    // console.log("🐙~ file: contacts.js ~ line 49~create ~ userId:", userId);

    return res.status(200).json({
      status: "success",
      code: 201,
      data: { newItem },
    });
  } catch (e) {
    next(e);
  }
};

//.      REMOVE controler
const remove = async (req, res, next) => {
  // console.log("Что пришло на сервер для удаления::📳::::", req.body);
  try {
    const userId = req.user?.id;
    const removedItem = await Contacts.remove(userId, req.params.id);
    if (removedItem) {
      return res.status(200).json({
        status: "removed",
        code: 200,
        data: { removedItem },
      });
    } else {
      return res.json({
        status: "error",
        code: 204,
        message: "No Content",
      });
    }
  } catch (e) {
    next(e);
  }
};

//.         UPDATE controller
const update = async (req, res, next) => {
  // console.log("Что приходит на сервер для обновления ::::🧧:::", req.body);
  try {
    const userId = req.user?.id;
    const updatedItem = await Contacts.update(userId, req.params.id, req.body);
    if (updatedItem) {
      // console.log("Что вернулось из обновления:::🎈::", updatedItem);
      res.status(200).json({
        status: "success",
        code: 200,
        data: updatedItem,
      });
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        data: { message: "Not Found" },
      });
    }
  } catch (e) {
    next(e);
  }
};

//.        FEATURES UPDATE controller

const featuresUpdate = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const updatedItem = await Contacts.update(userId, req.params.id, req.body);
    if (updatedItem) {
      res.status(200).json({
        status: "success",
        code: 200,
        data: updatedItem,
      });
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        data: { message: "Not Found" },
      });
    }
  } catch (e) {
    next(e);
  }
};

const onlyAdmin = (req, res, next) =>
  res.json({ status: "success", code: 200, data: { message: "only Admin" } });

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
  featuresUpdate,
  onlyAdmin,
};
