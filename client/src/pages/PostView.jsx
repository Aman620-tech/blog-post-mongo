import React, { useEffect, useState } from "react";
import axios from "axios";
import "./PostView.css";
import { useParams } from "react-router-dom";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AddComment from "./AddComment";
import AddReply from "./AddReply";

const PostView = () => {
  const { postId } = useParams();
  const [post, setPost] = useState({});

  const [commentId, setCommentId] = useState();
  const [replyId, setReplyId] = useState();

  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);

  const [comment, setComment] = useState([]);
  const [form, setForm] = useState({
    name: "",
    comment: "",
  });

  const allPost = async () => {
    const api = await axios.get(`http://localhost:3002/view-post/${postId}`);
    console.log("single post", api);
    await setPost(api.data.post);
  };

  const allComment = async () => {
    const api = await axios.get(`http://localhost:3002/all-comment/${postId}`);
    console.log("all comment", api.data);
    await setComment(api.data.comment);

  };
  useEffect(() => {
    allPost();
    allComment();
  }, [0]);

  const handleForm = async (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const submit = async (e) => {
    e.preventDefault();
    console.log("form value", form);
    const api = await axios.post(
      `http://localhost:3002/add-comment/${postId}`,
      form
    );
    console.log("all comment", api.data);
    if (api.data.status == 200) {
      await allComment();
      // this is not good practice
      setForm({
        name: "",
        comment: "",
      });
    }
    if (api.data.status == 400) {
      window.alert(api.data.response);
    }
  };

  // for comment id 


  console.log("show", show);
  console.log("comment Id", commentId);
  console.log("open Id", open);
  console.log("reply Id", replyId);
  return (
    <div className="blog">
      <div>
        <h1>{post.heading}</h1>
      </div>
      <h5>{post.content}</h5>

      <div>
        <br />
        <br />

        <div>
          <TextField
            fullWidth
            label="User Name"
            name="name"
            value={form?.name}
            onChange={handleForm}
          />
        </div>
        {/* <br /> */}
        <br />
        <div>
          <TextField
            fullWidth
            label="Comment"
            name="comment"
            value={form?.comment}
            onChange={handleForm}
          />
        </div>
        <br />
        <div>
          <Button variant="contained" onClick={(e) => submit(e)}>
            Add Comment
          </Button>
        </div>
        <hr />
      </div>

      <div className="comment ">
        {comment &&
          comment.map((val) => {
            return (
              <div className="comment1">
                <div>
                  {/* {val.name} */}
                  <Typography gutterBottom variant="" component="div">
                    <div>{val.name}</div>
                    {val.date} {val.time}
                  </Typography>
                </div>
                <div>{val.comment}</div>
                <div>
                  <Button
                    variant="contained"
                    onClick={() => {
                      setCommentId(val._id);
                      setShow(!show);
                    }}
                  >
                    reply
                  </Button>
                </div>

                {val.reply.map((value) => {
                  return (
                    <div className="comment2">
                      <div>
                        {/* {val.name} */}
                        <Typography gutterBottom variant="" component="div">
                          <div>{value.name}</div>
                          {value.date} {value.time}
                        </Typography>
                      </div>
                      <div>{value.comment}</div>
                      <div>
                        <Button
                          variant="contained"
                          onClick={() => {
                            // handleShow();
                            setReplyId(value._id)
                            setOpen(!open)
                            console.log("replyId", value._id);
                          }}
                        >
                          reply
                        </Button>
                      </div>
                      {value.reply.map((val, index) => {
                        return (
                          <div className="comment3">
                            <div>
                              {/* {val.name} */}
                              <Typography
                                gutterBottom
                                variant=""
                                component="div"
                              >
                                <div>{val.name}</div>
                                {val.date} {val.time}
                              </Typography>
                            </div>
                            <div>{val.comment}</div>
                            <div>
                              <Button
                                variant="contained"
                                onClick={() => {
                                  setReplyId(value._id);
                                  setOpen(!open);
                                  console.log("replyId", value._id);
                                }}
                              >
                                reply
                              </Button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            );
          })}
      </div>
      {
        show &&
        <AddComment show={show} setShow={setShow} commentId={commentId} />
      }
      {
        <AddReply open={open} setOpen={setOpen} replyId={replyId} />
      }
    </div >
  );
};

export default PostView;
