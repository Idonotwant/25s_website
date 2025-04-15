import { HashRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./pages/Layout.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Posts from "./pages/Posts.jsx";
import Profile from "./pages/Profile.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import DeepSeek from "./pages/DeepSeek.jsx";
import { useState } from "react";

function App() {
  const [currUser, setCurrUser] = useState({ id: null, username: "", img: "" });
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/about" element={<About />} />
          <Route path="/posts" element={<Posts />} />
          <Route
            path="/profile"
            element={<Profile currUser={currUser} setCurrUser={setCurrUser} />}
          />
          <Route path="/deepseek" element={<DeepSeek />} />
          <Route path="/login" element={<Login setCurrUser={setCurrUser} />} />
          <Route
            path="/signup"
            element={<Signup setCurrUser={setCurrUser} />}
          />
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
