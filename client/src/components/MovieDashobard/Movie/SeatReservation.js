import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class SeatReservation extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  render() {
    return (
      <div
        className="col-md-12 text-center white-text "
        style={{
          color: "#F8F9FA"
        }}
      >
        <p
          className="lead"
          style={{ fontSize: "40px", textDecoration: "italic" }}
        >
          Our current prices based on different customers
        </p>
        <table
          class="table table-striped"
          style={{ backgroundColor: "#F8F9FA", marginTop: "5px" }}
        >
          <tbody>
            <tr style={{ fontWeight: "bold", fontSize: "20px" }}>
              <td>Children under 10 yo</td>
              <td>Free</td>
            </tr>
            <tr style={{ fontWeight: "bold", fontSize: "20px" }}>
              <td>Childer above 10 yo</td>
              <td>10 PLN</td>
            </tr>
            <tr style={{ fontWeight: "bold", fontSize: "20px" }}>
              <td>Students</td>
              <td>15 PLN</td>
            </tr>
            <tr style={{ fontWeight: "bold", fontSize: "20px" }}>
              <td>Adults</td>
              <td>18 PLN</td>
            </tr>
            <tr style={{ fontWeight: "bold", fontSize: "20px" }}>
              <td>Adults above 60 yo</td>
              <td>Free</td>
            </tr>
            <tr style={{ fontWeight: "bold", fontSize: "20px" }}>
              <td>Origanized groups</td>

              <td>
                <Link
                  to="/aboutUs"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  Click here to contact us
                </Link>
              </td>
            </tr>
            <tr>
              <td />
              <td />
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
