const Post = require("../model/Post");

const addPost = async (req, res) => {
  try {
    const { heading, content } = req.body;
    if (!heading || !content) {
      return res.json({ status: 400, response: "missing parameter" });
    }
    const data = { heading, content };
    const post = await Post.create(data);

    res.json({ status: 200, response: "Post added", post });
  } catch (err) {
    res.json({ status: 400, response: err.message });
  }
};

const ViewAllPost = async (req, res) => {
  try {
    const post = await Post.find().sort({ createdAt: -1 });

    res.json({ status: 200, response: "all post", post });
  } catch (err) {
    res.json({ status: 400, response: err.message });
  }
};

const ViewSinglePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId);

    res.json({ status: 200, response: "single post", post });
  } catch (err) {
    res.json({ status: 400, response: err.message });
  }
};
const DeleteSinglePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Post.findByIdAndDelete(postId);

    res.json({ status: 200, response: "Delete post", post });
  } catch (err) {
    res.json({ status: 400, response: err.message });
  }
};

// let date_ob = new Date();

// let hours = date_ob.getHours();

// // current minutes
// let minutes = date_ob.getMinutes();
// let time = `${hours}:${minutes}`;
// let date = date_ob.getDate();
// let month = date_ob.getMonth() + 1;
// let year = date_ob.getFullYear();

// console.log("time", time, "date", date, ":", month, ":", year);

module.exports = {
  addPost,
  ViewAllPost,
  ViewSinglePost,
  DeleteSinglePost,
};
