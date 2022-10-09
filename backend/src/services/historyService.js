import db from "../models/index";

let getAllHistory = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let his = await db.History.findAll({
        include: [
          {
            model: db.Book,
            as: "bookData",
          },
          {
            model: db.User,
            as: "userData",
          },
        ],
        raw: true,
        nest: true,
      });

      resolve(his);
    } catch (e) {
      reject(e);
    }
  });
};

let getAllHistoryByUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let his = await db.History.findAll({
        where: { userId: id },
        include: [
          {
            model: db.Book,
            as: "bookData",
          },
        ],
        raw: true,
        nest: true,
      });

      resolve(his);
    } catch (e) {
      reject(e);
    }
  });
};

let borrowBook = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let d = new Date();

      let year = d.getFullYear();
      let month = d.getMonth() + 1;
      let day = d.getDate();

      if (!data.bookId) {
        resolve({
          errCode: 2,
          message: "Thiếu thông số đầu vào!",
        });
      }
      let book = await db.Book.findOne({
        where: { id: data.bookId },
        raw: false,
      });
      if (book) {
        book.amount = book.amount - 1;

        await book.save();
        await db.History.create({
          userId: data.userId,
          bookId: data.bookId,
          borrowedDate: day + "/" + month + "/" + year,
          returnDate: "",
          status: "Đang mượn",
        });
        resolve({
          errCode: 0,
          message: "Mượn sách thành công",
        });
      } else {
        resolve({
          errCode: 2,
          message: `Không tìm thấy sách`,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let returnBook = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let d = new Date();

      let year = d.getFullYear();
      let month = d.getMonth() + 1;
      let day = d.getDate();
      if (!data.userId || !data.bookId) {
        resolve({
          errCode: 2,
          message: "Thiếu thông số đầu vào!",
        });
      }
      let book = await db.Book.findOne({
        where: { id: data.bookId },
        raw: false,
      });
      if (book) {
        book.amount = book.amount + 1;
        await book.save();
      } else {
        resolve({
          errCode: 2,
          message: `Không tìm thấy sách`,
        });
      }
      let his = await db.History.findOne({
        where: {
          userId: data.userId,
          bookId: data.bookId,
          status: "Đang mượn",
        },
        raw: false,
      });
      if (his) {
        his.returnDate = day + "/" + month + "/" + year;
        his.status = "Đã trả";
        await his.save();

        resolve({
          errCode: 0,
          message: "Bạn đã trả sách thành công!",
        });
      } else {
        resolve({
          errCode: 1,
          message: "Error!",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getAllHistory: getAllHistory,
  getAllHistoryByUser: getAllHistoryByUser,
  borrowBook: borrowBook,
  returnBook: returnBook,
};
