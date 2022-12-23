import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom'
import './Post.css'
const Post = () => {

    const navigate = useNavigate()

    const [show, setShow] = useState(false);
    const [post, setPost] = useState([]);
    const [form, setForm] = useState({
        heading: '', content: '',
        //  date: ''

    });

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const allPost = async () => {
        const api = await axios.get('http://localhost:3002/view-post')
        console.log("api", api)
        await setPost(api.data.post)

    }
    useEffect(() => {
        allPost()
    }, [0])
    const handleInput = async (e) => {
        const { name, value } = e.target
        setForm({ ...form, [name]: value })
    }

    const submit = async () => {
        console.log("value", form)
        const api = await axios.post('http://localhost:3002/add-post', form)
        console.log("api", api.data)
        if (api.data.status === 200) {
            handleClose()
            allPost()
            setForm({
                heading: '', content: '', date: ''

            })
        }
        if (api.data.status === 400) {
            window.alert(api.data.response)
        }

    }

    return (
        <div className='parent'>
            {/* <Container> */}
            <div>
                <Button variant="" onClick={handleShow}>
                    Add Post
                </Button>

            </div>
            <div>
                <Modal centered show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Post</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>

                            <TextField fullWidth label="Title" name='heading' value={form.heading} onChange={handleInput} />
                        </div>
                        <br />
                        <div>

                            <TextField fullWidth label="Content" name='content' value={form.content} onChange={handleInput} />
                        </div>
                        {/* <div>

                            <TextField fullWidth type="date" label="Content" name='date' value={form.date } onChange={handleInput} />
                        </div> */}

                    </Modal.Body>
                    <Modal.Footer>
                        <div >

                            <Button variant="contained" color='success' onClick={handleClose}>
                                Close
                            </Button>
                        </div>
                        {"  "}
                        <div>

                            <Button variant="contained" onClick={() => submit()}>
                                Save Changes
                            </Button>
                        </div>
                    </Modal.Footer>
                </Modal>
            </div>


            {/* <Box
                        sx={{
                            width: 300,
                            height: 300,
                            backgroundColor: 'primary.dark',
                            '&:hover': {
                                backgroundColor: 'primary.main',
                                opacity: [0.9, 0.8, 0.7],
                            },
                        }}
                    >

                    </Box> */}
            <div className='post_parent'>
                {post?.map((val, index) => {

                    return (
                        <div className='postbody' onClick={() => { navigate(`/post/${val._id}`) }}>
                            {/* <Card raised className="card category-card" sx={{ maxWidth: 345 }} onClick={() => { navigate(`/post/${val._id}`) }}> */}

                            {/* raised for  shadowing */}
                            {/* <CardActionArea> */}
                            {/* <CardMedia
                    className='category-image'
                    component="img"
                    height="140"
                    image={data.categoryImage}
                    alt="green iguana"
                /> */}
                            {/* <CardContent> */}
                            <div>
                                <Typography gutterBottom variant="h5" component="div">
                                    {val.heading}
                                </Typography>

                            </div>
                            <div>
                                <Typography gutterBottom variant="h5" component="div">
                                    {val.content}
                                </Typography>

                            </div>
                            {/* </CardContent> */}
                            {/* </CardActionArea> */}
                            {/* </Card> */}
                            <br />
                        </div>
                    )

                })}

            </div>





            {/* </Container> */}
            {/* <button>Add Post</button> */}



        </div >
    )
}

export default Post