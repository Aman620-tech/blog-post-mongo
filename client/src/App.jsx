import * as React from 'react';
import "./App.css";
import Post from "./pages/Post";
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Route, Routes } from 'react-router-dom';
import PostView from './pages/PostView'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Post />} />
        <Route path="/post/:postId" element={<PostView />} />
        <Route />

        {/* <Post /> */}
      </Routes>

    </>
  );
}

export default App;
