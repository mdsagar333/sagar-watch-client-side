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
import Notfound from "./Pages/NotFound/Notfound";

function App() {
  const { userLoading } = useContextAPI();

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <>
            <Navbar />
            <Home></Home>
            <Footer />
          </>
        </Route>
        <Route path="/home">
          <>
            <Navbar />
            <Home></Home>
            <Footer />
          </>
        </Route>
        <Route path="/about-us">
          <>
            <Navbar />
            <AboutUs />
            <Footer />
          </>
        </Route>
        <Route path="/login">
          <>
            <Navbar />
            <Login></Login>
            <Footer />
          </>
        </Route>
        <Route path="/register">
          <>
            <Navbar />
            <Register></Register>
            <Footer />
          </>
        </Route>
        <Route exact path="/products">
          <>
            <Navbar />
            <Products></Products>
            <Footer />
          </>
        </Route>
        <PrivateRoute path="/product/:id">
          <>
            <Navbar />
            <ProductDetails></ProductDetails>
            <Footer />
          </>
        </PrivateRoute>
        <Route path="/place-order/:productId/:qty">
          <>
            <Navbar />
            <Order />
            <Footer />
          </>
        </Route>

        <PrivateRoute path="/dashboard">
          <Dashboard></Dashboard>
        </PrivateRoute>
        <Route path="*">
          <>
            <Navbar />
            <Notfound />
            <Footer />
          </>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
