import historyService from "../services/historyService";

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
  try {
    let data = await historyService.borrowBook(req.body);
    return res.status(200).json(data);
  } catch (e) {
    console.log(e);
  }
};

let returnBook = async (req, res) => {
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
