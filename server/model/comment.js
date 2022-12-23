const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema(
  {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
    name: {
      type: String,
    },
    comment: {
      type: String,
    },
    time: {
      type: String,
    },
    date: {
      type: String,
    },
    reply: [{ type: mongoose.Schema.Types.ObjectId, ref: "Reply" }],
  },
  { timestamps: true }
);
const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
