import db from "../models/index";
import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);
import jwt from "jsonwebtoken";
require("dotenv").config();

let refreshTokens = [];

let generateAccessToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      isAdmin: user.providerId,
    },
    process.env.JWT_ACCESS_KEY,
    { expiresIn: "30s" }
  );
}

let generateRefreshToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      isAdmin: user.providerId,
    },
    process.env.JWT_REFRESH_KEY,
    { expiresIn: "365d" }
  );
}

let handleUserLogin = (res, email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};

      let isExist = await checkUserEmail(email);
      if (isExist) {
        let user = await db.User.findOne({
          where: { email: email },
        });
        if (user) {
          let check = await bcrypt.compareSync(password, user.password);
          if (check) {
            userData.errCode = 0;
            userData.errMessage = "ok";
            delete user.password;
            userData.user = user;
            //Generate access token
            const accessToken = generateAccessToken(user);
            //Generate refresh token
            const refreshToken = generateRefreshToken(user);
            refreshTokens.push(refreshToken);

            userData.refreshToken = refreshToken;
            userData.accessToken = accessToken;
          } else {
            userData.errCode = 3;
            userData.errMessage = "Sai mật khẩu!";
          }
        } else {
          userData.errCode = 2;
          userData.errMessage = `Email của bạn không tìm thấy!`;
        }
      } else {
        userData.errCode = 1;
        userData.errMessage = `Email không tồn tại!`;
      }
      resolve(userData);
    } catch (e) {
      reject(e);
    }
  });
};

let getTokenLogin = (res, user) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      if (user) {
        userData.errCode = 0;
        userData.errMessage = "ok";
        userData.user = {
          id: user.uid,
          providerId: "user"
        };
        //Generate access token
        const accessToken = generateAccessToken(userData.user);
        //Generate refresh token
        const refreshToken = generateRefreshToken(userData.user);
        refreshTokens.push(refreshToken);
        userData.refreshToken = refreshToken;
        userData.accessToken = accessToken;
      }
      resolve(userData);
    } catch (e) {
      reject(e);
    }
  });
};

let requestRefreshToken = async (res, data) => {
  console.log(data.refreshToken);
  console.log(refreshTokens);
  if (!data.refreshToken) return res.status(401).json("You're not authenticated");
  if (!refreshTokens.includes(data.refreshToken)) {
    return res.status(403).json("Refresh token is not valid");
  }
  jwt.verify(data.refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
    if (err) {
      console.log(err);
    }
    //create new access token, refresh token and send to user
    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);
    refreshTokens.push(newRefreshToken);
    res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  });
};

let logOut = async (req, res) => {
  //Clear cookies when user logs out
  refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
  res.clearCookie("refreshToken");
  res.status(200).json("Logged out successfully!");
};

let checkUserEmail = (userEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { email: userEmail },
      });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getAllUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = await db.User.findAll({
        attributes: {
          exclude: ["password"],
        },
      });
      resolve(users);
    } catch (e) {
      reject(e);
    }
  });
};

let createUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let check = await checkUserEmail(data.email);
      if (check === true) {
        resolve({
          errCode: 1,
          message:
            "Email của bạn đã được sử dụng. Vui lòng thử một email khác !!",
        });
      } else {
        let hashPassword = await hasUserPassword(data.password);
        await db.User.create({
          email: data.email,
          password: hashPassword,
          fullName: data.fullName,
          address: data.address,
          phoneNumber: data.phoneNumber,
          photoURL: data.photoURL,
          providerId: data.providerId,
        });
        resolve({
          errCode: 0,
          message: "Tạo người dùng thành công",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let hasUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hash = await bcrypt.hashSync(password, salt);
      resolve(hash);
    } catch (e) {
      reject(e);
    }
  });
};

let getUserById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: id },
        raw: true,
      });
      if (user) {
        resolve(user);
      } else {
        resolve([]);
      }
    } catch (e) {
      reject(e);
    }
  });
};

let editUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 2,
          message: "Thiếu thông số đầu vào!",
        });
      }
      let user = await db.User.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (user) {
        user.email = data.email;
        user.fullName = data.fullName;
        user.address = data.address;
        user.phoneNumber = data.phoneNumber;
        user.photoURL = data.photoURL;
        user.providerId = data.providerId;

        await user.save();
        resolve({
          errCode: 0,
          message: "Cập nhật người dùng là thành công!",
        });
      } else {
        resolve({
          errCode: 2,
          message: `Không tìm thấy người dùng`,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let deleteUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (user) {
        await user.destroy();
        resolve({
          errCode: 0,
          message: "Người dùng đã bị xóa",
        });
      } else {
        resolve({
          errCode: 2,
          message: `Không tìm thấy người dùng`,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  handleUserLogin: handleUserLogin,
  getAllUser: getAllUser,
  createUser: createUser,
  editUser: editUser,
  deleteUser: deleteUser,
  requestRefreshToken: requestRefreshToken,
  logOut: logOut,
  getTokenLogin: getTokenLogin,
};
