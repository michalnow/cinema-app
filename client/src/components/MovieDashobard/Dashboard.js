import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import MovieList from "./Movie/MovieList";
import { Redirect } from "react-router-dom";

class Dashboard extends Component {
  render() {
    const { movies } = this.props;
    const { auth } = this.props;
    if (!auth.uid) {
      return <Redirect to="/login" />;
    }
    return (
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col col-lg-2" />
          <div
            className="col-md-auto"
            style={{ marginTop: "5px", marginBottom: "5px" }}
          >
            <MovieList movies={movies} />
          </div>
          <div className="col col-lg-2" />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    movies: state.firestore.ordered.films,
    auth: state.firebase.auth
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "films" }])
)(Dashboard);
