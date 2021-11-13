import React, { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import Spinner from "../../Shared/Spinner/Spinner";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [productLoading, setProductLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState({ id: "", action: "" });

  const handleAction = (id, operation) => {
    setConfirmAction({ id, action: operation });
    setShowModal(true);
  };

  const handleConfirmAction = () => {
    setShowModal(false);
  };

  useEffect(() => {
    setProductLoading(true);
    fetch("http://127.0.0.1:5000/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
      })
      .finally(() => {
        setProductLoading(false);
      });
  }, []);
  return (
    <div className="manage_products_container">
      <h1 className="mb-4 text-center">Manage Products</h1>
      {productLoading ? (
        <Spinner />
      ) : (
        <table className="table">
          <thead>
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
                      onClick={() => handleAction(products._id, "delete")}
                    ></AiFillDelete>
                  </button>
                  <button
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
                      onClick={() => handleAction(products._id, "update")}
                    />
                  </button>
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