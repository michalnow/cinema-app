import React, { Component } from "react";
import { createMovie } from "../../../store/actions/movieActions";
import { connect } from "react-redux";
import axios from "axios";
import { Redirect } from "react-router-dom";

class AddMovie extends Component {
  constructor() {
    super();
    this.state = {
      Year: "",
      actors: "",
      director: "",
      duration: "",
      image: "",
      plot: "",
      title: "",
      type: "",
      trailerURL: "",
      movies: [],
      genres: [],
      selectedMovie: "",
      writer: "",
      movie: null,
      movieApiId: null,
      seance: [],
      rating: 4,
      likes: { quantity: 0, usersUid: [] },
      dislikes: { quantity: 0, usersUid: [] }
    };
  }

  async componentDidMount() {
    window.scrollTo(0, 0);
    const res = await axios.get("http://51.15.102.229:5000/api/movies");
    const movies = await res.data;
    this.setState({ movies: movies });
    this.setState({
      genres: [
        ...new Set(
          movies
            .flatMap(movie => {
              return movie.genres.flatMap(genre => {
                return genre.genreType;
              });
            })
            .sort()
        )
      ]
    });
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  generateSelectedMovie = id => {
    axios.get(`http://51.15.102.229:5000/api/movies/${id}`).then(res => {
      const movie = res.data;
      this.setState({ seance: movie[0].seanse });
      this.setState({ movie: movie });
      this.setState({ plot: movie[0].description });
      this.setState({ trailerURL: movie[0].trailers[0].trailerURL });
      this.setState({ Year: movie[0].releaseDate.substring(0, 4) });
      const type =
        "" +
        movie[0].genres.map(genre => {
          return genre.genreType + " ";
        });
      this.setState({ movieApiId: movie[0].id });

      this.setState({
        type: type.substring(0, type.lastIndexOf(","))
      });
      this.setState({ title: movie[0].title });
      this.setState({ image: movie[0].posters[0].posterLink });
      this.setState({ duration: movie[0].duration });
      const fullName = movie[0].role.map(rol => {
        return rol.roleDesc === "director"
          ? rol.personInformation.personFirstName +
              " " +
              rol.personInformation.personLastName +
              " "
          : "";
      });
      const director = fullName.filter(function(el) {
        return el !== "";
      });

      this.setState({
        director: director
      });

      const acfullName = movie[0].role.map(rol => {
        return rol.roleDesc === "lead actor" || rol.roleDesc === "co-actor"
          ? rol.personInformation.personFirstName +
              " " +
              rol.personInformation.personLastName +
              " "
          : "";
      });

      const actors = acfullName.filter(function(el) {
        return el !== "";
      });
      this.setState({
        actors: actors
      });

      const wrfullName = movie[0].role.map(rol => {
        return rol.roleDesc === "writer"
          ? rol.personInformation.personFirstName +
              " " +
              rol.personInformation.personLastName +
              " "
          : "";
      });

      const writers = wrfullName.filter(function(el) {
        return el !== "";
      });

      this.setState({ writer: writers });
    });
  };

  onSelectChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    this.generateSelectedMovie(e.target.value);
  };

  onSubmit = e => {
    e.preventDefault();
    const newMovie = {
      Year: this.state.Year,
      actors: this.state.actors,
      director: this.state.director,
      duration: this.state.duration,
      image: this.state.image,
      plot: this.state.plot,
      title: this.state.title,
      type: this.state.type,
      writer: this.state.writer,
      trailerURL: this.state.trailerURL,
      movieApiId: this.state.movieApiId,
      seance: this.state.seance,
      rating: this.state.rating,
      likes: this.state.likes,
      dislikes: this.state.dislikes
    };

    this.props.createMovie(newMovie, this.props.history);
  };

  render() {
    const { auth } = this.props;
    if (auth.email !== "admin@gmail.com") return <Redirect to="/repertoire" />;
    return (
      <div className="movie">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-5 text-center">Add Movie</h1>
              <select
                className="custom-select custom-select-lg mb-3"
                placeholder="select movie to add"
                name="selectedMovie"
                onChange={this.onSelectChange}
                style={{ marginTop: "5px" }}
              >
                <option value="" disabled defaultValue hidden>
                  {" "}
                  Choose movie to add
                </option>
                {this.state.genres.map((genre, key) => {
                  return (
                    <optgroup key={key} label={genre}>
                      {this.state.movies.map(movie =>
                        movie.genres.map(genre2 => {
                          return genre2.genreType === genre ? (
                            <option key={movie.id} value={movie.id}>
                              {movie.title}
                            </option>
                          ) : null;
                        })
                      )}
                    </optgroup>
                  );
                })}
                }
              </select>
              {this.state.selectedMovie !== "" ? <div /> : null}

              <hr />
              {this.state.selectedMovie !== "" ? null : null}
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg "
                    placeholder={
                      this.state.title ? this.state.title : "Movie title"
                    }
                    name="title"
                    disabled
                    style={{ textAlign: "center" }}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg "
                    placeholder={
                      this.state.director
                        ? this.state.director
                        : "Movie director"
                    }
                    name="director"
                    style={{ textAlign: "center" }}
                    disabled
                  />
                </div>

                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg "
                    placeholder={
                      this.state.actors ? this.state.actors : "Main actors"
                    }
                    name="actors"
                    style={{ textAlign: "center" }}
                    disabled
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg "
                    placeholder={
                      this.state.type ? this.state.type : "Movie genre"
                    }
                    name="type"
                    style={{ textAlign: "center" }}
                    disabled
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder={
                      this.state.Year ? this.state.Year : "year of release"
                    }
                    name="Year"
                    style={{ textAlign: "center" }}
                    disabled
                  />
                </div>
                <div className="form-group">
                  <input
                    type="number"
                    className="form-control form-control-lg "
                    placeholder={
                      this.state.duration ? this.state.duration : "duration"
                    }
                    name="duration"
                    style={{ textAlign: "center" }}
                    disabled
                  />
                </div>
                <div className="form-group">
                  <textarea
                    className="form-control form-control-lg"
                    rows="2"
                    placeholder={
                      this.state.plot ? this.state.plot : "Movie plot"
                    }
                    name="plot"
                    style={{ textAlign: "center" }}
                    disabled
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder={
                      this.state.trailerURL
                        ? this.state.trailerURL
                        : "Link to movie trailer"
                    }
                    name="trailerURL"
                    style={{ textAlign: "center" }}
                    disabled
                  />
                </div>
                <div className="form-group">
                  {this.state.image ? (
                    <img src={this.state.image} alt="" />
                  ) : (
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Movie poster"
                      name="image"
                      style={{ textAlign: "center" }}
                      disabled
                    />
                  )}
                </div>

                <input
                  type="submit"
                  className="btn btn-block mt-4"
                  placeholder="Add movie"
                  style={{ backgroundColor: "#0051a5", marginBottom: "5px" }}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createMovie: (movie, history) => dispatch(createMovie(movie, history))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddMovie);
