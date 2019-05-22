import React, { Component } from "react";

export default class AboutUs extends Component {
  render() {
    return (
      <div className="col-md-12 text-center">
        <h1 className="display-4" style={{}}>
          Who we are ? <i className="fa fa-video" />
        </h1>
        <p className="lead" style={{ fontSize: "22px" }}>
          We are Premium Cinema, who is involved with the most famous movie
          providers all around the world. Our app is used by the most famous
          brands globally.
        </p>
        <h1 className="display-4" style={{}}>
          Our goal is to:
        </h1>
        <ul className="">
          <li className="">
            <p className="lead" style={{ fontSize: "22px" }}>
              provide the best possible user experience
            </p>
          </li>
          <li className="">
            <p className="lead" style={{ fontSize: "22px" }}>
              best app performence possible
            </p>
          </li>
          <li className="">
            <p className="lead" style={{ fontSize: "22px" }}>
              make our customers happy as much as possible
            </p>
          </li>
          <li className="">
            <p className="lead" style={{ fontSize: "22px" }}>
              make customers able leave their opinions
            </p>
          </li>
        </ul>{" "}
        <h1 className="display-4" style={{}}>
          Contact us using one of these below
        </h1>
        <p className="lead" style={{ fontSize: "22px" }}>
          Email: ourmail@premiumCinema.com
        </p>
        <p className="lead" style={{ fontSize: "22px", marginBottom: "5px" }}>
          Phone: +48 666666666
        </p>
        <img
          src={require("../../images/cinema.svg.png")}
          alt=""
          style={{ transform: "scale(0.8, 0.8)" }}
        />
      </div>
    );
  }
}