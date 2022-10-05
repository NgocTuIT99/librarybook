import React from "react";
import ProductList from "./ProductList";
import { UserAuth } from "../../../Context/AuthProvider";
import History from "../History/History";
import Navbar from "./Navbar";
import Announcement from "./Announcement";

export default function LibraryBook() {
  const { selectedForm } = UserAuth();

  return (
    <div>
      <Navbar />
      <Announcement />
      {selectedForm === "1" ? <History /> : <ProductList />}
    </div>
  );
}
