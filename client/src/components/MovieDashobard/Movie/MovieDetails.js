import React from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Link } from "react-router-dom";
import AddComment from "../../Comments/AddComment";
import CommentList from "../../Comments/CommentList";
import ReactPlayer from "react-player";
import { Rating } from "primereact/rating";

import "primereact/resources/primereact.min.css";

import "primeicons/primeicons.css";

const MovieDetails = props => {
  const id = props.match.params.movieId;
  const { movie } = props;
  const { comments } = props;
  const { auth } = props;
  window.scrollTo(0, 0);
  if (movie) {
    return (
      <div className="container">
        <div
          className="row justify-content-md-center"
          style={{ marginBottom: "5px" }}
        >
          <div
            className="col-md-auto"
            style={{ marginTop: "5px", marginBottom: "5px" }}
          >
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
              <div className="row ">
                <div className="col-md-4">
                  <h5>Rating based on our users: </h5>
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

                  <img className="" src={movie.image} alt="" />
                  {auth.uid ? (
                    <Link
                      to={`/repertoire/${id}`}
                      className="btn btn-lg btn-outline-light mr-2"
                      style={{
                        backgroundColor: "#0051a5",
                        fontwe: "bold",
                        marginLeft: "5px",
                        marginBottom: "5px",
                        marginTop: "5px",
                        border: "none"
                      }}
                    >
                      &nbsp;Avaiability&nbsp;
                    </Link>
                  ) : (
                    <Link
                      to="/login"
                      className="btn btn-lg btn-outline-light mr-2"
                      style={{
                        backgroundColor: "#0051a5",
                        marginLeft: "5px",
                        marginBottom: "5px",
                        border: "none",
                        marginTop: "5px",
                        fontWeight: "bold"
                      }}
                    >
                      Log in to get full experience{" "}
                      <i
                        className="pi pi-sign-in"
                        style={{ fontSize: "1em" }}
                      />
                    </Link>
                  )}
                </div>
                <div className="col-md-8 px-3">
                  <div
                    className="card-block px-6"
                    style={{ marginRight: "30px" }}
                  >
                    <h4 className="card-title">{movie.type}</h4>
                    <p className="card-tex">{movie.plot}</p>
                    <p className="card-text">Actors: {movie.actors}</p>
                    <p className="card-text">Director: {movie.director}</p>
                    <p className="card-text">Writer: {movie.writer}</p>
                    <p className="card-text">
                      Duration: {movie.duration} mins{" "}
                    </p>
                    <ReactPlayer
                      url={movie.trailerURL}
                      pip={true}
                      width="auto"
                      controls={true}
                      style={{ marginBottom: "20px", marginRight: "30px" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-auto">
          <CommentList comments={comments} filmId={id} />
        </div>
        <div className="col-md-auto">
          {auth.uid ? <AddComment movieId={id} /> : null}
        </div>
      </div>
    );
  } else {
    return (
      <div
        className="spinner-grow text-info"
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)"
        }}
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
    );
  }
};

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.movieId;
  const movies = state.firestore.data.films;
  const movie = movies ? movies[id] : null;

  return {
    movie: movie,
    comments: state.firestore.ordered.comments,
    auth: state.firebase.auth
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: "films" },
    { collection: "comments", orderBy: ["createdAt", "desc"] }
  ])
)(MovieDetails);
