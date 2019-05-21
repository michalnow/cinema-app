import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Header from "./components/Layout/Header";
import Register from "./components/UserManagement/Register";
import AddMovie from "./components/MovieDashobard/Movie/AddMovie";
import Dashboard from "./components/MovieDashobard/Dashboard";
import Login from "./components/UserManagement/Login";
import MovieAvaiability from "./components/MovieDashobard/Movie/MovieAvaiability";
import MovieDetails from "./components/MovieDashobard/Movie/MovieDetails";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Header />
            <Route exact path="/add/movie" component={AddMovie} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/repertoire" component={Dashboard} />
            <Route exact path="/Login" component={Login} />
            <Route
              exact
              path={"/repertoire/:movieId"}
              component={MovieAvaiability}
            />
            <Route
              exact
              path={"/repertoire/:movieId/details"}
              component={MovieDetails}
            />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
