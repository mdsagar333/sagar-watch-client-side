import axios from "axios";
import React, { useRef, useState } from "react";
import productImg from "../../../images/addProduct.png";

const AddProduct = () => {
  const [isSavingPro, setIsSavingPro] = useState(false);
  const [serverResponse, setServerResponse] = useState("");
  const nameRef = useRef();
  const priceRef = useRef();
  const brandRef = useRef();
  const featureRef = useRef();
  const imageRef = useRef();
  const descriptionRef = useRef();

  const handleAddProduct = (e) => {
    e.preventDefault();
    setIsSavingPro(true);
    setServerResponse("");
    const feature = featureRef.current.value.split(",");
    const prodcutData = {
      name: nameRef.current.value,
      price: priceRef.current.value,
      brand: brandRef.current.value,
      image: imageRef.current.files[0],
      description: descriptionRef.current.value,
      feature,
    };

    let formData = new FormData();

    formData.append("name", prodcutData.name);
    formData.append("price", prodcutData.price);
    formData.append("brand", prodcutData.brand);
    formData.append("image", prodcutData.image);
    formData.append("description", prodcutData.description);
    formData.append("feature", JSON.stringify(prodcutData.feature));

    axios
      .post("http://127.0.0.1:5000/products", formData, {
        headers: { "content-type": "multipart/form-data" },
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsSavingPro(false);
        setServerResponse("Product added successfully");
      });
    // fetch("http://127.0.0.1:5000/products", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "aplication/json",
    //   },
    //   body: JSON.stringify({ ...prodcutData }),
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log(data);
    //     setServerResponse("Product added successfully");
    //   })
    //   .finally(() => {
    //     setIsSavingPro(false);
    //   });
  };
  return (
    <div className="addProduct_container">
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-6">
            <h1>Add a Product</h1>
            <form onSubmit={handleAddProduct}>
              {serverResponse !== "" ? (
                <p className="alert alert-success">{serverResponse}</p>
              ) : null}
              <div className="row">
                <div className="col-12 col-md-6">
                  <div className="mb-2">
                    <label htmlFor="nameID" className="form-label">
                      Watch Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="nameID"
                      placeholder="Name"
                      ref={nameRef}
                      required
                    />
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="mb-2">
                    <label htmlFor="priceID" className="form-label">
                      Watch Price
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="priceID"
                      placeholder="Price"
                      ref={priceRef}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="mb-2">
                <label htmlFor="brandID" className="form-label">
                  Watch Brand
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="brandID"
                  placeholder="Brand name"
                  ref={brandRef}
                  required
                />
              </div>
              <div className="mb-2">
                <label htmlFor="featureID" className="form-label">
                  Watch Feature
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="featureID"
                  placeholder="Comma separated value. Like feature 1, feature 2"
                  ref={featureRef}
                  required
                />
              </div>
              <div className="mb-2">
                <label htmlFor="imageID" className="form-label">
                  Image
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="imageID"
                  placeholder="Image link"
                  ref={imageRef}
                  required
                />
              </div>
              <div className="mb-2">
                <label htmlFor="descriptionID" className="form-label">
                  Watch Description
                </label>
                <textarea
                  className="form-control"
                  id="descriptionID"
                  rows="3"
                  placeholder="Description about product"
                  ref={descriptionRef}
                  required
                ></textarea>
              </div>
              <button className="btn btn-outline-dark mt-3">
                {isSavingPro ? (
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                ) : (
                  "Add Product"
                )}
              </button>
            </form>
          </div>
          <div className="col-12 col-md-6">
            <img src={productImg} alt="" className="img-fluid" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
