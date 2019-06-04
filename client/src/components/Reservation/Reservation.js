import React, { Component } from "react";
import axios from "axios";
import "./style.css";
import { connect } from "react-redux";
import firebase from "../../config/firebaseConfig";
import { Redirect } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";

class Reservation extends Component {
  constructor() {
    super();
    this.state = {
      hall_movieId: "",
      movieID: "",
      seanceDate: "",
      seatsBooked: [],
      userSeats: [],
      title: "",
      redirect: false,
      price: "18"
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    axios
      .get(
        `http://51.15.102.229:5000/api/seans/${
          this.props.match.params.seanceId
        }`
      )
      .then(res => {
        const movie = res.data;
        console.log(movie);
        this.setState({ hall_movieId: movie[0].hall_movieID });

        this.setState({ seanceDate: movie[0].seanceDate });
        //const movieID = res.data;
        this.setState({ movieID: movie[0].movieID });
        //const seanceDate = res.data;
        this.setState({ seanceDate: movie[0].seanceDate });
        axios
          .get(
            `http://51.15.102.229:5000/api/seatbooked/${
              this.props.match.params.seanceId
            }`
          )
          .then(res => {
            const movie = res.data;

            this.setState({ seatsBooked: movie });
          });
        // const seatsBooked = res.data;
      });

    firebase
      .firestore()
      .collection("films")
      .doc(this.props.match.params.movieId)
      .get()
      .then(doc => this.setState({ title: doc.data().title }));
  }

  onclick = e => {
    let array = this.state.userSeats;
    if (array.includes(e.target.attributes.name.nodeValue.substring(1))) {
      array.splice(
        array.indexOf(e.target.attributes.name.nodeValue.substring(1)),
        1
      );
    }
    console.log(e.target.attributes.name.nodeValue);
    if (e.target.style.backgroundColor === "rgb(0, 255, 0)") {
      this.setState({
        [e.target.name]: (e.target.style.backgroundColor = "")
      });
    } else {
      array.push(String(e.target.attributes.name.nodeValue).substring(1));
      this.setState({
        [e.target.name]: (e.target.style.backgroundColor = "#00FF00"),
        userSeats: array.sort()
      });
    }
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const newReservationFire = {
      movieID: this.state.movieID,
      seanceDate: this.state.seanceDate,
      userSeats: this.state.userSeats,
      userUid: this.props.auth.uid,
      hall_movieId: this.state.hall_movieId,
      createdAt: new Date()
    };

    firebase
      .firestore()
      .collection("reservations")
      .add(newReservationFire);

    let updateSeats = [];

    this.state.userSeats.map(seat => {
      updateSeats.push({
        hall_movieID: this.state.hall_movieId,
        seatIsTaken: 1,
        seatNumber: seat
      });
    });

    axios
      .post("http://51.15.102.229:5000/api/seats", updateSeats)
      .then(() => {
        this.setState({ redirect: true });
      })
      .catch(err => console.log(err));

    // this.props.push.history("/repertoire");
  };

  handleToken = (token, addresses) => {
    console.log("elo");
    console.log({ token, addresses });
  };

  render() {
    const { redirect } = this.state;

    return redirect ? (
      <Redirect to="/repertoire" />
    ) : (
      <div>
        {" "}
        <h1>
          <font color="silver">Book your ticket for {this.state.title} ! </font>{" "}
        </h1>
        <div class="row justify-content-md-center">
          <div class="col col-lg-2">
            <form>
              <div class="row justify-content-md-center">
                <div className="legend">
                  <table style={{ fontWeight: "bold" }}>
                    <tbody>
                      <th>
                        <tr>
                          <div className="free"> </div>{" "}
                        </tr>

                        <tr>
                          <div className="booked"> </div>
                        </tr>

                        <tr>
                          {" "}
                          <div className="chosen"> </div>
                        </tr>
                      </th>
                      <th>
                        <tr className="text">
                          {" "}
                          <font color="silver">
                            {" "}
                            <p className="lead" style={{ fontWeight: "bold" }}>
                              Free{" "}
                            </p>
                          </font>
                        </tr>
                        <tr> </tr>
                        <tr className="text">
                          {" "}
                          <font color="silver">
                            {" "}
                            <p className="lead" style={{ fontWeight: "bold" }}>
                              Booked{" "}
                            </p>{" "}
                          </font>
                        </tr>

                        <tr className="text">
                          {" "}
                          <font color="silver">
                            {" "}
                            <p className="lead" style={{ fontWeight: "bold" }}>
                              Your seats{" "}
                            </p>
                          </font>
                        </tr>
                      </th>
                    </tbody>
                  </table>
                </div>
              </div>
            </form>
          </div>
          <div class="col-md-auto">
            <div className="col-md-12 vertical-align:center">
              {this.state.seatsBooked === null ? null : (
                <table>
                  {[...Array(5)].map((x, i) => (
                    <tbody>
                      {[...Array(10)].map((x, no) => (
                        <th>
                          {this.state.seatsBooked.includes(
                            Number(String(i + 1) + String(no + 1))
                          ) ? (
                            <div
                              className="place"
                              style={{ backgroundColor: "red" }}
                              name={Number(`${i + 1}${no + 1}`)}
                            >
                              {no + 1}
                            </div>
                          ) : (
                            <div
                              className="place"
                              name={"a" + Number(`${i + 1}${no + 1}`)}
                              onClick={this.onclick}
                            >
                              {no + 1}
                            </div>
                          )}
                        </th>
                      ))}
                    </tbody>
                  ))}
                </table>
              )}
            </div>
          </div>
          <div className="col col-lg-2">
            <form>
              <div className="row justify-content-md-right">
                <div style={{ marginLeft: "150px" }}>
                  <table>
                    <th>
                      <tr>
                        <div className="info">
                          {" "}
                          {this.state.userSeats.length === 0 ||
                          this.state.price === "free"
                            ? "Below your seats: "
                            : "You have to pay " +
                              this.state.price * this.state.userSeats.length +
                              "PLN"}
                        </div>{" "}
                      </tr>
                      <tr>
                        <div
                          data-spy="scroll"
                          data-target="#list-example"
                          data-offset="0"
                          className="scrollspy-example"
                          style={{ backgroundColor: "silver" }}
                        >
                          {" "}
                          {this.state.userSeats.map(seat => (
                            <h6>
                              row: {seat.substring(0, 1)} ; seat:{" "}
                              {seat.substring(1)}
                            </h6>
                          ))}{" "}
                        </div>
                        {this.state.userSeats.length !== 0 &&
                        this.state.price !== "free" ? (
                          <StripeCheckout
                            stripeKey="pk_test_dpWQ1A2o3bDVW8vbb1QeBZyB"
                            amount={
                              this.state.price * this.state.userSeats.length
                            }
                            locale="auto"
                            name="Premium Cinema"
                            description="The best platform ever !"
                            panelLabel={`Book seats for ${this.state.price *
                              this.state.userSeats.length}}`}
                          />
                        ) : null}
                      </tr>
                    </th>
                  </table>
                </div>
              </div>
            </form>
            <form>
              <div className="row justify-content-md-right">
                <table style={{ marginLeft: "150px" }}>
                  <th>
                    <tr>
                      <div className="buy"> Order ticket as: </div>{" "}
                    </tr>
                    <select
                      class="form-control"
                      style={{
                        textAlign: "center",
                        fontWeight: "bold",
                        textAlignLast: "center",
                        marginTop: "2px"
                      }}
                      defaultValue="18"
                      name="price"
                      onChange={this.onChange}
                    >
                      <option
                        id="adult"
                        value="18"
                        style={{ textAlign: "center" }}
                      >
                        Adult - 18PLN
                      </option>
                      <option id="student" value="15">
                        Student - 15PLN
                      </option>
                      <option id="adultab60" value="free">
                        Adult above 60 - Free
                      </option>
                    </select>
                  </th>
                </table>
              </div>
            </form>
          </div>
        </div>
        <div className="row justify-content-md-center">
          <div className="col col-lg-2" />

          <div className="col-md-auto">
            <div className="col-md-12">
              <div className="col col-lg-2" />
              {this.state.seatsBooked === null ? null : (
                <table>
                  {[...Array(4)].map((x, i) => (
                    <tbody>
                      {[...Array(15)].map((x, no) => (
                        <th>
                          {this.state.seatsBooked.includes(
                            Number(String(i + 6) + String(no + 1))
                          ) ? (
                            <div
                              className="place"
                              style={{ backgroundColor: "red" }}
                              name={Number(`${i + 6}${no + 1}`)}
                            >
                              {no + 1}
                            </div>
                          ) : (
                            <div
                              className="place"
                              name={"a" + Number(`${i + 6}${no + 1}`)}
                              onClick={this.onclick}
                            >
                              {no + 1}
                            </div>
                          )}
                        </th>
                      ))}
                    </tbody>
                  ))}
                </table>
              )}
            </div>
            <button
              className="btn btn-lg btn-outline-light mr-2"
              style={{
                backgroundColor: "#0051a5",
                fontwe: "bold",
                marginLeft: "5px",
                marginBottom: "5px",
                marginTop: "5px",
                border: "none",
                fontWeight: "bold"
              }}
              onClick={this.onSubmit}
            >
              Submit
            </button>
          </div>
          <div className="col col-lg-2" />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    auth: state.firebase.auth
  };
};

export default connect(mapStateToProps)(Reservation);
