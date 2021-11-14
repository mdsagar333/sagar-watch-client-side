import React, { useEffect, useState } from "react";
import useContextAPI from "../../../Hooks/useContextAPI";
import Spinner from "../../Shared/Spinner/Spinner";
import BlogCard from "./Component/BlogCard";

const BlogContainer = () => {
  const [allBlogs, setAllBlogs] = useState([]);
  const [isBlogLoading, setIsBlogLoading] = useState(true);

  console.log(allBlogs);
  useEffect(() => {
    setIsBlogLoading(true);
    fetch("http://127.0.0.1:5000/blogs")
      .then((res) => res.json())
      .then((data) => {
        setAllBlogs(data.blogs);
      })
      .finally(() => {
        setIsBlogLoading(false);
      });
  }, []);

  return (
    <div className="container">
      <div className="blog_title text-center my-5">
        <h5 className="text-uppercase custom_letter_spacing mb-0">
          Time is precious Check out now
        </h5>
        <h1 className="text-capitalize my-2">Latest news</h1>
      </div>
      {isBlogLoading ? (
        <Spinner />
      ) : (
        <div className="blog_container">
          <div className="row g-3">
            {allBlogs.map((blog) => (
              <BlogCard key={blog._id} {...blog} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogContainer;