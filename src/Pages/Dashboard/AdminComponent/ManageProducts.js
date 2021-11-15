import React, { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import Spinner from "../../Shared/Spinner/Spinner";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [serverResponse, setServerResponse] = useState("");
  const [productLoading, setProductLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [confirmId, setConfirmId] = useState("");
  const [isNeedToUpdate, setIsNeedToUpdate] = useState(0);

  const handleAction = (id) => {
    setConfirmId(id);
    setShowModal(true);
  };

  const handleConfirmAction = () => {
    setShowModal(false);
    setServerResponse("");
    const url = `https://fierce-bastion-00988.herokuapp.com/products/${confirmId}`;
    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status === "success") {
        }
      })
      .finally(() => {
        setIsNeedToUpdate(isNeedToUpdate + 1);
        setServerResponse("Product removed successfully.");
      });
  };

  useEffect(() => {
    setProductLoading(true);
    fetch("https://fierce-bastion-00988.herokuapp.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
      })
      .finally(() => {
        setProductLoading(false);
      });
  }, [isNeedToUpdate]);
  return (
    <div className="manage_products_container">
      <h1 className="mb-4 text-center">Manage Products</h1>
      {serverResponse.length > 0 ? (
        <p className="alert alert-success">{serverResponse}</p>
      ) : null}
      {productLoading ? (
        <Spinner />
      ) : (
        <table className="table">
          <thead class="table-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Product Name</th>
              <th scope="col">Price</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product._id}>
                <th scope="row">{index + 1}</th>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>
                  <button
                    className="btn"
                    style={{ display: "inline-block", padding: "0px" }}
                  >
                    <AiFillDelete
                      className="text-danger"
                      style={{
                        cursor: "pointer",
                        fontSize: "22px",
                        margin: "0 5px",
                      }}
                      onClick={() => handleAction(product._id)}
                    ></AiFillDelete>
                  </button>
                  <Link
                    to={`/update-product/${product._id}`}
                    className="btn"
                    style={{ display: "inline-block", padding: "0px" }}
                  >
                    <FaRegEdit
                      className="text-primary"
                      style={{
                        cursor: "pointer",
                        fontSize: "22px",
                        margin: "0 5px",
                      }}
                    />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {/* modal */}
      <div className={`${showModal ? "d-block" : "d-none"} custom_modal`}>
        <div className="d-flex justify-content-center align-items-center">
          <div className="modal_content p-3 mt-5">
            <h3>Are you sure? You want to delete?</h3>
            <div className="d-flex justify-content-end">
              <div className="modal_btn_container mt-5">
                <button
                  className="btn btn-outline-dark me-2"
                  onClick={handleConfirmAction}
                >
                  Confirm{" "}
                </button>
                <button
                  className="btn btn-outline-dark"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* end of modal */}
    </div>
  );
};

export default ManageProducts;
