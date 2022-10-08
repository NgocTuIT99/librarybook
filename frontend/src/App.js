import "./App.css";
import "antd/dist/antd.css";
import React, { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Login/Register";
import LibraryBook from "./components/LibraryBook/UI/index";
import Admin from "./components/Admin/Home/index";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./Context/AuthProvider";

function App() {
  const [checkLogin, setCheckLogin] = useState(false);

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route
            path="/login"
            element={<Login setCheckLogin={setCheckLogin} />}
          />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<LibraryBook checkLogin={checkLogin} />} />
          <Route path="/admin" element={<Admin checkLogin={checkLogin} />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
