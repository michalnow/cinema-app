import React from "react";
import { Link } from "react-router-dom";

import "./style.css";
import "primeicons/primeicons.css";

export default function UserIsNotAuthenticatedNav() {
  return (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <Link to="/register" className="nav-link " style={{ fontSize: "20px" }}>
          <button
            type="button"
            className="buttonHover btn btn-lg btn-outline"
            style={{ border: "none", fontWeight: "bold" }}
          >
            Sign up{" "}
            <i className="pi pi-user-plus" style={{ fontSize: "1em" }} />
          </button>
        </Link>
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
          >
            Login <i className="pi pi-sign-in" style={{ fontSize: "1em" }} />
          </button>
        </Link>
      </li>
    </ul>
  );
}
