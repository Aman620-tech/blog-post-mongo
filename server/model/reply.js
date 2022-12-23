const mongoose = require("mongoose");

const ReplySchema = mongoose.Schema(
  {
    commentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
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
    reply: [
      {
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
      },
    ],
  },
  { timestamps: true }
);
const Reply = mongoose.model("Reply", ReplySchema);

module.exports = Reply;
