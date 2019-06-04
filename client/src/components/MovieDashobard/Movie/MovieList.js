import React from "react";
import MovieItem from "./MovieItem";

const MovieList = ({ movies, auth }) => {
  return (
    <div className="container">
      {movies &&
        movies.map(movie => {
          return <MovieItem movie={movie} auth={auth} key={movie.id} />;
        })}
    </div>
  );
};

export default MovieList;
