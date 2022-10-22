import "./index.css";
import { auth } from "../../firebase/config";
import { FacebookAuthProvider, GoogleAuthProvider } from "firebase/auth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../../Context/AuthProvider";
import { ToastContainer, toast } from "react-toastify";
import { handleLoginService, getTokenLoginService } from "../../service/userService";

const fbProvider = new FacebookAuthProvider();
const ggProvider = new GoogleAuthProvider();

export default function Login({ setCheckLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { user, setUser, setAccessToken, setRefreshToken } = UserAuth();

  const handleSubmit = async () => {
    const data = await handleLoginService(email, password);
    if (data) {
      setAccessToken(data.accessToken);
      setRefreshToken(data.refreshToken);
      if (data.user.providerId === "admin" && data.errCode === 0) {
        setUser(data.user);
        navigate("/admin");
        setCheckLogin(true);
        return;
      } else if (data && data.errCode === 0) {
        setUser(data.user);
        navigate("/");
        setCheckLogin(true);
        return;
      }
    }
    toast.error(data.message);
  };

  const handleFbLogin = async () => {
    setError("");
    try {
      await auth.signInWithPopup(fbProvider);
      const data = await getTokenLoginService(user);
      if (data) {
        setAccessToken(data.accessToken);
        setRefreshToken(data.refreshToken);
      }
      navigate("/");
      setCheckLogin(true);
    } catch (e) {
      setError(e.message);
      console.log(e.message);
      toast.error(e.message);
    }
  };

  const handleGgLogin = async () => {
    setError("");
    try {
      await auth.signInWithPopup(ggProvider);
      const data = await getTokenLoginService(user);
      if (data) {
        setAccessToken(data.accessToken);
        setRefreshToken(data.refreshToken);
      }
      navigate("/");
      setCheckLogin(true);
    } catch (e) {
      setError(e.message);
      console.log(e.message);
      toast.error(e.message);
    }
  };

  return (
    <div className="login">
      <section className="vh-100 gradient-custom">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div
                className="card bg-dark text-white"
                styles="border-radius: 1rem;"
              >
                <div className="card-body p-5 text-center">
                  <div className="mb-md-5 mt-md-4 pb-5">
                    <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                    <p className="text-white-50 mb-5">
                      Please enter your login and password!
                    </p>

                    <div className="form-outline form-white mb-4">
                      <input
                        type="email"
                        id="typeEmailX"
                        className="form-control form-control-lg"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <label
                        className="form-label"
                        htmlFor="typeEmailX"
                        styles="margin-left: 0px;"
                      >
                        Email
                      </label>
                      <div className="form-notch">
                        <div
                          className="form-notch-leading"
                          styles="width: 9px;"
                        ></div>
                        <div
                          className="form-notch-middle"
                          styles="width: 40px;"
                        ></div>
                        <div className="form-notch-trailing"></div>
                      </div>
                    </div>

                    <div className="form-outline form-white mb-4">
                      <input
                        type="password"
                        id="typePasswordX"
                        className="form-control form-control-lg"
                        onChange={(e) => setPassword(e.target.value)}
                      />{" "}
                      <label
                        className="form-label"
                        htmlFor="typePasswordX"
                        styles="margin-left: 0px;"
                      >
                        Password
                      </label>
                      <div className="form-notch">
                        <div
                          className="form-notch-leading"
                          styles="width: 9px;"
                        ></div>
                        <div
                          className="form-notch-middle"
                          styles="width: 40px;"
                        ></div>
                        <div className="form-notch-trailing"></div>
                      </div>
                    </div>

                    <button
                      className="btn btn-outline-light btn-lg px-5"
                      type="submit"
                      onClick={handleSubmit}
                    >
                      Login
                    </button>
                    <ToastContainer />
                    <div className="d-flex justify-content-center text-center mt-4 pt-1">
                      <a onClick={handleFbLogin} className="text-white">
                        <i className="fab fa-facebook-f fa-lg"></i>
                      </a>
                      <a href="#!" className="text-white">
                        <i className="fab fa-twitter fa-lg mx-4 px-2"></i>
                      </a>
                      <a onClick={handleGgLogin} className="text-white">
                        <i className="fab fa-google fa-lg"></i>
                      </a>
                    </div>
                  </div>

                  <div>
                    <p className="mb-0">
                      Don't have an account?{" "}
                      <Link to="/register"> Sign Up</Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
