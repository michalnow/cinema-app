import React from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Link } from "react-router-dom";
import axios from "axios";
import ReactTooltip from "react-tooltip";

import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

const MovieAvaiability = props => {
  const id = props.match.params.movieId;
  const { film } = props;
  const { auth } = props;

  const getNumberOfSeats = seansId => {
    let seats = null;
    seats = axios
      .get(`http://51.15.102.229:5000/api/seatbooked/${seansId}`)
      .then(res => {
        const seats2 = res.data;
        console.log(100 - seats2.length);
        return 110 - seats2.length;
      });

    return 110 - seats.length;
  };
  window.scrollTo(0, 0);
  if (film) {
    console.log(auth);
    return (
      <div
        className="card center"
        style={{ marginBottom: "5px", marginTop: "50px" }}
      >
        <div
          className="header"
          style={{
            backgroundColor: "#F8F9FA",
            fontSize: "30px",
            fontFamily: "Courier New"
          }}
        >
          {film.title} ({film.Year})
        </div>
        <div className="row ">
          <div className="col-md-6">
            <img
              className=""
              src={film.image}
              alt=""
              style={{ marginBottom: "20px" }}
            />
          </div>
          <div className="col-md-14 px-3">
            <div className="card-block px-6">
              <h4 style={{ fontWeight: "bold" }}>Choose date:</h4>
              {film.seance.map(seans => (
                <p className="card-text center" key={seans.hall_movieID}>
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
                  >
                    {seans.seanceDate}
                  </Link>{" "}
                  {console.log(getNumberOfSeats(seans.hall_movieID))}
                  <i
                    className="pi pi-info-circle"
                    style={{ fontSize: "2em", color: "#0051a5" }}
                    data-tip="There is a hall with 110 seats"
                  />
                </p>
              ))}
            </div>
          </div>
        </div>
        <ReactTooltip />
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
