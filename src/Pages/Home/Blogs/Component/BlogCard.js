import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineUser, AiOutlineCalendar } from "react-icons/ai";
import Slide from "react-reveal/Slide";

const BlogCard = ({
  image,
  title,
  descriptions,
  _id,
  author,
  createdAt,
  index,
}) => {
  return (
    <Slide bottom duration={1500} delay={index * 200}>
      <div className="col-12 col-md-4 d-flex align-items-stretch mb-3">
        <div className="custom_blog_card">
          <div className="card">
            <img src={image} className="card-img-top" alt={title} />
            <div className="card-body">
              <h5 className="card-title">{title}</h5>
              <div className="d-flex justify-content-between my-3">
                <small className="d-flex align-items-center text-muted">
                  <AiOutlineUser className="me-1" />
                  By {author}
                </small>
                <small className="d-flex align-items-center text-muted">
                  <AiOutlineCalendar className="me-1" />{" "}
                  {new Date(createdAt).toLocaleDateString()}
                </small>
              </div>
              <p className="card-text">{descriptions.substr(0, 100)}...</p>
              <Link
                to={`/blogs/${_id}`}
                className="btn text-decoration-underline text-uppercase pb-1"
              >
                read more
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Slide>
  );
};

export default BlogCard;
