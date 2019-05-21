import React from "react";
import { connect } from "react-redux";
import { signOut } from "../../store/actions/authActions";

import { Link } from "react-router-dom";

const UserIsAuthenticatedNav = props => {
  const { auth, profile } = props;
  return (
    <div>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link to="/" className="nav-link " style={{ fontSize: "20px" }}>
              <button
                type="button"
                className="btn btn-lg btn-outline-light "
                style={{ border: "none", fontWeight: "bold" }}
              >
                {profile.username}
                &nbsp;
                <i class="fa fa-user-circle" />
              </button>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/login" className="nav-link" style={{ fontSize: "20px" }}>
              <button
                type="button"
                className="btn btn-lg btn-outline-light "
                style={{
                  border: "none",
                  fontWeight: "bold"
                }}
                onClick={props.signOut}
              >
                Logout
              </button>
            </Link>
          </li>
          <li className="nav-item" />
        </ul>
      </div>
    </div>
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
