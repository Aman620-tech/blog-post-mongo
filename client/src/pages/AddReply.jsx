import React, { useState } from 'react'
import axios from "axios";
import "./PostView.css";
import { Navigate, useParams } from "react-router-dom";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Modal from "react-bootstrap/Modal";
// import {}

const AddReply = ({ replyId, open, setOpen }) => {
    console.log("commentID from child id", "commentId", replyId, "open", open, "setOpen");

    const handleClose = () => setOpen(false);

    const [reply, setReply] = useState({
        name: "",
        comment: ""
    })

    const handleInput = async (e) => {
        const { name, value } = e.target;
        setReply({ ...reply, [name]: value })
    }

    const submit = async (e) => {
        e.preventDefault()
        console.log("reply", reply)
        const api = await axios.post(
            `http://localhost:3002/reply-back/${replyId}`,
            reply
        );
        console.log("api", api.data);
        if (api.data.status === 200) {
            handleClose();
            // Navigate()
        }
        if (api.data.status === 400) {
            window.alert(api.data.response);
        }
    }

    return (
        <div>
            <Modal centered show={open} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Reply</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <TextField
                            fullWidth
                            label="Name"
                            name="name"
                            value={reply.name}
                            onChange={handleInput}
                        />
                    </div>
                    <br />
                    <div>
                        <TextField
                            fullWidth
                            label="Comment"
                            name="comment"
                            value={reply.comment}
                            onChange={handleInput}
                        />
                    </div>
                    <br />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="contained" onClick={handleClose}>
                        Close
                    </Button>
                    <Button
                        variant="contained"
                        onClick={(e) => {
                            // console.log("comment Id", val._id)
                            submit(e)
                        }}
                    >
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )

}

export default AddReply