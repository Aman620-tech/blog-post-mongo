const Comment = require("../model/comment");

const addComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const { name, comment } = req.body;
    if (!name || !comment) {
      return res.json({ status: 400, response: "missing parameter" });
    }
    let date_ob = new Date();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    let time = `${hours}:${minutes}`;
    let date = date_ob.getDate();
    let month = date_ob.getMonth() + 1;
    let year = date_ob.getFullYear();
    let fullData = `${date}:${month}:${year}`;

    console.log("time", time, "date", date, ":", month, ":", year);

    const commentData = { postId, name, comment, time, date: fullData };
    console.log("commentData", commentData);
    const commentCreate = await Comment.create(commentData);
    const viewComment = await Comment.findById(commentCreate._id);

    res.json({ status: 200, response: "Comment Added", comment: viewComment });
  } catch (err) {
    res.json({ status: 400, response: err.message });
  }
};
const allComment = async (req, res) => {
  try {
    const { postId } = req.params;

    const comment = await Comment.find({ postId }).populate('reply').sort({ createdAt: -1 });
    // .populate("postId");

    res.json({ status: 200, response: "All Comment", comment: comment });
  } catch (err) {
    res.json({ status: 400, response: err.message });
  }
};

const removeComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const { commentId } = req.body;

    console.log("object", commentId);
    await Post.findByIdAndUpdate(postId, {
      $pull: { comment: { _id: commentId } },
    });
    const removeComment = await Post.findById(postId);

    res.json({
      status: 200,
      response: "Comment Removed",
      comment: removeComment,
    });
  } catch (err) {
    res.json({ status: 400, response: err.message });
  }
};

const addReply = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { name, comment } = req.body;
    if (!name || !comment) {
      return res.json({ status: 400, response: "missing parameter" });
    }
    let date_ob = new Date();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    let time = `${hours}:${minutes}`;
    let date = date_ob.getDate();
    let month = date_ob.getMonth() + 1;
    let year = date_ob.getFullYear();
    let fullData = `${date}:${month}:${year}`;

    console.log("time", time, "date", date, ":", month, ":", year);

    const replyData = { name, comment, time, date: fullData };
    console.log("replyData", replyData);
    await Comment.findByIdAndUpdate(
      commentId,
      {
        $push: { reply: replyData },
      },
      { new: true }
    );
    const viewComment = await Comment.findById(commentId);

    res.json({ status: 200, response: "Reply added", reply: viewComment });
  } catch (err) {
    res.json({ status: 400, response: err.message });
  }
};
module.exports = { addComment, removeComment, addReply, allComment };
