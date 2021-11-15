import React, { useEffect, useState } from "react";
import useContextAPI from "../../../Hooks/useContextAPI";
import feedback from "../../../images/feedback.jpg";
import Spinner from "../../Shared/Spinner/Spinner";
const MyReview = () => {
  const { user, userLoading } = useContextAPI();
  const [userFeedback, setUserFeedback] = useState({
    feedbackText: "",
    rating: 0,
    name: user.displayName,
  });
  const [serverResponse, setServerResponse] = useState("");
  const [savingReview, setSavingReview] = useState(false);

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    console.log(userFeedback);
    setServerResponse("");

    if (userFeedback.rating > 5 || userFeedback < 1) {
      setServerResponse("Please enter your rating between 1-5");
      return;
    }

    setSavingReview(true);

    fetch("http://127.0.0.1:5000/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...userFeedback,
        userPhoto:
          user.photoURL ||
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status === "fail") {
          setServerResponse(data.error);
        } else {
          setServerResponse("Review added successfully.");
        }
        setSavingReview(false);
      });
  };
  const handleOnChangeFeedback = (e) => {
    setUserFeedback({ ...userFeedback, [e.target.name]: e.target.value });
  };

  // useEffect(() => {
  //   setUserFeedback({ userFeedback, name: user.displayName });
  // }, []);

  if (userLoading) {
    return <Spinner />;
  }

  return (
    <div className="feedback_container">
      <div className="container">
        <h1 className="text-center text-capitalize">feedback</h1>
        <div className="row d-flex align-items-center">
          <div className="col-12 col-md-6">
            <form onSubmit={handleFeedbackSubmit}>
              {serverResponse !== "" ? (
                <p
                  className={
                    serverResponse.endsWith("successfully.")
                      ? "text-success"
                      : "text-danger"
                  }
                >
                  {serverResponse}{" "}
                </p>
              ) : (
                ""
              )}
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleFormControlInput1"
                  name="name"
                  value={userFeedback.name}
                  placeholder=""
                  onChange={handleOnChangeFeedback}
                  required
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Rating
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="Enter your rating"
                  min="1"
                  max="5"
                  name="rating"
                  value={userFeedback.rating}
                  onChange={handleOnChangeFeedback}
                  step="any"
                  required
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlTextarea1"
                  className="form-label"
                >
                  Feedback Message
                </label>
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  value={userFeedback.feedbackText}
                  placeholder="Enter your feedback"
                  onChange={handleOnChangeFeedback}
                  name="feedbackText"
                ></textarea>
              </div>
              <button
                className="btn btn-outline-dark"
                type="submit"
                style={{ minWidth: "120px" }}
              >
                {savingReview ? (
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                ) : (
                  "Submit"
                )}
              </button>
            </form>
          </div>
          <div className="col-12 col-md-6">
            <img src={feedback} alt="feedback image" className="img-fluid" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyReview;
