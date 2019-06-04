import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Link } from "react-router-dom";

class UserReservations extends Component {
  render() {
    const { auth } = this.props;
    const { movies } = this.props;
    const { reservs } = this.props;
    const { profile } = this.props;
    console.log(profile);
    return (
      <div className="container">
        <h1 style={{ color: "white" }}>
          {" "}
          That's your current reservations{" "}
          {auth.displayName == null ? profile.username : auth.displayName}
        </h1>
        {reservs == null
          ? null
          : reservs.map(reserv =>
              movies == null
                ? null
                : movies.map(movie =>
                    reserv.movieID === movie.movieApiId &&
                    reserv.userUid === auth.uid ? (
                      <div className="card" style={{ marginBottom: "5px" }}>
                        <div
                          className="header"
                          style={{
                            backgroundColor: "#F8F9FA",
                            fontSize: "30px",
                            fontFamily: "Courier New"
                          }}
                        >
                          Seance date: {reserv.seanceDate}
                        </div>
                        <div className="row">
                          <div className="col-md-4">
                            <h4
                              className="card-title"
                              style={{
                                fontSize: "23px",
                                fontWeight: "bold",
                                marginTop: "5px",
                                marginBottom: "5px"
                              }}
                            >
                              {movie.title}
                            </h4>
                            <img
                              className=""
                              src={movie.image}
                              alt=""
                              style={{ marginBottom: "5px" }}
                            />
                            <Link
                              to={`/repertoire/${movie.id}/details`}
                              className="btn btn-lg btn-outline-light mr-2"
                              style={{
                                backgroundColor: "#0051a5",
                                fontWeight: "bold",
                                marginBottom: "10px",
                                marginLeft: "7px"
                              }}
                            >
                              &nbsp;Check details &nbsp;
                            </Link>
                          </div>
                          <div className="col-md-8 px-3">
                            <div className="card-block px-6">
                              <h4
                                className="card-title"
                                style={{ fontSize: "25px", fontWeight: "bold" }}
                              >
                                Your seats:
                              </h4>
                              <ul
                                className="list-group"
                                style={{ border: "none" }}
                              >
                                {reserv.userSeats.map(seat => (
                                  <li
                                    className="list-group-item"
                                    style={{ border: "none", fontSize: "23px" }}
                                  >
                                    row: {seat.substring(0, 1)} seat:{" "}
                                    {seat.substring(1)}
                                  </li>
                                ))}
                              </ul>
                              <p className="lead" />
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : null
                  )
            )}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    auth: state.firebase.auth,
    reservs: state.firestore.ordered.reservations,
    movies: state.firestore.ordered.films,
    profile: state.firebase.profile
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "reservations" }, { collection: "films" }])
)(UserReservations);
