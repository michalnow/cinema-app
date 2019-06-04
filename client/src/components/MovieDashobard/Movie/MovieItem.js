import React from "react";
import { Link } from "react-router-dom";

const MovieItem = ({ movie, auth }) => {
  return (
    <div className="card" style={{ marginBottom: "5px" }}>
      <div
        className="header"
        style={{
          backgroundColor: "#F8F9FA",
          fontSize: "30px",
          fontFamily: "Courier New"
        }}
      >
        {movie.title} ({movie.Year})
      </div>
      <div className="row">
        <div className="col-md-4">
          <img
            className=""
            src={movie.image}
            alt=""
            style={{ marginBottom: "20px" }}
          />
        </div>
        <div className="col-md-8 px-3">
          <div className="card-block px-6">
            <h4 className="card-title">{movie.type}</h4>
            <p className="card-tex">{movie.plot}</p>
            <p className="card-text">Director: {movie.director}</p>
            <p className="card-text">Duration: {movie.duration} mins </p>
            {auth.email === "admin@gmail.com" ? (
              <button
                className="btn btn-lg"
                style={{
                  backgroundColor: "red",
                  color: "white",
                  marginRight: "5px"
                }}
                onClick={
                  null
                } /*firebase
                .firestore()
                .collection("films")
                .doc(`${movie.id}`)
                .delete()
              .then(() => window.alert("You've just deleted " + movie.title))*/
              >
                {" "}
                Delete movie{" "}
              </button>
            ) : null}
            <Link
              to={`/repertoire/${movie.id}/details`}
              className="btn btn-lg"
              style={{ backgroundColor: "#0051a5", color: "white" }}
            >
              Movie details
            </Link>
            <Link
              to={`/repertoire/${movie.id}`}
              className="btn btn-lg"
              style={{
                backgroundColor: "#0051a5",
                color: "white",
                marginLeft: "5px"
              }}
            >
              &nbsp;Avaiability&nbsp;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieItem;
