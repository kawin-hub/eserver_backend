//User model
let userModel = require("../models/Users/");
let jwt = require("jsonwebtoken");
let dotenv = require("dotenv");

dotenv.config();

const getAllUsers = async (req, res, next) => {
  const users = await userModel.getAllUsers();

  res.json(users);
};

const getUser = async (req, res, next) => {
  const accessToken = req.accessToken;
  const userReq = jwt.verify(accessToken, process.env.LOGIN_JWT_KEY);
  let userData = null;
  let message = "Query successfully";
  let statusCode = 200;
  
  if (userReq !== undefined) {
    const userReqId = userReq.userInfo.userData._id;
    const userReqAbilities = userReq.userInfo.userAbilities;
    //query user
    userData = await userModel.getUserById(userReqId);

    if(userData == null){
      statusCode = 400;
      message = "This user id is not available.";
    }
  }

  res.status(statusCode).send({ message, userData });
};

const auth = async (req, res, next) => {
  const { email, password } = req.body;

  if (email === undefined || password === undefined) {
    res.json({ error: 1, message: "Email and Password are required!" });
    return 0;
  }

  const loginData = { email, password };

  const userData = await userModel.Authentication(loginData);

  let dataReturn = {};
  let statusCode = 200;

  if (!userData) {
    dataReturn = { errors: { email: ["Email or Password is Invalid"] } };
    statusCode = 400;
  } else {
    // Exist username and password
    let timeStampNow = (Date.now() / 1000) | 0;
    let timeStampExpire =
      timeStampNow + 60 * 60 * 24 * parseInt(process.env.LOGIN_EXPIRE_PERIOD);

    let userAbilities = [
      {
        action: "manage",
        subject: "all",
      },
    ];

    const refreshToken = randomString(50);

    let userInfo = { userAbilities, userData };
    let accessToken = await generateJwtToken(userInfo);

    //REFRESH_TOKEN_EXPIRE_DATE
    var refreshTokenExpireDate = new Date();
    refreshTokenExpireDate.setDate(
      refreshTokenExpireDate.getDate() +
        parseInt(process.env.REFRESH_TOKEN_EXPIRE_DATE)
    );

    let refreshTokenResult = await userModel.insertRefreshToken(
      accessToken,
      refreshToken,
      refreshTokenExpireDate
    );

    //console.log(Math.floor(refreshTokenExpireDate / 1000));

    dataReturn = {
      message: { auth: ["Auth success"] },
      accessToken: accessToken,
      refreshTokenDetail: {
        refreshToken,
        exp: Math.floor((refreshTokenExpireDate / 1000) | 0),
      },
    };
  }

  res.status(statusCode).send(dataReturn);
};

const doRefreshToken = async (req, res, next) => {
  const oldAccessToken = req.body.accessToken;
  const oldRefreshToken = req.body.refreshToken;

  //Check param exist or not
  if (oldAccessToken === undefined || oldRefreshToken === undefined) {
    res.json({
      error: 1,
      message: "AccessToken and refreshToken are required!",
    });
    return 0;
  }

  //Query user data by id
  const userReq = jwt.verify(oldAccessToken, process.env.LOGIN_JWT_KEY, {
    ignoreExpiration: true,
  });

  const userReqId = userReq.userInfo.userData._id;
  const userReqAbilities = userReq.userInfo.userAbilities; // Mock up, have to get from database

  const userData = await userModel.getUserById(userReqId);

  let dataReturn = {};
  let statusCode = 200;

  if (!userData) {
    //User isn't exist in database
    dataReturn = { errors: { user: ["User isn't valid"] } };
    statusCode = 400;
  } else {
    // User exist in database
    var timeStampNow = (Date.now() / 1000) | 0;
    var timeStampExpire =
      timeStampNow + 60 * 60 * 24 * parseInt(process.env.LOGIN_EXPIRE_PERIOD);

    var refreshToken = randomString(50);

    //Generate new refreshToken
    var refreshTokenExpireDate = new Date();
    refreshTokenExpireDate.setDate(
      refreshTokenExpireDate.getDate() +
        parseInt(process.env.REFRESH_TOKEN_EXPIRE_DATE)
    );

    //Generate new accessToken
    var userInfo = { userAbilities: userReqAbilities, userData: userData };
    var accessToken = await generateJwtToken(userInfo);

    //Delete old record of refreshToken
    const deleteOldRefreshToken =
      await userModel.deleteRefreshTokenByRefreshToken(oldRefreshToken);

    //Insert refreshToken to database
    if (deleteOldRefreshToken.deletedCount > 0) {
      await userModel.insertRefreshToken(
        accessToken,
        refreshToken,
        refreshTokenExpireDate
      );

      dataReturn = {
        message: { reAccessToken: ["re access token success"] },
        accessToken: accessToken,
        refreshTokenDetail: {
          refreshToken,
          exp: Math.floor((refreshTokenExpireDate / 1000) | 0),
        },
        userInfo: userInfo,
      };
    } else {
      dataReturn = {
        errors: 1,
        message: { reAccessToken: ["re access token failed."] },
        accessToken: accessToken,
        refreshTokenDetail: {
          refreshToken,
          exp: Math.floor((refreshTokenExpireDate / 1000) | 0),
        },
        userInfo: userInfo,
      };
    }
  }
  res.status(statusCode).send(dataReturn);
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

function generateJwtToken(userInfo) {
  return new Promise(function (resolve, reject) {
    jwt.sign(
      { userInfo },
      process.env.LOGIN_JWT_KEY,
      {
        expiresIn:
          process.env.LOGIN_EXPIRE_PERIOD + process.env.LOGIN_EXPIRE_UNIT,
      },
      (err, token) => {
        resolve(token);
      }
    );
  });
}

module.exports = { getAllUsers, auth, doRefreshToken, getUser };
