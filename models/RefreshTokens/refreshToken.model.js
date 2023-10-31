const bcrypt = require("bcrypt");
const User = require("./refreshToken.schema");

const generatePassword = async (password) => {
  const refreshToken = randomString(30);
  console.log(refreshToken);
};

function randomString(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

module.exports = { getAllUsers, Authentication };
