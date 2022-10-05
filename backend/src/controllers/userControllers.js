import userService from "../services/userService";

let handleLogin = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  if (!email || !password) {
    return res.status(500).json({
      errCode: 1,
      message: "Thiếu thông số đầu vào!",
    });
  }
  try {
    let userData = await userService.handleUserLogin(email, password);

    return res.status(200).json({
      errCode: userData.errCode,
      message: userData.errMessage,
      user: userData.user ? userData.user : {},
    });
  } catch (e) {
    console.log(e);
  }
};

let getAllUser = async (req, res) => {
  try {
    let users = await userService.getAllUser();
    return res.status(200).json({
      errCode: 0,
      message: "Ok!",
      users,
    });
  } catch (e) {
    console.log(e);
  }
};

let createUser = async (req, res) => {
  try {
    let user = await userService.createUser(req.body);
    return res.status(200).json(user);
  } catch (e) {
    console.log(e);
  }
};

let editUser = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      message: "Thiếu thông số đầu vào!",
    });
  }
  try {
    let user = await userService.editUser(req.body);
    return res.status(200).json(user);
  } catch (e) {
    console.log(e);
  }
};

let deleteUser = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      message: "Thiếu thông số đầu vào!",
    });
  }
  try {
    let user = await userService.deleteUser(req.body);
    return res.status(200).json(user);
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  handleLogin: handleLogin,
  getAllUser: getAllUser,
  createUser: createUser,
  editUser: editUser,
  deleteUser: deleteUser,
};
