import React, { Component } from "react";
import { connect } from "react-redux";
import { createComment } from "../../store/actions/commentActions";

import "primeicons/primeicons.css";

class AddComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      body: "",
      date: "",
      movieId: this.props.movieId,
      disabledBtn: true
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    let currentDate = new Date();
    let datetime =
      currentDate.getDate() +
      "/" +
      (currentDate.getMonth() + 1) +
      "/" +
      currentDate.getFullYear() +
      " @ " +
      currentDate.getHours() +
      ":" +
      currentDate.getMinutes();
    const newComment = {
      body: this.state.body,
      date: datetime.toString(),
      movieId: this.state.movieId
    };
    this.setState({ body: "" });
    this.props.createComment(newComment);
    this.setState({ comment: "", date: "" });
  };

  render() {
    return (
      <div className="col-xs-12 text-center" style={{ marginBottom: "5px" }}>
        <textarea
          className="form-control"
          value={this.state.body}
          style={{ height: "100px", textAlign: "center", fontSize: "20px" }}
          name="body"
          rows="3"
          onChange={this.onChange}
          placeholder="Type your comment here"
        />

        <button
          onClick={this.onSubmit}
          className="btn btn-block"
          style={{
            backgroundColor: "#0051a5",
            fontWeight: "bold",
            color: "white",
            fontSize: "20px",
            marginBottom: "5px",
            marginTop: "5px"
          }}
          disabled={!this.state.body}
        >
          Comment <i className="pi pi-comment" style={{ fontSize: "1em" }} />
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createComment: comment => dispatch(createComment(comment))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(AddComment);
