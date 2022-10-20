import bookService from "../services/bookService";
import { bookCreateInput, bookGetAllInput, bookEditInput, bookDeleteInput } from "../Validate";
import Validator from "fastest-validator";

let getAllBook = async (req, res) => {
  try {
    let books = await bookService.getAllBook();
    return res.status(200).json({
      errCode: 0,
      message: "Ok!",
      books,
    });
  } catch (e) {
    console.log(e);
  }
};

let getBookByCategory = async (req, res) => {
  let v = new Validator();
  let validationResponse = v.validate(req.query, bookGetAllInput)

  if (validationResponse !== true) {
    return res.status(400).json({
      errCode: validationResponse,
      message: "Validation failed!",
    });
  }
  try {
    let books = await bookService.getBookByCategory(req.query.id);
    return res.status(200).json({
      errCode: 0,
      message: "Ok!",
      books,
    });
  } catch (e) {
    console.log(e);
  }
};

let createBook = async (req, res) => {
  let v = new Validator();
  let validationResponse = v.validate(req.body, bookCreateInput)

  if (validationResponse !== true) {
    return res.status(400).json({
      errCode: validationResponse,
      message: "Validation failed!",
    });
  }
  try {
    let book = await bookService.createBook(req.body);
    return res.status(200).json(book);
  } catch (e) {
    console.log(e);
  }
};

let editBook = async (req, res) => {
  let v = new Validator();
  let validationResponse = v.validate(req.body, bookEditInput)

  if (validationResponse !== true) {
    return res.status(400).json({
      errCode: validationResponse,
      message: "Validation failed!",
    });
  }
  try {
    let book = await bookService.editBook(req.body);
    return res.status(200).json(book);
  } catch (e) {
    console.log(e);
  }
};

let deleteBook = async (req, res) => {
  let v = new Validator();
  let validationResponse = v.validate(req.body, bookDeleteInput)

  if (validationResponse !== true) {
    return res.status(400).json({
      errCode: validationResponse,
      message: "Validation failed!",
    });
  }
  try {
    let book = await bookService.deleteBook(req.body);
    return res.status(200).json(book);
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  getAllBook: getAllBook,
  createBook: createBook,
  editBook: editBook,
  deleteBook: deleteBook,
  getBookByCategory: getBookByCategory,
};
