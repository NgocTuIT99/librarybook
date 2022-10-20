import historyService from "../services/historyService";
import { historyGetAllInput, historyBorrowBookInput, historyReturnBookInput } from "../Validate";
import Validator from "fastest-validator";

let getAllHistory = async (req, res) => {
  try {
    let his = await historyService.getAllHistory();
    return res.status(200).json({
      errCode: 0,
      message: "Ok!",
      his,
    });
  } catch (e) {
    console.log(e);
  }
};

let getAllHistoryByUser = async (req, res) => {
  let v = new Validator();
  let validationResponse = v.validate(req.query, historyGetAllInput)

  if (validationResponse !== true) {
    return res.status(400).json({
      errCode: validationResponse,
      message: "Validation failed!",
    });
  }
  try {
    let his = await historyService.getAllHistoryByUser(req.query.id);
    return res.status(200).json({
      errCode: 0,
      message: "Ok!",
      his,
    });
  } catch (e) {
    console.log(e);
  }
};

let borrowBook = async (req, res) => {
  let v = new Validator();
  let validationResponse = v.validate(req.body, historyBorrowBookInput)

  if (validationResponse !== true) {
    return res.status(400).json({
      errCode: validationResponse,
      message: "Validation failed!",
    });
  }
  try {
    let data = await historyService.borrowBook(req.body);
    return res.status(200).json(data);
  } catch (e) {
    console.log(e);
  }
};

let returnBook = async (req, res) => {
  let v = new Validator();
  let validationResponse = v.validate(req.body, historyReturnBookInput)

  if (validationResponse !== true) {
    return res.status(400).json({
      errCode: validationResponse,
      message: "Validation failed!",
    });
  }
  try {
    let data = await historyService.returnBook(req.body);
    return res.status(200).json(data);
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  getAllHistory: getAllHistory,
  getAllHistoryByUser: getAllHistoryByUser,
  borrowBook: borrowBook,
  returnBook: returnBook,
};
