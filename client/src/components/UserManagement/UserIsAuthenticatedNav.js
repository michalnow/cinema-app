import React from "react";
import { connect } from "react-redux";
import { signOut } from "../../store/actions/authActions";

import { Link } from "react-router-dom";
import Avatar from "react-avatar";

import "primeicons/primeicons.css";

const UserIsAuthenticatedNav = props => {
  // const icon = <i class="fa fa-user-circle" />;
  const { auth, profile } = props;
  console.log(auth.providerData[0].uid);
  return (
    <ul className="navbar-nav ml-auto" style={{ alignItems: "center" }}>
      {profile.isAdmin ? (
        <li className="nav-iem">
          <Link to="/add/movie">
            <button
              type="button"
              className="buttonHover btn btn-lg btn-outline"
              style={{
                border: "none",
                fontWeight: "bold",
                color: "red"
              }}
            >
              Add movie{" "}
            </button>
          </Link>
        </li>
      ) : null}
      <li className="nav-item">
        <div className="dropdown">
          <button
            type="button"
            className="btn btn-lg btn-outline dropdown-toggle"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            style={{ border: "none", fontWeight: "bold" }}
          >
            {profile.username ? (
              profile.username
            ) : (
              <Avatar
                facebookId={auth.providerData[0].uid}
                size="50"
                round={true}
              />
            )}
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <Link className="dropdown-item" to={`/reservations/${auth.uid}`}>
              Reservation
            </Link>
            {auth.providerData[0].providerId === "facebook.com" ? null : (
              <Link
                className="dropdown-item"
                to={`/user/${auth.uid}/changePassword`}
              >
                Change password
              </Link>
            )}
          </div>
        </div>
      </li>
      <li className="nav-item">
        <Link to="/login" className="nav-link" style={{ fontSize: "20px" }}>
          <button
            type="button"
            className="buttonHover btn btn-lg btn-outline"
            style={{
              border: "none",
              fontWeight: "bold"
            }}
            onClick={props.signOut}
          >
            Logout <i className="pi pi-sign-out" style={{ fontSize: "1em" }} />
          </button>
        </Link>
      </li>
    </ul>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    signOut: () => dispatch(signOut())
  };
};

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserIsAuthenticatedNav);
