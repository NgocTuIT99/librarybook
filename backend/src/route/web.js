import express from "express";
import userController from "../controllers/userControllers";
import bookController from "../controllers/bookControllers";
import categoryController from "../controllers/categoryControllers";
import historyController from "../controllers/historyControllers";
import { verifyToken } from "../middleware/verifyToken";

let router = express.Router();
let initWebRoutes = (app) => {
  router.post("/api/login", userController.handleLogin);
  //REFRESH TOKEN
  router.post("/api/refresh", userController.requestRefreshToken);
  //LOG OUT
  router.post("/api/logout", verifyToken, userController.logOut);

  router.get("/api/get-all-user", verifyToken, userController.getAllUser);
  router.post("/api/create-user", verifyToken, userController.createUser);
  router.put("/api/edit-user", verifyToken, userController.editUser);
  router.delete("/api/delete-user", verifyToken, userController.deleteUser);
  router.post("/api/get-token-login", userController.getTokenLogin);

  router.get("/api/get-all-book", verifyToken, bookController.getAllBook);
  router.get("/api/get-all-book-by-category", verifyToken, bookController.getBookByCategory);
  router.post("/api/create-book", verifyToken, bookController.createBook);
  router.put("/api/edit-book", verifyToken, bookController.editBook);
  router.delete("/api/delete-book", verifyToken, bookController.deleteBook);

  router.get("/api/get-all-category", verifyToken, categoryController.getAllCat);
  router.post("/api/create-category", verifyToken, categoryController.createCat);
  router.put("/api/edit-category", verifyToken, categoryController.editCat);
  router.delete("/api/delete-category", verifyToken, categoryController.deleteCat);

  router.get("/api/get-all-history", verifyToken, historyController.getAllHistory);
  router.get(
    "/api/get-all-history-by-user", verifyToken,
    historyController.getAllHistoryByUser
  );
  router.post("/api/borrow-book", verifyToken, historyController.borrowBook);
  router.post("/api/return-book", verifyToken, historyController.returnBook);

  return app.use("/", router);
};

module.exports = initWebRoutes;
