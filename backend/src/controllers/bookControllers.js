import bookService from "../services/bookService";

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
  try {
    let book = await bookService.createBook(req.body);
    return res.status(200).json(book);
  } catch (e) {
    console.log(e);
  }
};

let editBook = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      message: "Thiếu thông số đầu vào!",
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
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      message: "Thiếu thông số đầu vào!",
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
