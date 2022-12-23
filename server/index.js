require("dotenv").config({ path: ".env" });
const port = parseInt(process.env.PORT) || 3002;
require("./model/DbConnect");

const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());

const {
  addPost,
  ViewAllPost,

  ViewSinglePost,
} = require("./controller/Post.controller");
const {
  addComment,
  removeComment,
  // addReply,
  allComment,
} = require("./controller/comment.controller");
const {
  // addComment,
  // removeComment,
  addReply,
  replyBack
  // allComment,
} = require("./controller/reply.controller");

app.post("/add-post", addPost);
app.get("/view-post", ViewAllPost);
app.get("/view-post/:postId", ViewSinglePost);
// app.get("/view-post/:postId", ViewSinglePost);
app.post("/add-comment/:postId", addComment);
app.get("/all-comment/:postId", allComment);

app.post("/add-reply/:commentId", addReply);
app.post("/remove-reply/:commentId", addReply);
app.post("/reply-back/:replyId", replyBack);

app.get("/*", (req, res) => {
  res.json({ status: 200, response: "wrong Route" });
});

app.listen(port, (err) => {
  if (err) {
    return console.log({ Error: err.message || `server not started` });
  }
  console.log(`server started at http://localhost:${port}`);
});
