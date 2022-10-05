import express from "express";
import userController from "../controllers/userControllers";
import bookController from "../controllers/bookControllers";
import categoryController from "../controllers/categoryControllers";
import historyController from "../controllers/historyControllers";

let router = express.Router();
let initWebRoutes = (app) => {
  router.post("/api/login", userController.handleLogin);
  router.get("/api/get-all-user", userController.getAllUser);
  router.post("/api/create-user", userController.createUser);
  router.put("/api/edit-user", userController.editUser);
  router.delete("/api/delete-user", userController.deleteUser);

  router.get("/api/get-all-book", bookController.getAllBook);
  router.get("/api/get-all-book-by-category", bookController.getBookByCategory);
  router.post("/api/create-book", bookController.createBook);
  router.put("/api/edit-book", bookController.editBook);
  router.delete("/api/delete-book", bookController.deleteBook);

  router.get("/api/get-all-category", categoryController.getAllCat);
  router.post("/api/create-category", categoryController.createCat);
  router.put("/api/edit-category", categoryController.editCat);
  router.delete("/api/delete-category", categoryController.deleteCat);

  router.get("/api/get-all-history", historyController.getAllHistory);
  router.get(
    "/api/get-all-history-by-user",
    historyController.getAllHistoryByUser
  );
  router.post("/api/borrow-book", historyController.borrowBook);
  router.post("/api/return-book", historyController.returnBook);

  return app.use("/", router);
};

module.exports = initWebRoutes;
