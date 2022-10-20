import db from "../models/index";

let getAllCat = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let cats = await db.Category.findAll({});

      resolve(cats);
    } catch (e) {
      reject(e);
    }
  });
};

let createCat = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.Category.create({
        name: data.name,
        description: data.description,
      });
      resolve({
        errCode: 0,
        message: "Tạo thể loại thành công",
      });
    } catch (e) {
      reject(e);
    }
  });
};

let editCat = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 2,
          message: "Thiếu thông số đầu vào!",
        });
      }
      let cat = await db.Category.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (cat) {
        cat.name = data.name;
        cat.description = data.description;

        await cat.save();
        resolve({
          errCode: 0,
          message: "Cập nhật thể loại thành công!",
        });
      } else {
        resolve({
          errCode: 2,
          message: `Không tìm thấy thể loại này`,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let deleteCat = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(data)
      let cat = await db.Category.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (cat) {
        await cat.destroy();
        resolve({
          errCode: 0,
          message: "Thể loại đã bị xóa",
        });
      } else {
        resolve({
          errCode: 2,
          message: `Không tìm thể loại này`,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getAllCat: getAllCat,
  createCat: createCat,
  editCat: editCat,
  deleteCat: deleteCat,
};
