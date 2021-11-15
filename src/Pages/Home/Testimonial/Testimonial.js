import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ReactStars from "react-rating-stars-component";
import Spinner from "../../Shared/Spinner/Spinner";

const Testimonial = () => {
  const [allReviews, setAllReviews] = useState([]);
  const [isReviewLoading, setIsReviewLoading] = useState(true);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  useEffect(() => {
    setIsReviewLoading(true);
    fetch("https://fierce-bastion-00988.herokuapp.com/reviews")
      .then((res) => res.json())
      .then((data) => {
        setAllReviews(data.reviews);
      })

      .finally(() => {
        setIsReviewLoading(false);
      });
  }, []);

  return (
    <div
      className="review_container py-3"
      style={{ backgroundColor: "#BD884A", marginBottom: "200px" }}
    >
      <h5 className="text-center text-uppercase custom_letter_spacing text-light mb-1">
        Happy Customers
      </h5>
      <h1 className="text-center text-light pt-1">Testimonial</h1>
      <div className="container position-relative" style={{ top: "70px" }}>
        {isReviewLoading ? (
          <Spinner />
        ) : (
          <div className="row">
            <Slider {...settings} className="custom_slider">
              {allReviews.map((review) => (
                <div key={review._id} className="">
                  <div className="slider_item p-3">
                    <img
                      src={review.userPhoto}
                      alt=""
                      style={{
                        width: "80px",
                        height: "80px",
                        borderRadius: "50%",
                      }}
                      className="mt-1 mb-2 mx-auto"
                    />
                    <div className="text-center">
                      <p className="text-capitalize text-muted">
                        {review.name || "Annonymous"}
                      </p>
                      <p>{review.feedbackText}</p>
                      <div className="d-flex justify-content-center">
                        <ReactStars
                          value={parseFloat(review.rating)}
                          size={24}
                          isHalf={true}
                          emptyIcon={<i className="far fa-star"></i>}
                          halfIcon={<i className="fa fa-star-half-alt"></i>}
                          fullIcon={<i className="fa fa-star"></i>}
                          activeColor="#ffd700"
                          edit={false}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        )}
      </div>
    </div>
  );
};

export default Testimonial;
