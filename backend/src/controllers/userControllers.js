import userService from "../services/userService";
import { userLoginInput, userCreateInput, userEditInput, userDeleteInput } from "../Validate";
import Validator from "fastest-validator";

let handleLogin = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  let v = new Validator();
  let validationResponse = v.validate({ email, password }, userLoginInput)

  if (validationResponse !== true) {
    return res.status(400).json({
      errCode: validationResponse,
      message: "Validation failed!",
    });
  }
  try {
    let userData = await userService.handleUserLogin(res, email, password);

    return res.status(200).json({
      errCode: userData.errCode,
      message: userData.errMessage,
      user: userData.user ? userData.user : {},
      accessToken: userData.accessToken,
      refreshToken: userData.refreshToken
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
  let v = new Validator();
  let validationResponse = v.validate(req.body, userCreateInput)

  if (validationResponse !== true) {
    return res.status(400).json({
      errCode: validationResponse,
      message: "Validation failed!",
    });
  }
  try {
    let user = await userService.createUser(req.body);
    return res.status(200).json(user);
  } catch (e) {
    console.log(e);
  }
};

let editUser = async (req, res) => {
  let v = new Validator();
  let validationResponse = v.validate(req.body, userEditInput)

  if (validationResponse !== true) {
    return res.status(400).json({
      errCode: validationResponse,
      message: "Validation failed!",
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
  let v = new Validator();
  let validationResponse = v.validate(req.body, userDeleteInput)

  if (validationResponse !== true) {
    return res.status(400).json({
      errCode: validationResponse,
      message: "Validation failed!",
    });
  }
  try {
    let user = await userService.deleteUser(req.body);
    return res.status(200).json(user);
  } catch (e) {
    console.log(e);
  }
};

let requestRefreshToken = async (req, res) => {
  try {
    let user = await userService.requestRefreshToken(res, req.body);
    return res.status(200).json(user);
  } catch (e) {
    console.log(e);
  }
};

let logOut = async (req, res) => {
  try {
    let user = await userService.logOut(req, res);
    return res.status(200).json(user);
  } catch (e) {
    console.log(e);
  }
};

let getTokenLogin = async (req, res) => {
  try {
    let user = await userService.getTokenLogin(res, req.body);
    return res.status(200).json(user);
  } catch (e) {
    console.log(e);
  }
}

module.exports = {
  handleLogin: handleLogin,
  getAllUser: getAllUser,
  createUser: createUser,
  editUser: editUser,
  deleteUser: deleteUser,
  requestRefreshToken: requestRefreshToken,
  logOut: logOut,
  getTokenLogin: getTokenLogin,
};
