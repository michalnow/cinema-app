import React, { Component } from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { signUp } from "../../store/actions/authActions";
import { Redirect } from "react-router-dom";
import { Message } from "primereact/message";
import { Password } from "primereact/password";
import { InputText } from "primereact/inputtext";

//styles
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

class Register extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    inputBackgroundColor: "",
    errors: {},
    passwordColor: "",
    emailColor: "",
    confirmPaswordColor: "",
    usernameColor: ""
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.signUp(this.state);
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

  handleFocusConfirmPassword = () => {
    this.setState({ confirmPaswordColor: "#d1d1fa" });
  };

  handleBlurConfrimPassword = () => {
    this.setState({ confirmPaswordColor: "#FFFFFF" });
  };

  handleFocusUsername = () => {
    this.setState({ usernameColor: "#d1d1fa" });
  };

  handleBlurUsername = () => {
    this.setState({ usernameColor: "#FFFFFF" });
  };

  render() {
    const { username, email, password, confirmPassword } = this.state;
    const { auth, authError } = this.props;
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
                <h3 className="text-center mb-2">Sign-up</h3>
              )}

              <form className="form-group" onSubmit={this.handleSubmit}>
                <div className="form-group has-success">
                  <span className="p-float-label" style={{ fontSize: "20px" }}>
                    <InputText
                      className="form-control input-lg"
                      style={{ backgroundColor: this.state.usernameColor }}
                      id="usname"
                      name="username"
                      value={username}
                      type="username"
                      onChange={this.handleChange}
                      onFocus={this.handleFocusUsername}
                      onBlur={this.handleBlurUsername}
                    />

                    <label
                      htmlFor="usname"
                      style={{ marginLeft: "10px", fontWeight: "bold" }}
                    >
                      Username
                    </label>
                  </span>
                </div>
                <div className="form-group has-error">
                  <span className="p-float-label" style={{ fontSize: "20px" }}>
                    <InputText
                      className="form-control input-lg"
                      style={{ backgroundColor: this.state.emailColor }}
                      id="mail"
                      value={email}
                      name="email"
                      type="email"
                      onChange={this.handleChange}
                      onFocus={this.handleFocusEmail}
                      onBlur={this.handleBlurEmail}
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
                    <Password
                      className="form-control input-lg"
                      style={{
                        backgroundColor: this.state.passwordColor,
                        zIndex: 100
                      }}
                      id="pass"
                      name="password"
                      value={password}
                      type="password"
                      onChange={this.handleChange}
                      onFocus={this.handleFocusPassword}
                      onBlur={this.handleBlurPassword}
                      promptLabel=""
                      weakLabel=""
                      strongLabel=""
                      mediumLabel=""
                    />
                    <label
                      htmlFor="pass"
                      style={{ marginLeft: "10px", fontWeight: "bold" }}
                    >
                      Password
                    </label>
                  </span>
                </div>
                <div className="form-group has-success">
                  <span className="p-float-label" style={{ fontSize: "20px" }}>
                    <InputText
                      className="form-control input-lg"
                      style={{
                        backgroundColor: this.state.confirmPaswordColor
                      }}
                      name="confirmPassword"
                      id="confirm"
                      value={confirmPassword}
                      type="password"
                      onChange={this.handleChange}
                      onFocus={this.handleFocusConfirmPassword}
                      onBlur={this.handleBlurConfrimPassword}
                    />

                    <label
                      htmlFor="confirm"
                      style={{ marginLeft: "10px", fontWeight: "bold" }}
                    >
                      Confirm password
                    </label>
                  </span>
                </div>
                <div className="checkbox">
                  <label>
                    <input name="terms" type="checkbox" />
                    &nbsp;I have read and agree to the{" "}
                    <Link to="">terms of service</Link>
                  </label>
                </div>
                <button
                  className="btn btn-lg btn-primary btn-block"
                  value="Sign Me Up"
                  type="submit"
                  style={{ backgroundColor: "#0051a5" }}
                >
                  Sign me up{" "}
                  <i className="pi pi-user-plus" style={{ fontSize: "1em" }} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signUp: newUser => dispatch(signUp(newUser))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
