import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Rating } from "primereact/rating";
import { firestoreConnect, isLoaded } from "react-redux-firebase";
import { compose } from "redux";

import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

class Landing extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  render() {
    const { auth } = this.props;

    if (auth.uid) {
      return <Redirect to="/repertoire" />;
    }

    return (
      <div
        className="col-md-12 text-center"
        style={{
          background: "white"
        }}
      >
        <div
          className="container"
          style={{ marginTop: "50px", marginBottom: "20px" }}
        >
          <div className="landing">
            <div className="light-overlay landing-inner text-dark">
              <div className="row">
                <div className="col-md-12 text-center ">
                  <h4 className="display-4 mb-4">Welcome to our page</h4>
                  <img
                    className="img-fluid"
                    src={require("../../images/cinema.svg.png")}
                    alt=""
                  />
                  <p className="lead">
                    Create your account to get full experience of our
                    application
                  </p>
                  <hr />
                  <Link
                    to="/register"
                    className="btn btn-lg btn-outline-light mr-2"
                    style={{
                      backgroundColor: "#0051a5",
                      border: "none",
                      fontWeight: "bold"
                    }}
                  >
                    Sign Up
                  </Link>
                  <Link
                    to="/login"
                    className="btn btn-lg btn-outline-light mr-2"
                    style={{
                      backgroundColor: "#0051a5",
                      border: "none",
                      fontWeight: "bold"
                    }}
                  >
                    Login
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="container-fluid">
            <p className="lead" style={{ marginTop: "19px" }}>
              Currently our top 3 rated movies
            </p>
            <div className="row justify-content-md-center">
              {isLoaded(this.props.movies) ? (
                this.props.movies.map(movie => (
                  <div className="col-sm-4" style={{ marginTop: "5px" }}>
                    <Link
                      to={`/repertoire/${movie.id}/details`}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <h5 style={{ fontStyle: "italic", textAlign: "center" }}>
                        {movie.title}
                      </h5>

                      <img className="rounded" src={movie.image} alt="" />
                      <Rating
                        value={movie.rating}
                        stars={7}
                        style={{
                          color: "gold",
                          fontSize: "27px",
                          fontWeight: "bold"
                        }}
                        cancel={false}
                      />
                    </Link>
                  </div>
                ))
              ) : (
                <div className="spinner-grow text-info" role="status" />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    movies: state.firestore.ordered.films,
    auth: state.firebase.auth
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: "films", limit: 3, orderBy: ["rating", "desc"] }
  ])
)(Landing);
