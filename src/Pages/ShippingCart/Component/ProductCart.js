import React from "react";
import { MdDeleteForever } from "react-icons/md";

const ProductCart = (props) => {
  const { products } = { ...props };
  const { deleteCartItem } = props;
  const { showAction } = props;
  console.log(products);
  return (
    <div className="product_cart_container">
      <div className="container">
        <h3>Cart summary</h3>
        <div className="row">
          {products.length < 1 ? (
            <h4>There is no product in cart.</h4>
          ) : (
            <table className="table table-striped table-hover">
              <thead class="table-dark">
                <tr>
                  <th scope="col">Product</th>
                  <th scope="col">Qty</th>
                  <th scope="col">Price</th>
                  <th scope="col">Total</th>
                  {showAction && <th scope="col">Action</th>}
                </tr>
              </thead>
              <tbody>
                {products.map((item) => (
                  <tr key={item._id}>
                    <td className="d-flex align-items-start">
                      <img
                        src={item.productImage}
                        alt=""
                        style={{ width: "60px" }}
                        className="me-2"
                      />
                      <small> {item.productName}</small>
                    </td>
                    <td className="">
                      <small>{item.productQuantity}</small>
                    </td>
                    <td>
                      <small>{item.productPrice}</small>
                    </td>
                    <td>
                      <small>
                        {(item.productQuantity * item.productPrice).toFixed(2)}
                      </small>
                    </td>
                    {showAction && (
                      <td>
                        <MdDeleteForever
                          style={{ fontSize: "22px", cursor: "pointer" }}
                          className="text-danger ms-2"
                          onClick={() => deleteCartItem(item._id)}
                        />
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCart;
