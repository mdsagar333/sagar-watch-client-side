import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import useContextAPI from "../../../Hooks/useContextAPI";
const [isUpdating, setIsUpdating] = useState(false);

const UpdateProduct = () => {
  const { id } = useParams;
  const { watchesData } = useContextAPI();
  const filteredProduct = watchesData.find((product) => product._id === id);

  const [prodductDetails, setProdcutDetails] = useState({ ...filteredProduct });

  const handleUpdateProduct = (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <form onSubmit={handleUpdateProduct}>
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
                name="productName"
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
                name="productPrice"
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
            name="productBrand"
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
            name="Productfeature"
            required
          />
        </div>
        <div className="mb-2">
          <label htmlFor="imageID" className="form-label">
            Image
          </label>
          <input
            type="text"
            className="form-control"
            id="imageID"
            placeholder="Image link"
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
            name="productDescription"
            required
          ></textarea>
        </div>
        <button className="btn btn-outline-dark mt-3">
          {isUpdating ? (
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
          ) : (
            "Update Product"
          )}
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;
