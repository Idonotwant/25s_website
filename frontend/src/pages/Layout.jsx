import { Link, Outlet } from "react-router-dom";
import services from "../services/index.js";
import { useState } from "react";

function Layout() {
  const [username, setUsername] = useState("");
  const handleclick = () => {
    services.user.getAll().then((data) => {
      console.log(data);
    });
  };
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const handleFormSubmit = (event) => {
    event.preventDefault();
    services.user.createOne({ name: username }).then((data) => {
      console.log(data);
    });
    setUsername("");
  };
  return (
    <>
      <nav
        style={{
          padding: "1rem",
          background: "#eee",
          display: "flex",
          gap: "1rem",
        }}
      >
        <div>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/posts">Posts</Link>
          <Link to="/profile">Profile</Link>
        </div>
        <div>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </div>
      </nav>
      <main style={{ padding: "2rem" }}>
        <Outlet />
      </main>
      {/* <button onClick={handleclick}>getAll users</button>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder="name"
          value={username}
          onChange={handleUsernameChange}
        />
        <button type="submit">Create User</button>
      </form> */}
    </>
  );
}
export default Layout;
