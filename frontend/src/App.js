import "./App.css";
import "antd/dist/antd.css";
import Login from "./components/Login";
import Register from "./components/Login/Register";
import LibraryBook from "./components/LibraryBook/UI/index";
import Admin from "./components/Admin/Home/index";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./Context/AuthProvider";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<LibraryBook />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
