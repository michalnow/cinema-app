import React from "react";
import CommentItem from "./CommentItem";

const CommentList = ({ comments }) => {
  return (
    <div>
      <div className="container">
        <div
          className="row justify-content-sm-center"
          style={{ overflowY: "auto", overflowX: "hidden" }}
        >
          {comments &&
            comments.map(comment => {
              return <CommentItem comment={comment} key={comment.id} />;
            })}
        </div>
      </div>
    </div>
  );
};

export default CommentList;
