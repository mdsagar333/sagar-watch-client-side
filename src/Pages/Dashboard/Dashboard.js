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
import MyOrders from "./UserComponent/MyOrders";

const Dashboard = () => {
  const location = useLocation();
  const history = useHistory();
  let { path, url } = useRouteMatch();
  const dashboardRef = useRef();
  const sideNavRef = useRef();
  const [classToggle, setCalssToggle] = useState(false);

  useEffect(() => {}, [window.screen.width]);

  return (
    <div className="dashboard_container" ref={dashboardRef}>
      <div className="sideNav_container">
        <SideNav
          ref={sideNavRef}
          style={{ marginTop: "75px", background: "#493ddb" }}
          onSelect={(selected) => {
            const to = url + selected;
            if (path !== to) {
              history.push(to);
            }
          }}
        >
          <SideNav.Toggle onClick={() => setCalssToggle(!classToggle)} />
          <SideNav.Nav defaultSelected={`${path}/home`}>
            <NavItem eventKey="/home">
              <NavIcon>
                <i
                  className="fa fa-fw fa-home"
                  style={{ fontSize: "1.75em" }}
                />
              </NavIcon>
              <NavText>Dashboard</NavText>
            </NavItem>
            <NavItem eventKey="/my-order">
              <NavIcon>
                <i
                  className="fa fa-fw fa-line-chart"
                  style={{ fontSize: "1.75em" }}
                />
              </NavIcon>
              <NavText>My Order</NavText>
            </NavItem>
            <NavItem eventKey="/payment">
              <NavIcon>
                <i
                  className="fa fa-fw fa-line-chart"
                  style={{ fontSize: "1.75em" }}
                />
              </NavIcon>
              <NavText>Payment</NavText>
            </NavItem>
            <NavItem eventKey="/review">
              <NavIcon>
                <i
                  className="fa fa-fw fa-line-chart"
                  style={{ fontSize: "1.75em" }}
                />
              </NavIcon>
              <NavText>Review</NavText>
            </NavItem>
          </SideNav.Nav>
        </SideNav>
      </div>
      <div
        className={`main_dashboard_container ${
          classToggle ? "main_content_second" : ""
        }`}
      >
        <Switch>
          <Route exact path={`${path}`}>
            <h1>dashboard</h1>
          </Route>
          <Route path={`${path}/home`}>
            <h1>dashboard</h1>
          </Route>
          <Route path={`${path}/payment`}>
            <h1>Payment feature coming soon</h1>
          </Route>
          <Route path={`${path}/my-order`}>
            <MyOrders></MyOrders>
          </Route>
          <Route path={`${path}/review`}>
            <h1>review</h1>
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default Dashboard;
