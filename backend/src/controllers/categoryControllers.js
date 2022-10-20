import categoryService from "../services/categoryService";
import { categoryEditInput, categoryDeleteInput, categoryCreateInput } from "../Validate";
import Validator from "fastest-validator";

let getAllCat = async (req, res) => {
  try {
    let cats = await categoryService.getAllCat();
    return res.status(200).json({
      errCode: 0,
      message: "Ok!",
      cats,
    });
  } catch (e) {
    console.log(e);
  }
};

let createCat = async (req, res) => {
  let v = new Validator();
  let validationResponse = v.validate(req.body, categoryCreateInput)

  if (validationResponse !== true) {
    return res.status(400).json({
      errCode: validationResponse,
      message: "Validation failed!",
    });
  }
  try {
    let cat = await categoryService.createCat(req.body);
    return res.status(200).json(cat);
  } catch (e) {
    console.log(e);
  }
};

let editCat = async (req, res) => {
  let v = new Validator();
  let validationResponse = v.validate(req.body, categoryEditInput)

  if (validationResponse !== true) {
    return res.status(400).json({
      errCode: validationResponse,
      message: "Validation failed!",
    });
  }
  try {
    let cat = await categoryService.editCat(req.body);
    return res.status(200).json(cat);
  } catch (e) {
    console.log(e);
  }
};

let deleteCat = async (req, res) => {
  let v = new Validator();
  let validationResponse = v.validate(req.body, categoryDeleteInput)

  if (validationResponse !== true) {
    return res.status(400).json({
      errCode: validationResponse,
      message: "Validation failed!",
    });
  }
  try {
    let cat = await categoryService.deleteCat(req.body);
    return res.status(200).json(cat);
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  getAllCat: getAllCat,
  createCat: createCat,
  editCat: editCat,
  deleteCat: deleteCat,
};
