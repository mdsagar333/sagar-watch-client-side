import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

import { AiOutlineUser, AiOutlineCalendar } from "react-icons/ai";

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState({});
  const [isBlogLoading, setIsBlogLoading] = useState(true);

  useEffect(() => {
    setIsBlogLoading(true);
    const url = `https://fierce-bastion-00988.herokuapp.com/blogs/${id}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setBlog(data.blog);
      })
      .finally(() => {
        setIsBlogLoading(false);
      });
  }, []);
  return (
    <div className="blogsDetails_container">
      <div className="title_banner d-flex justify-content-center align-items-center">
        <div>
          <h1 className="text-light text-center text-capitalize">Our blogs</h1>
          <h5 className="text-light text-center">{blog.title}</h5>
        </div>
      </div>
      <div className="blog_content container">
        <img src={blog.image} alt={blog.title} className="img-fluid my-5" />
        <div className="row">
          <div className="col-12 col-md-6">
            <h2>{blog.title}</h2>
            <div className="d-flex justify-content-between my-3">
              <small className="d-flex align-items-center text-muted">
                <AiOutlineUser className="me-1" />
                By {blog.author}
              </small>
              <small className="d-flex align-items-center text-muted">
                <AiOutlineCalendar className="me-1" />{" "}
                {new Date(blog.createdAt).toLocaleDateString()}
              </small>
            </div>
          </div>
          <div className="col-12 col-md-3"></div>
          <div className="col-0 col-md-3"></div>
        </div>
        <p className="mb-5 custom_letter_spacing">{blog.descriptions}</p>
      </div>
    </div>
  );
};

export default BlogDetails;
