import React, { useRef } from "react";
import "./Login.css";
import { FcGoogle } from "react-icons/fc";
import { Link, useHistory, useLocation } from "react-router-dom";
import useContextAPI from "../../Hooks/useContextAPI";

const Login = () => {
  const history = useHistory();
  const location = useLocation();
  const { googleSignIn, logInUserWithEmail, userLoading } = useContextAPI();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSignSubmit = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    logInUserWithEmail(email, password, location, history);
  };

  const signInWIthGoogle = () => {
    const redirectURL = location?.state?.from?.pathname || "/";
    googleSignIn()
      .then((res) => {
        console.log(res);
        history.push(redirectURL);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <section className="mt-3">
        <div className="container">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black" style={{ borderRadius: "25px" }}>
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                        Login
                      </p>

                      <form
                        className="mx-1 mx-md-4"
                        onSubmit={handleSignSubmit}
                      >
                        <div className="d-flex flex-row align-items-center mb-2">
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="email"
                              id="form3Example3c"
                              className="form-control"
                              ref={emailRef}
                              required
                            />
                            <label
                              className="form-label"
                              htmlFor="form3Example3c"
                            >
                              Your Email
                            </label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-2">
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="password"
                              id="form3Example4c"
                              className="form-control"
                              ref={passwordRef}
                              required
                            />
                            <label
                              className="form-label"
                              htmlFor="form3Example4c"
                            >
                              Password
                            </label>
                          </div>
                        </div>

                        <div className="d-flex justify-content-center mb-3 mb-lg-4">
                          <button
                            type="submit"
                            className="btn btn-outline-dark custom_btn w-100"
                          >
                            Login
                          </button>
                        </div>
                        <p className="mt-3">
                          Don't have an account?{" "}
                          <Link to="/register">Register here</Link>
                        </p>

                        <div className="divider d-flex align-items-center my-3">
                          <p className="text-center fw-bold mx-3 mb-0 text-muted">
                            OR
                          </p>
                        </div>
                      </form>
                      <button
                        className="btn btn-outline-info w-100 justify-content-center btn-block d-flex align-items-center"
                        onClick={signInWIthGoogle}
                      >
                        <FcGoogle className="me-2" />
                        Continue with Google
                      </button>
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <img
                        src="https://mdbootstrap.com/img/Photos/new-templates/bootstrap-registration/draw1.png"
                        className="img-fluid"
                        alt="Sample image"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
