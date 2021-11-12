import React, { useEffect, useState } from "react";
import useContextAPI from "../../../Hooks/useContextAPI";
import feedback from "../../../images/feedback.jpg";
const MyReview = () => {
  const { user } = useContextAPI();
  const [userFeedback, setUserFeedback] = useState({
    feedbackText: "",
    rating: 1,
  });
  const [ratingError, setRatingError] = useState("");
  console.log(user.displayName);
  useEffect(() => {
    setUserFeedback({ ...userFeedback, name: user.displayName });
  }, []);

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    console.log(userFeedback);
    setRatingError("");
    if (userFeedback.rating > 5 || userFeedback < 1) {
      setRatingError("Please enter your rating between 1-5");
      return;
    }
    fetch("http://127.0.0.1:5000/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...userFeedback }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };
  const handleOnChangeFeedback = (e) => {
    setUserFeedback({ ...userFeedback, [e.target.name]: e.target.value });
  };
  return (
    <div className="feedback_container">
      <div className="container">
        <h1 className="text-center text-capitalize">feedback</h1>
        <div className="row d-flex align-items-center">
          <div className="col-12 col-md-6">
            <form onSubmit={handleFeedbackSubmit}>
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
                  value={userFeedback.name || ""}
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
                  placeholder="Enter your feedback"
                  onChange={handleOnChangeFeedback}
                  name="feedbackText"
                ></textarea>
              </div>
              <button className="btn btn-outline-dark" type="submit">
                submit
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
