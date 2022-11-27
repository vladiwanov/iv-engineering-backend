const User = require("./schemas/user-schema");
// // ====================
// const getAllUsers = async () => await User.find();
// // ====================
const findById = async (id) => await User.findOne({ _id: id });

// const findByEmail = async (email) => await User.findOne({ email });
const findByEmail = async (email) => {
  // console.log(
  //   "🚀 ~ file: users.js ~ line 9 ~ findByEmail ~ email::🚾::",
  //   email
  // );
  return await User.findOne({ email });
};

const create = async (userOptions) => await new User(userOptions).save();

const updateToken = async (id, token) =>
  await User.updateOne({ _id: id }, { token });
module.exports = {
  findById,
  findByEmail,
  create,
  updateToken,
  // getAllUsers,
};
