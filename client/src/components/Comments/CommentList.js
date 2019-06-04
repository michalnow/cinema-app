import React from "react";
import CommentItem from "./CommentItem";

const CommentList = ({ comments, filmId }) => {
  return (
    <div>
      <div className="container">
        <div
          className="row justify-content-sm-center"
          style={{ overflowY: "auto", overflowX: "hidden" }}
        >
          {comments &&
            comments.map(comment => {
              return comment.movieId === filmId ? (
                <CommentItem comment={comment} key={comment.id} />
              ) : null;
            })}
        </div>
      </div>
    </div>
  );
};

export default CommentList;
