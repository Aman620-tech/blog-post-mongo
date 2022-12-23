const mongoose = require("mongoose");

const BlogSchema = mongoose.Schema(
  {
    heading: {
      type: String,
    },
    content: {
      type: String,
    },
    date: {
      type: String,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", BlogSchema);

module.exports = Post;
