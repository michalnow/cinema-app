import React, { useState } from "react";
import { Link } from "react-router-dom";
import firebase from "../../../config/firebaseConfig";

const MovieItem = ({ movie, auth }) => {
  const [noOfLikes, setLike] = useState(movie.likes.quantity);
  const [colorLike, setColorLike] = useState("green");
  const [noOfDisLikes, setDisLike] = useState(movie.dislikes.quantity);
  const [colorDisLike, setDisLikeColor] = useState("#B22222");

  const updateLikes = () => {
    const userUid = auth.uid;

    if (
      !movie.likes.usersUid.includes(userUid) &&
      !movie.dislikes.usersUid.includes(userUid)
    ) {
      setLike(noOfLikes + 1);
      let arr = Array.from(movie.likes.usersUid);
      arr.push(userUid);

      firebase
        .firestore()
        .collection("films")
        .doc(movie.id)
        .update({
          likes: { quantity: noOfLikes, usersUid: arr }
        });
    } else if (
      !movie.likes.usersUid.includes(userUid) &&
      movie.dislikes.usersUid.includes(userUid)
    ) {
      setDisLike(noOfDisLikes - 1);
      setLike(noOfLikes + 1);
      let arr2 = Array.from(movie.dislikes.usersUid);
      let index = arr2.indexOf(userUid);
      arr2.splice(index, 1);

      let arr = Array.from(movie.likes.usersUid);
      arr.push(userUid);

      const newDislike = {
        quantity: noOfDisLikes,
        usersUid: arr2
      };

      firebase
        .firestore()
        .collection("films")
        .doc(movie.id)
        .update({
          likes: { quantity: noOfLikes, usersUid: arr }
        });

      firebase
        .firestore()
        .collection("films")
        .doc(movie.id)
        .update({
          dislikes: newDislike
        });
    }
  };

  const updateDisLikes = () => {
    const userUid = auth.uid;

    if (
      !movie.dislikes.usersUid.includes(userUid) &&
      !movie.likes.usersUid.includes(userUid)
    ) {
      setDisLike(noOfDisLikes + 1);
      let arr = Array.from(movie.dislikes.usersUid);
      arr.push(userUid);

      firebase
        .firestore()
        .collection("films")
        .doc(movie.id)
        .update({
          dislikes: { quantity: noOfDisLikes, usersUid: arr }
        });
    } else if (
      !movie.dislikes.usersUid.includes(userUid) &&
      movie.likes.usersUid.includes(userUid)
    ) {
      setDisLike(noOfDisLikes + 1);
      setLike(noOfLikes - 1);
      let index = movie.likes.usersUid.indexOf(userUid);
      let arr2 = Array.from(movie.likes.usersUid);
      arr2.splice(index, 1);

      const newLikes = {
        quantity: noOfLikes,
        usersUid: arr2
      };

      let arr = Array.from(movie.dislikes.usersUid);
      arr.push(userUid);

      firebase
        .firestore()
        .collection("films")
        .doc(movie.id)
        .update({
          dislikes: { quantity: noOfDisLikes, usersUid: arr }
        });

      firebase
        .firestore()
        .collection("films")
        .doc(movie.id)
        .update({
          likes: newLikes
        });
    }
  };

  return (
    <div className="container" style={{ marginTop: "5px" }}>
      <div
        className="row justify-content-md-center"
        style={{ marginTop: "5px" }}
      >
        <div className="col-sm-8">
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
            <div className="row justify-content-md-center">
              <div className="col-sm-4">
                <img
                  className="rounded img-fluid"
                  src={movie.image}
                  alt=""
                  style={{ marginBottom: "20px" }}
                />
              </div>
              <div className="col-sm-8">
                <div className="card-block">
                  <h4 className="card-title">{movie.type}</h4>
                  <p className="card-tex">{movie.plot}</p>
                  {movie.director.length === 0 ? null : (
                    <p className="card-text">Director: {movie.director}</p>
                  )}

                  <p className="card-text">Duration: {movie.duration} mins </p>
                  {auth.email === "admin@gmail.com" ? (
                    <button
                      className="btn btn-lg"
                      style={{
                        backgroundColor: "red",
                        color: "white"
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
                  <div className="row justify-content-md-center">
                    <div className="col-3">
                      <Link
                        to={`/repertoire/${movie.id}/details`}
                        className="btn btn-lg btn-outline-light"
                        style={{
                          backgroundColor: "#0051a5",
                          fontweight: "bold",
                          border: "none",
                          fontWeight: "bold"
                        }}
                      >
                        &nbsp;&nbsp;Details&nbsp;&nbsp;
                      </Link>
                    </div>
                    <div className="col-5">
                      <Link
                        to={`/repertoire/${movie.id}`}
                        className="btn btn-lg btn-outline-light"
                        style={{
                          backgroundColor: "#0051a5",
                          fontweight: "bold",
                          border: "none",
                          fontWeight: "bold"
                        }}
                      >
                        &nbsp;Avaiability&nbsp;
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="card-footer text-right"
              style={{ backgroundColor: "White", border: "none" }}
            >
              <p>
                <i
                  className="fa fa-thumbs-o-up"
                  style={{
                    color: colorLike,
                    fontSize: "2em"
                  }}
                  onClick={() => {
                    updateLikes();
                  }}
                  onMouseOver={() => {
                    setColorLike("#00FF00");
                  }}
                  onMouseLeave={() => {
                    setColorLike("green");
                  }}
                />
                {movie.likes.quantity}&nbsp;
                <i
                  className="fa fa-thumbs-o-down"
                  style={{ color: colorDisLike, fontSize: "2em" }}
                  onClick={() => {
                    updateDisLikes();
                  }}
                  onMouseOver={() => {
                    setDisLikeColor("red");
                  }}
                  onMouseLeave={() => {
                    setDisLikeColor("#B22222");
                  }}
                />
                {movie.dislikes.quantity}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieItem;
