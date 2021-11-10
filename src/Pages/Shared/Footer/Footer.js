import React from "react";
import { AiFillHome, AiOutlinePhone } from "react-icons/ai";
import { FaRegEnvelope, FaFacebookF, FaPinterestP } from "react-icons/fa";
import { BsTwitter } from "react-icons/bs";
import { ImGooglePlus } from "react-icons/im";
import { FiSend } from "react-icons/fi";
const Footer = () => {
  return (
    <footer className="footer-container mt-5">
      <div className="container">
        <div className="row g-4">
          <section className="col-12 col-md-3">
            <div className="footer-content">
              <h5 className="mb-3 custom_base_color">CONTACT US</h5>
              <p className="mb-1">
                <AiFillHome className="me-1" /> 1720, Jamalpur Sadar, Jamalpur,
                Mymensing
              </p>
              <p className="mb-1">
                <AiOutlinePhone className="me-1" /> +8801712942637
              </p>
              <p className="mb-1">
                <FaRegEnvelope className="me-1" /> mdsagar333@gmail.com
              </p>
            </div>
          </section>
          <section className="col-12 col-md-3 custom_border">
            <div className="footer-content">
              <h5 className="mb-3 custom_base_color">SHARE WITH US</h5>
              <p>Special offers on social networks</p>
              <div className="social-icons-container">
                <a href="" className="btn btn-outline-dark mx-1">
                  <FaFacebookF />
                </a>
                <a href="" className="btn btn-outline-dark mx-1">
                  <FaPinterestP />
                </a>
                <a href="" className="btn btn-outline-dark mx-1">
                  <ImGooglePlus />
                </a>
                <a href="" className="btn btn-outline-dark mx-1">
                  <BsTwitter />
                </a>
              </div>
            </div>
          </section>
          <section className="col-12 col-md-3">
            <div className="footer-content">
              <h5 className="mb-3 custom_base_color">NEWSLETTER</h5>
              <p>Subscribe our newsletter</p>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Email Address"
                  aria-label="Email Address"
                  aria-describedby="button-addon2"
                />
                <button
                  className="btn btn-outline-dark"
                  type="button"
                  id="button-addon2"
                >
                  <FiSend />
                </button>
              </div>
            </div>
          </section>
          <section className="col-12 col-md-3">
            <div className="footer-content">
              <h5 className="mb-3 custom_base_color">#INSTAGRAM</h5>
              <p>Our instagram gallery</p>
            </div>
          </section>
        </div>
      </div>
      <section className="footer-quote text-center my-4">
        <p>
          Life is made up of two things Time and Love.Time is free but it is
          priceless. As Carl Sandburg-
          <br />
          <q>
            Time is the coin of your life. It is the only coin you have, and
            only you can determine how it will be spent. Be careful lest you let
            other people spend it for you.
          </q>
        </p>
      </section>
      <section className="footer-bottom bg-dark text-light p-2">
        <p className="text-center text-capitalize mb-0">
          copyrights &copy; 2021. This sites developed by Mohammed Sagar Ali.
        </p>
      </section>
    </footer>
  );
};

export default Footer;
