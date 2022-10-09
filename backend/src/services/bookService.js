import db from "../models/index";
import { Op } from "sequelize";

let getAllBook = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let book = await db.Book.findAll({
        include: [
          {
            model: db.Category,
            as: "categoryData",
          },
        ],
        raw: true,
        nest: true,
      });

      resolve(book);
    } catch (e) {
      reject(e);
    }
  });
};

let createBook = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.Book.create({
        name: data.name,
        author: data.author,
        categoryId: data.categoryId,
        amount: data.amount,
        image: data.image,
      });
      resolve({
        errCode: 0,
        message: "Tạo sách công",
      });
    } catch (e) {
      reject(e);
    }
  });
};

let getBookByCategory = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = [];
      if (id != 0) {
        user = await db.Book.findAll({
          where: {
            categoryId: id,
            amount: {
              [Op.gt]: 0
            }
          },
          include: [
            {
              model: db.Category,
              as: "categoryData",
            },
          ],
          raw: true,
          nest: true,
        });
      } else {
        user = await db.Book.findAll({
          where: {
            amount: {
              [Op.gt]: 0
            }
          },
          include: [
            {
              model: db.Category,
              as: "categoryData",
            },
          ],
          raw: true,
          nest: true,
        });
      }
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

let editBook = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 2,
          message: "Thiếu thông số đầu vào!",
        });
      }
      let book = await db.Book.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (book) {
        book.name = data.name;
        book.author = data.author;
        book.categoryId = data.categoryId;
        book.amount = data.amount;
        book.image = data.image;

        await book.save();
        resolve({
          errCode: 0,
          message: "Cập nhật sách thành công!",
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

let deleteBook = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let book = await db.Book.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (book) {
        await book.destroy();
        resolve({
          errCode: 0,
          message: "Sách đã bị xóa",
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

module.exports = {
  getAllBook: getAllBook,
  createBook: createBook,
  editBook: editBook,
  deleteBook: deleteBook,
  getBookByCategory: getBookByCategory,
};
