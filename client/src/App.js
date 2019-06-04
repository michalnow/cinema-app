import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import Register from "./components/UserManagement/Register";
import AddMovie from "./components/MovieDashobard/Movie/AddMovie";
import Dashboard from "./components/MovieDashobard/Dashboard";
import Login from "./components/UserManagement/Login";
import MovieAvaiability from "./components/MovieDashobard/Movie/MovieAvaiability";
import MovieDetails from "./components/MovieDashobard/Movie/MovieDetails";
import Landing from "./components/Layout/Landing";
import PriceList from "./components/PriceList/PriceList";
import AboutUs from "./components/AboutUs/AboutUs";
import ChangePassword from "./components/UserManagement/ChangePassword";
import Reservation from "./components/Reservation/Reservation";
import UserReservations from "./components/UserManagement/UserReservations";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App" style={{ backgroundColor: "#001f3f" }}>
            <Header />
            <Route exact path="/" component={Landing} />
            <Route exact path="/add/movie" component={AddMovie} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/repertoire" component={Dashboard} />
            <Route exact path="/Login" component={Login} />
            <Route
              exact
              path="/user/:userId/changePassword"
              component={ChangePassword}
            />
            <Route exact path="/priceList" component={PriceList} />
            <Route exact path="/aboutUs" component={AboutUs} />
            <Route
              exact
              path={"/repertoire/:movieId"}
              component={MovieAvaiability}
            />
            <Route
              exact
              path={"/:movieId/reserv/:seanceId"}
              component={Reservation}
            />
            <Route
              exact
              path={"/repertoire/:movieId/details"}
              component={MovieDetails}
            />
            <Route
              exact
              path={"/reservations/:userId"}
              component={UserReservations}
            />
            <Route exact path={"/repertoire/:movieId/:idx"} component={null} />
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
