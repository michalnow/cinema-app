import React, { Component } from "react";

import { connect } from "react-redux";
import { signIn } from "../../store/actions/authActions";
import { provider, auth } from "../../config/firebaseConfig";
import { Redirect, Link } from "react-router-dom";
import firebase from "../../config/firebaseConfig";

import { InputText } from "primereact/inputtext";
import { Message } from "primereact/message";

import "./style.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

class Login extends Component {
  state = {
    email: "",
    password: "",
    passwordColor: "",
    emailColor: "",
    user: null,
    username: "",
    isAdmin: ""
  };

  login = () => {
    auth()
      .signInWithPopup(provider)
      .then(({ user }) => {
        this.setState({ user: user });
        firebase
          .firestore()
          .collection("users")
          .add({
            username: this.state.user.displayName,
            isAdmin: false
          });
      });
  };

  logout = () => {
    auth()
      .signOut()
      .then(() => {
        this.setState({ user: null });
      });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.signIn(this.state);
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleFocusPassword = () => {
    this.setState({ passwordColor: "#d1d1fa" });
  };

  handleFocusEmail = () => {
    this.setState({ emailColor: "#d1d1fa" });
  };

  handleBlurPassword = () => {
    this.setState({ passwordColor: "#FFFFFF" });
  };

  handleBlurEmail = () => {
    this.setState({ emailColor: "#FFFFFF" });
  };

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const { email, password } = this.state;
    const { authError, auth } = this.props;
    if (auth.uid) return <Redirect to="/repertoire" />;
    return (
      <div className="container-fluid bg-light py-3">
        <div className="row">
          <div className="col-md-6 mx-auto">
            <div className="card card-body">
              <div
                className="text-center "
                style={{ marginTop: "5", marginBottom: "5" }}
              >
                <img
                  src={require("../../images/cinema.svg.png")}
                  className="d-inline-block"
                  style={{
                    height: "50px",
                    width: "200px"
                  }}
                  alt=""
                />
              </div>
              {authError ? (
                <Message
                  style={{ color: "red", border: "none", fontSize: "18px" }}
                  severity="error"
                  text={authError}
                />
              ) : (
                <h3 className="text-center mb-4">Login</h3>
              )}
              <form className="form-group" onSubmit={this.handleSubmit}>
                <div className="form-group has-success">
                  <span className="p-float-label" style={{ fontSize: "20px" }}>
                    <InputText
                      id="mail"
                      value={email}
                      onChange={this.handleChange}
                      style={{
                        backgroundColor: this.state.emailColor
                      }}
                      onFocus={this.handleFocusEmail}
                      onBlur={this.handleBlurEmail}
                      name="email"
                      className="form-control input-lg"
                      type="email"
                    />

                    <label
                      htmlFor="mail"
                      style={{ marginLeft: "10px", fontWeight: "bold" }}
                    >
                      E-mail address
                    </label>
                  </span>
                </div>
                <div className="form-group has-success">
                  <span className="p-float-label" style={{ fontSize: "20px" }}>
                    <InputText
                      id="pass"
                      value={password}
                      onChange={this.handleChange}
                      style={{
                        backgroundColor: this.state.passwordColor,
                        marginTop: "8x`px"
                      }}
                      onFocus={this.handleFocusPassword}
                      onBlur={this.handleBlurPassword}
                      name="password"
                      className="form-control input-lg"
                      type="password"
                    />

                    <label
                      htmlFor="pass"
                      style={{ marginLeft: "10px", fontWeight: "bold" }}
                    >
                      Password
                    </label>
                  </span>
                </div>

                <button
                  className="btn btn-lg btn-primary btn-block"
                  type="submit"
                  style={{ backgroundColor: "#0051a5" }}
                >
                  Log me in{" "}
                  <i className="pi pi-sign-in" style={{ fontSize: "1em" }} />
                </button>
                <Link to="/register">
                  <p style={{ fontSize: "12px" }}>
                    You don't have account yet ? Click here to sign up
                  </p>
                </Link>
              </form>
              <button className="facebook_button" onClick={this.login}>
                Login with Facebook
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signIn: creds => dispatch(signIn(creds))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
