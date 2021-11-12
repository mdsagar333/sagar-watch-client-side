import React, { useRef } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import useContextAPI from "../../Hooks/useContextAPI";

const Register = () => {
  const { googleSignIn, createUserWithEmail, authError } = useContextAPI();
  const history = useHistory();
  const location = useLocation();
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    createUserWithEmail(email, password, name, history);
  };

  const signInWithGoogle = () => {
    const redirectURL = location?.state?.from?.pathname || "/";
    googleSignIn()
      .then((res) => {
        const result = res.user;
        const uid = result.uid;
        console.log(uid, "google sign in");
        fetch("http://127.0.0.1:5000/users", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: result.displayName,
            email: result.email || "",
            userUID: uid,
          }),
        })
          .then((res) => res.json())
          .then((data) => console.log(data));
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
                        Register
                      </p>

                      <form
                        className="mx-1 mx-md-4"
                        onSubmit={handleRegisterSubmit}
                      >
                        {authError.length > 0 && (
                          <h6 className="text-danger">{authError}</h6>
                        )}
                        <div className="d-flex flex-row align-items-center mb-1">
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="text"
                              id="form3Example1c"
                              className="form-control"
                              ref={nameRef}
                              required
                            />
                            <label
                              className="form-label"
                              htmlFor="form3Example1c"
                            >
                              Your Name
                            </label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-1">
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

                        <div className="d-flex flex-row align-items-center mb-1">
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

                        <div className="form-check d-flex justify-content-center mb-3">
                          <input
                            className="form-check-input me-2"
                            type="checkbox"
                            value=""
                            id="form2Example3c"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="form2Example3"
                          >
                            I agree all statements in{" "}
                            <a href="#!">Terms of service</a>
                          </label>
                        </div>

                        <div className="d-flex justify-content-center  mb-3 mb-lg-4">
                          <button
                            type="submit"
                            className="btn btn-outline-dark w-100 custom_btn"
                          >
                            Register
                          </button>
                        </div>
                        <p className="mt-3">
                          Already have an account?{" "}
                          <Link to="/login">Login here</Link>
                        </p>

                        <div className="divider d-flex align-items-center my-2">
                          <p className="text-center fw-bold mx-3 mb-0 text-muted">
                            OR
                          </p>
                        </div>
                      </form>
                      <button
                        className="btn btn-outline-info w-100 justify-content-center btn-block d-flex align-items-center"
                        onClick={signInWithGoogle}
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

export default Register;
