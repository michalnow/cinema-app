import React from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Link } from "react-router-dom";
import ReactTooltip from "react-tooltip";

import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

const MovieAvaiability = props => {
  const id = props.match.params.movieId;
  const { film } = props;

  window.scrollTo(0, 0);
  if (film) {
    console.log(film);
    return (
      <div className="container">
        <div
          className="row justify-content-md-center"
          style={{ marginBottom: "5px" }}
        >
          <div
            className="card "
            style={{ marginBottom: "5px", marginTop: "50px" }}
          >
            <div
              className="header"
              style={{
                backgroundColor: "#F8F9FA",
                fontSize: "30px",
                fontFamily: "Courier New",
                marginLeft: "5px",
                marginTop: "5px",
                marginRight: "5px"
              }}
            >
              {film.title} ({film.Year})
            </div>

            <div className="col-sm-12  ">
              <img
                className="rounded img-fluid"
                src={film.image}
                alt=""
                style={{}}
              />

              <div className="col sm-12">
                <div className="card-block">
                  <h4 style={{ fontWeight: "bold" }}>Choose date:</h4>
                  {film !== null
                    ? film.seance.map(seans => (
                        <p
                          className="card-text center"
                          key={seans.hall_movieID}
                        >
                          <Link
                            className="btn btn-lg btn-outline-dark"
                            to={`/${id}/reserv/${seans.hall_movieID}`}
                            style={{
                              fontSize: "20px",
                              backgroundColor: "#0051a5",
                              fontWeight: "bold",
                              color: "white",
                              border: "none"
                            }}
                            data-tip={
                              "There is " +
                              (110 - seans.seatsBooked.length) +
                              " seats left"
                            }
                          >
                            {seans.seanceDate}
                          </Link>{" "}
                        </p>
                      ))
                    : null}
                </div>
              </div>
            </div>
            <ReactTooltip />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container center">
        <p style={{ fontSize: "30px" }}>
          {" "}
          <div className="spinner-grow text-info" role="status" />
        </p>
      </div>
    );
  }
};

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.movieId;
  const films = state.firestore.data.films;
  const film = films ? films[id] : null;
  //console.log(state);
  return {
    film: film,
    auth: state.firebase.auth
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "films" }])
)(MovieAvaiability);
