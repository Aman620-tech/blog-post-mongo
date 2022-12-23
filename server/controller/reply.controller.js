const Reply = require("../model/reply");
const Comment = require("../model/comment");

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

    const replyData = { name, comment, time, date: fullData ,commentId};
    console.log("replyData", replyData);
    const rep = await Reply.create(replyData);

    const viewComment = await Comment.findByIdAndUpdate(
      commentId,
      {
        $push: { reply: rep._id },
      },
      { new: true }
    );

    res.json({ status: 200, response: "Reply added", reply: rep, viewComment });
  } catch (err) {
    res.json({ status: 400, response: err.message });
  }
};
const replyBack = async (req, res) => {
  try {
    const { replyId } = req.params;
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
    //   const rep = await Reply.create(replyData);

    const viewComment = await Reply.findByIdAndUpdate(
      replyId,
      {
        $push: { reply: replyData },
      },
      { new: true }
    );

    console.log("viewComment", viewComment);
    const singleReply = await Reply.findById(replyId);

    res.json({ status: 200, response: "Reply added", reply: singleReply });
  } catch (err) {
    res.json({ status: 400, response: err.message });
  }
};

module.exports = { addReply, replyBack };
