import React, { useEffect, useRef, useState } from "react";
import "./DashBoard.css";
import SideNav, {
  Toggle,
  Nav,
  NavItem,
  NavIcon,
  NavText,
} from "@trendmicro/react-sidenav";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import {
  Switch,
  Route,
  useHistory,
  useLocation,
  useRouteMatch,
} from "react-router-dom";

import { FaListAlt } from "react-icons/fa";
import { MdPayment } from "react-icons/md";
import { BsFillBookmarkStarFill } from "react-icons/bs";
import { RiListSettingsFill, RiSettings2Fill } from "react-icons/ri";
import { SiAddthis } from "react-icons/si";
import { ImUserPlus } from "react-icons/im";
import { HiOutlineLogout } from "react-icons/hi";

import MyOrders from "./UserComponent/MyOrders";
import MyReview from "./UserComponent/MyReview";
import ManageAllOrders from "./AdminComponent/ManageAllOrders";
import AddProduct from "./AdminComponent/AddProduct";
import MakeAdmin from "./AdminComponent/MakeAdmin";
import useContextAPI from "../../Hooks/useContextAPI";
import Spinner from "../Shared/Spinner/Spinner";
import ManageProducts from "./AdminComponent/ManageProducts";
import AdminPrivateRoute from "../Shared/AdminPrivate/AdminPrivate";
import CheckoutPayment from "./UserComponent/Payment/CheckoutPayment";

const Dashboard = () => {
  const { user, userLoading, admin, dashBoardLogOut } = useContextAPI();
  const location = useLocation();
  const history = useHistory();
  let { path, url } = useRouteMatch();
  const dashboardRef = useRef();
  const sideNavRef = useRef();
  const [classToggle, setCalssToggle] = useState(false);

  console.log(admin);
  return (
    <div className="dashboard_container" ref={dashboardRef}>
      <div className="sideNav_container">
        {user && admin ? (
          <>
            {/* admin dashboar options */}
            <SideNav
              ref={sideNavRef}
              style={{
                marginTop: "75px",
                background: "rgb(20, 100, 92) none repeat scroll 0% 0%",
              }}
              onSelect={(selected) => {
                if (selected === "/log-out") {
                  dashBoardLogOut().then(() => {
                    history.push("/");
                  });
                  history.push("/");
                } else if (selected === "/home") {
                  history.push("/");
                } else {
                  const to = url + selected;
                  if (path !== to) {
                    history.push(to);
                  }
                }
              }}
            >
              <SideNav.Toggle onClick={() => setCalssToggle(!classToggle)} />

              <SideNav.Nav defaultSelected={`${path}/home`}>
                {/* nav item home link */}
                <NavItem eventKey="/home">
                  <NavIcon>
                    <i
                      className="fa fa-fw fa-home"
                      style={{ fontSize: "1.75em" }}
                    />
                  </NavIcon>
                  <NavText>Home</NavText>
                </NavItem>
                {/* end nav item home link */}
                <NavItem eventKey="/make-admin">
                  <NavIcon>
                    <ImUserPlus style={{ fontSize: "1.75em" }} />
                  </NavIcon>
                  <NavText>Make Admin</NavText>
                </NavItem>
                <NavItem eventKey="/manage-all-orders">
                  <NavIcon>
                    <RiListSettingsFill style={{ fontSize: "1.75em" }} />
                  </NavIcon>
                  <NavText>Manage All Orders</NavText>
                </NavItem>
                <NavItem eventKey="/add-product">
                  <NavIcon>
                    <SiAddthis style={{ fontSize: "1.75em" }} />
                  </NavIcon>
                  <NavText>Add Product</NavText>
                </NavItem>
                <NavItem eventKey="/manage-product">
                  <NavIcon>
                    <RiSettings2Fill style={{ fontSize: "1.75em" }} />
                  </NavIcon>
                  <NavText>Manage Product</NavText>
                </NavItem>
                {/* logout btn */}
                <NavItem eventKey="/log-out">
                  <NavIcon>
                    <i
                      className="fas fa-sign-out-alt"
                      style={{ fontSize: "1.75em" }}
                    />
                  </NavIcon>
                  <NavText>Logout</NavText>
                </NavItem>
              </SideNav.Nav>
            </SideNav>
          </>
        ) : (
          // user dashboard options
          <>
            <SideNav
              ref={sideNavRef}
              style={{
                marginTop: "75px",
                background: "rgb(20, 100, 92) none repeat scroll 0% 0%",
              }}
              onSelect={(selected) => {
                if (selected === "/log-out") {
                  dashBoardLogOut().then(() => {
                    history.push("/");
                  });
                  history.push("/");
                } else if (selected === "/home") {
                  history.push("/");
                } else {
                  const to = url + selected;
                  if (path !== to) {
                    history.push(to);
                  }
                }
              }}
            >
              <SideNav.Toggle onClick={() => setCalssToggle(!classToggle)} />

              <SideNav.Nav defaultSelected={`${path}/home`}>
                {/* nav item home link */}
                <NavItem eventKey="/home">
                  <NavIcon>
                    <i
                      className="fa fa-fw fa-home"
                      style={{ fontSize: "1.75em" }}
                    />
                  </NavIcon>
                  <NavText>Home</NavText>
                </NavItem>
                {/* end nav item home link */}

                <NavItem eventKey="/my-order">
                  <NavIcon>
                    <FaListAlt style={{ fontSize: "1.75em" }} />
                  </NavIcon>
                  <NavText>My Order</NavText>
                </NavItem>
                <NavItem eventKey="/payment">
                  <NavIcon>
                    <MdPayment style={{ fontSize: "1.75em" }} />
                  </NavIcon>
                  <NavText>Payment</NavText>
                </NavItem>
                <NavItem eventKey="/review">
                  <NavIcon>
                    <BsFillBookmarkStarFill style={{ fontSize: "1.75em" }} />
                  </NavIcon>
                  <NavText>Review</NavText>
                </NavItem>
                {/* logout btn */}
                <NavItem eventKey="/log-out">
                  <NavIcon>
                    <i
                      className="fas fa-sign-out-alt"
                      style={{ fontSize: "1.75em" }}
                    />
                  </NavIcon>
                  <NavText>Logout</NavText>
                </NavItem>
              </SideNav.Nav>
            </SideNav>
          </>
        )}
      </div>

      {/* dashboar header */}
      <div
        style={{
          height: "75px",
          fontSize: "40px",
          backgroundColor: "#297b70",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100001,
        }}
        className="text-white text-center text-capitalize dashboard_header"
      >
        Dashboard
      </div>

      {/* dashboard content */}
      <div
        className={`main_dashboard_container ${
          classToggle ? "main_content_second" : ""
        }`}
      >
        <Switch>
          <Route exact path={`${path}`}>
            <h1 className="text-center text-capitalize">
              Wellcome to your dashboard
            </h1>
          </Route>
          {/* <Route path={`${path}/home`}>
            <h1>Wellcome to your dashboard</h1>
          </Route> */}
          <Route exact={true} path={`${path}/payment`}>
            <CheckoutPayment />
          </Route>
          <Route path={`${path}/payment/checkout/:id`}>
            <h1>Check out form</h1>
          </Route>
          <Route path={`${path}/my-order`}>
            <MyOrders></MyOrders>
          </Route>
          <Route path={`${path}/review`}>
            <MyReview />
          </Route>

          {/* admin component */}
          <AdminPrivateRoute path={`${path}/manage-all-orders`}>
            <ManageAllOrders />
          </AdminPrivateRoute>
          <AdminPrivateRoute path={`${path}/add-product`}>
            <AddProduct />
          </AdminPrivateRoute>
          <AdminPrivateRoute path={`${path}/make-admin`}>
            <MakeAdmin />
          </AdminPrivateRoute>
          <AdminPrivateRoute path={`${path}/manage-product`}>
            <ManageProducts />
          </AdminPrivateRoute>
        </Switch>
      </div>
    </div>
  );
};

export default Dashboard;
