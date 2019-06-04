import React, { Component } from "react";
import firebase from "../../config/firebaseConfig";
import { Redirect } from "react-router-dom";
class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPasswordColor: "",
      newPaswordColor: "",
      currentPassword: "",
      newPassword: "",
      passwordColor: "",
      errorPassword: null
    };
  }

  handleFocusCurrentPassword = () => {
    this.setState({ currentPasswordColor: "#d1d1fa" });
  };

  handleFocusNewPassword = () => {
    this.setState({ newPaswordColor: "#d1d1fa" });
  };

  handleOnBlurCurrentPassword = () => {
    this.setState({ currentPasswordColor: "#FFFFFF" });
  };

  handleOnBlurNewPassword = () => {
    this.setState({ newPaswordColor: "#FFFFFF" });
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleFocusPassword = () => {
    this.setState({ passwordColor: "#d1d1fa" });
  };

  reauthenticate = currentPassword => {
    let user = firebase.auth().currentUser;
    let cred = firebase.auth.EmailAuthProvider.credential(
      user.email,
      currentPassword
    );
    return user.reauthenticateAndRetrieveDataWithCredential(cred);
  };

  changePassword = () => {
    this.reauthenticate(this.state.currentPassword)
      .then(() => {
        let user = firebase.auth().currentUser;
        user
          .updatePassword(this.state.newPassword)
          .then(error => {
            this.setState({ errorPassword: `Password has been changed` });
          })
          .catch(error => {
            this.setState({ errorPassword: error.message });
          });
      })
      .catch(error => {
        this.setState({ errorPassword: error.message });
      });
  };

  render() {
    if (this.state.errorPassword === "Password has been changed") {
      return <Redirect to="/repertoire" />;
    }
    return (
      <div className="container-fluid bg-light py-3">
        <div className="row">
          <div className="col-md-6 mx-auto">
            <div className="card card-body">
              <div
                className="text-center "
                style={{
                  marginTop: "5px",
                  marginBottom: "13px",
                  fontSize: "2rem"
                }}
              >
                Change your password
              </div>
              <div className="form-group has-success">
                <input
                  className="form-control input-lg"
                  style={{ backgroundColor: this.state.currentPasswordColor }}
                  type="password"
                  placeholder="Current Password"
                  name="currentPassword"
                  onChange={this.handleChange}
                  value={this.state.currentPassword}
                  onFocus={this.handleFocusCurrentPassword}
                  onBlur={this.handleOnBlurCurrentPassword}
                />
              </div>
              <div className="form-group has-success">
                <input
                  className="form-control input-lg"
                  style={{ backgroundColor: this.state.newPaswordColor }}
                  type="password"
                  placeholder="New Password"
                  name="newPassword"
                  onChange={this.handleChange}
                  value={this.state.newPassword}
                  onFocus={this.handleFocusNewPassword}
                  onBlur={this.handleOnBlurNewPassword}
                />
              </div>
              <button
                className="btn btn-lg btn-outline-light"
                onClick={this.changePassword}
                style={{
                  backgroundColor: "#0051a5",
                  marginLeft: "5px",
                  marginBottom: "5px",
                  border: "none",
                  marginTop: "5px",
                  fontWeight: "bold"
                }}
              >
                Submit
              </button>
              <h5
                style={{
                  color: "blue",
                  fontWeight: "bold",
                  marginTop: "10px"
                }}
              >
                {this.state.errorPassword}
              </h5>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ChangePassword;
