import categoryService from "../services/categoryService";

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
  try {
    let cat = await categoryService.createCat(req.body);
    return res.status(200).json(cat);
  } catch (e) {
    console.log(e);
  }
};

let editCat = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      message: "Thiếu thông số đầu vào!",
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
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      message: "Thiếu thông số đầu vào!",
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
