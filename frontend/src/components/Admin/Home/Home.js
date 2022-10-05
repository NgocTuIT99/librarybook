import React from "react";
import UserManage from "../UserManage/UserManage";
import BookManage from "../BookManage/BookManage";
import CategoryManage from "../CategoryManage/CategoryManage";
import History from "../History/History";
import { UserAuth } from "../../../Context/AuthProvider";

export default function Home() {
  const formManage = () => {
    switch (selectedForm) {
      case "1":
        return <UserManage />;
      case "2":
        return <BookManage />;
      case "3":
        return <CategoryManage />;
      case "4":
        return <History />;
      default:
        return <UserManage />;
    }
  };

  const { selectedForm } = UserAuth();

  return <div>{formManage()}</div>;
}
