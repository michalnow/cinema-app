import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import UserIsAuthenticatedNav from "../UserManagement/UserIsAuthenticatedNav";
import UserIsNotAuthenticatedNav from "../UserManagement/UserIsNotAuthenticatedNav";

import "./style.css";

const Header = props => {
  const { auth } = props;
  const links = auth.uid ? (
    <UserIsAuthenticatedNav />
  ) : (
    <UserIsNotAuthenticatedNav />
  );
  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-light"
      style={{
        backgroundColor: "#4b4bf4"
      }}
    >
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarTogglerDemo03"
        aria-controls="navbarTogglerDemo03"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>

      <Link to="" className="navbar-brand">
        <img
          src={require("../../images/cinema.svg.png")}
          className="d-inline-block align-top"
          style={{ height: "42px" }}
          alt=""
        />
      </Link>
      <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
          <li className="nav-item">
            <Link
              to="/repertoire"
              className="nav-link "
              style={{ fontSize: "20px" }}
            >
              <button
                type="button"
                className="buttonHover btn btn-lg btn-outline"
                style={{ border: "none", fontWeight: "bold" }}
              >
                <i className="fa fa-film" />
                &nbsp;Repertoire
              </button>
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/priceList"
              className="nav-link"
              style={{ fontSize: "20px" }}
            >
              <button
                type="button"
                className="buttonHover btn btn-lg btn-outline"
                style={{ border: "none", fontWeight: "bold" }}
              >
                <i className="fa fa-money" />
                &nbsp;Price list
              </button>
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/aboutUs"
              className="nav-link"
              style={{ fontSize: "20px" }}
            >
              <button
                type="button"
                className="buttonHover btn btn-lg btn-outline"
                style={{ border: "none", fontWeight: "bold" }}
              >
                <i className="fa fa-question-circle-o" />
                &nbsp;About us
              </button>
            </Link>
          </li>
        </ul>
        {links}
      </div>
    </nav>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth
  };
};

export default connect(mapStateToProps)(Header);
