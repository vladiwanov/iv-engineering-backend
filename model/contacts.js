const contactList = require("./schemas/contact-schema");

//.GET ALL model

// const getAll = async (userId, query) => {
// const {
// sortBy,
// sortByDesc,
// isFavorite = null,
// filter,
// limit = 5,
// offset = 0,
// } = query;

// const { docs: contacts, totalDocs: total } = await contactList.paginate(
// { owner: userId },
// {
// limit,
// offset,
// sort: {
// ...(sortBy ? { [`${sortBy}`]: 1 } : {}),
// ...(sortByDesc ? { [`${sortByDesc}`]: -1 } : {}),
// }
// select: filter ? filter.split("|").join("") : "",
// populate: {
// path: "owner",
// select: "name email gender -_id ",
// },
// }
// );
// return { contacts, total /* limit, offset*/ };
// };

const getAll = async () => await contactList.find();

//. GET BY ID
// const getById = async (id) => await contactList.findOne({ _id: id });
const getById = async (userId, id) =>
  await contactList.findOne({ _id: id, owner: userId });
// .populate({ path: "owner", select: "name email gender -_id" });
//

//. REMOVE
// const remove = async (id) => await contactList.findOneAndRemove({ _id: id });
const remove = async (userId, id) =>
  await contactList.findByIdAndRemove({ _id: id, owner: userId });
// await contactList.findOneAndRemove({ _id: id, owner: userId });
// const remove = async (id) => await contactList.findByIdAndDelete({ _id: id });

//. ADD
// const add = async (userId, body) => await contactList.create(body);

// . ADD (если использовать аутентификацию длядобавления контакта):
const add = async (userId, body) =>
  await contactList.create({ ...body, owner: userId });

//.UPDATE
// const update = async (id, body) =>
//   await contactList.findByIdAndUpdate({ _id: id }, { ...body }, { new: true });
const update = async (userId, id, body) => {
  // console.log("Что приходит в модуль для обновления в бекенде ::🉐::", body);
  return await contactList.findByIdAndUpdate(
    { _id: id, owner: userId },
    { ...body },
    { new: true }
  );
};

module.exports = {
  getAll,
  getById,
  add,
  remove,
  update,
};
