const bcrypt = require("bcrypt");
const User = require("./user.schema");
const RefreshToken = require("./refreshToken.schema");

const generatePassword = async (password) => {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const passwordHashed = await bcrypt.hash(password, salt);

  return passwordHashed;
};

// Get all users
const getAllUsers = async () => {
  var users = await User.find().select("-password").lean();
  return users;
};

//Get users by id
const getUserById = async (_id) => {
  var user = null;

  try {
    user = await User.findOne({ _id: _id }).select("-password").lean();
  } catch (e) {}

  return user;
};

const Authentication = async (loginData) => {
  var user = await User.findOne({ email: loginData.email }).lean();

  if (user) {
    if (!(await bcrypt.compare(loginData.password, user.password))) user = null;
    else delete user.password;
  }

  return user;
};

const insertRefreshToken = async (
  accessToken,
  rToken,
  refreshTokenExpireDate
) => {
  var refreshTokenDetail = new RefreshToken({
    accessToken: accessToken,
    refreshToken: rToken,
    exp: refreshTokenExpireDate,
  });

  const result = await refreshTokenDetail.save();

  return result;
};

const deleteRefreshTokenByRefreshToken = async (rToken) => {
  const result = await RefreshToken.deleteOne({ refreshToken: rToken });

  return result;
};

module.exports = {
  getAllUsers,
  Authentication,
  insertRefreshToken,
  getUserById,
  deleteRefreshTokenByRefreshToken,
};
