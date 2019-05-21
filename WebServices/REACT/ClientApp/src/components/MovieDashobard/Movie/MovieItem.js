import React from "react";
import { Link } from "react-router-dom";

const MovieItem = ({ movie }) => {
  return (
    <div className="card" style={{ marginBottom: "5px" }}>
      <div
        className="card-header"
        style={{
          backgroundColor: "white",
          fontSize: "25px",
          fontFamily: "Comic Sans MS"
        }}
      >
        {movie.title} ({movie.Year})
      </div>
      <div className="row ">
        <div className="col-md-4">
          <img className="" src={movie.image} alt="" />
        </div>
        <div className="col-md-8 px-3">
          <div className="card-block px-6">
            <h4 className="card-title">{movie.type}</h4>
            <p className="card-tex">{movie.plot}</p>
            <p className="card-text">Director: {movie.director}</p>
            <p className="card-text">Duration: {movie.duration} mins </p>
            <Link
              to=""
              className="btn btn-lg"
              style={{ backgroundColor: "#7070EF", color: "white" }}
            >
              Movie details
            </Link>
            <Link
              to={`/repertoire/${movie.id}`}
              className="btn btn-lg"
              style={{
                backgroundColor: "#7070EF",
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
