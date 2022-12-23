import React, { useState } from 'react'
import axios from "axios";
import "./PostView.css";
import { useParams } from "react-router-dom";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Collapse from "react-bootstrap/Collapse";
import { useEffect } from 'react';

const AddComment = ({ commentId, show, setShow }) => {
    console.log("commentID from child id", "commentId", commentId);
    const [reply, setReply] = useState({
        name: "",
        comment: "",
    });
    const handleClose = () => setShow(false);

    const handleInput = async (e) => {
        const { name, value } = e.target;
        setReply({ ...reply, [name]: value });
    };

    const addReply = async () => {
        console.log("value", reply, "id",);
        const { name, comment } = reply;

        const replyData = { name, comment };
        console.log("replyData", replyData);
        const api = await axios.post(
            `http://localhost:3002/add-reply/${commentId}`,
            replyData
        );
        console.log("api", api.data);
        if (api.data.status === 200) {
            handleClose();
        }
        if (api.data.status === 400) {
            window.alert(api.data.response);
        }
    };

    return (
        <div>
            <Modal centered show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Reply</Modal.Title>
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
                        onClick={() => {
                            // console.log("comment Id", val._id)
                            addReply()
                        }}
                    >
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default AddComment