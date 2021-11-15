import React, { useEffect, useState } from "react";
import Spinner from "../../Shared/Spinner/Spinner";

const MakeAdmin = () => {
  const [adminLoading, setAdminLoading] = useState(false);
  const [serverResponse, setServerResponse] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [isNeedToUpdate, setIsNeedToUpdate] = useState(0);

  const handleOnChangeEmail = (e) => {
    setAdminEmail(e.target.value);
  };

  const handleMakeAdmin = (e) => {
    e.preventDefault();
    setAdminLoading(true);
    fetch("https://fierce-bastion-00988.herokuapp.com/users/admin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: adminEmail }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setServerResponse("Admin created successfully!");
        }
      })
      .finally(() => {
        setAdminLoading(false);
        setAdminEmail("");
        setIsNeedToUpdate(isNeedToUpdate + 1);
      });
  };

  useEffect(() => {
    fetch("https://fierce-bastion-00988.herokuapp.com/users")
      .then((res) => res.json())
      .then((data) => setAllUsers(data.users));
  }, [isNeedToUpdate]);

  return (
    <div className="container">
      <h1 className="text-center mb-4">Make An Admin</h1>
      {serverResponse !== "" && (
        <p>
          <div class="alert alert-success" role="alert">
            {serverResponse}
          </div>
        </p>
      )}
      <div className="row">
        <div className="col-0 col-md-3"></div>
        <div className="col-12 col-md-6">
          <form onSubmit={handleMakeAdmin}>
            <div className="input-group mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Enter email address"
                aria-label="Recipient's username"
                onChange={handleOnChangeEmail}
                value={adminEmail}
              />
              <button
                className="btn btn-outline-dark"
                type="submit"
                style={{ minWidth: "100px" }}
              >
                {adminLoading ? (
                  <span
                    class="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                ) : (
                  "Make Admin"
                )}
              </button>
            </div>
          </form>
        </div>
        <div className="col-0 col-md-3"></div>
      </div>
      <div className="user_container">
        {adminLoading ? (
          <Spinner />
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">User Name</th>
                <th scope="col">User Email</th>
                <th scope="col">User Role</th>
              </tr>
            </thead>
            <tbody>
              {allUsers.map((user, index) => (
                <tr key={user._id}>
                  <th scope="row">{index + 1}</th>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td className="text-capitalize">
                    <span
                      className={
                        user.role === "admin" ? "badge bg-success" : ""
                      }
                    >
                      {user.role}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default MakeAdmin;
