import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import AboutUs from "./Pages/About/AboutUs";
import Products from "./Pages/Products/Products";
import Navbar from "./Pages/Shared/Navbar/Navbar";
import Footer from "./Pages/Shared/Footer/Footer";
import ProductDetails from "./Pages/ProductDetails/ProductDetails";
import Order from "./Pages/PlaceOrder/Order";
import useContextAPI from "./Hooks/useContextAPI";
import PrivateRoute from "./Pages/Shared/PrivateRoute/PrivateRoute";
import Dashboard from "./Pages/Dashboard/Dashboard";

function App() {
  const { userLoading } = useContextAPI();

  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Home></Home>
        </Route>
        <Route path="/home">
          <Home></Home>
        </Route>
        <Route path="/about-us">
          <AboutUs />
        </Route>
        <Route path="/login">
          <Login></Login>
        </Route>
        <Route path="/register">
          <Register></Register>
        </Route>
        <Route exact path="/products">
          <Products></Products>
        </Route>
        <PrivateRoute path="/product/:id">
          <ProductDetails></ProductDetails>
        </PrivateRoute>
        <PrivateRoute path="/dashboard">
          <Dashboard></Dashboard>
        </PrivateRoute>
        <Route path="/place-order/:productId">
          <Order />
        </Route>
        <Route path="*"></Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
