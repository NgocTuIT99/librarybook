import db from "../models/index";
import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);

let handleUserLogin = (email, password) => {
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
};
