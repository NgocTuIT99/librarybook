import React, { useState } from "react";
import "./index.css";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { createUserService } from "../../service/userService";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUserName] = useState("");

  const handleSubmit = async () => {
    const data = await createUserService({
      fullName: username,
      email: email,
      password: password,
    });
    if (data && data.errCode === 0) {
      toast.success("Sign Up Success !");
    } else {
      toast.error(data.message);
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
                    <h2 className="fw-bold mb-2 text-uppercase">Sign up</h2>
                    <p className="text-white-50 mb-5">
                      Please enter your login and password!
                    </p>

                    <div className="form-outline form-white mb-4">
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        onChange={(e) => setUserName(e.target.value)}
                      />
                      <label className="form-label" styles="margin-left: 0px;">
                        User name
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
                      Sign up
                    </button>
                    <ToastContainer />
                  </div>

                  <div>
                    <p className="mb-0">
                      Back to page <Link to="/login"> Login</Link>
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
