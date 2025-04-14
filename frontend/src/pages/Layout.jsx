import { Link, Outlet } from "react-router-dom";
import services from "../services/index.js";
import { useState } from "react";

function Layout() {
  // const [username, setUsername] = useState("");
  // const handleclick = () => {
  //   services.user.getAll().then((data) => {
  //     console.log(data);
  //   });
  // };
  // const handleUsernameChange = (event) => {
  //   setUsername(event.target.value);
  // };
  // const handleFormSubmit = (event) => {
  //   event.preventDefault();
  //   services.user.createOne({ name: username }).then((data) => {
  //     console.log(data);
  //   });
  //   setUsername("");
  // };
  return (
    <>
      <nav className="bg-gray-800 text-white flex justify-between p-4">
        <div>
          <Link to="/" className="linkcss">
            Home
          </Link>
          <Link to="/about" className="linkcss">
            About
          </Link>
          <Link to="/posts" className="linkcss">
            Posts
          </Link>
          <Link to="/profile" className="linkcss">
            Profile
          </Link>
        </div>
        <div>
          <Link to="/login" className="linkcss">
            Login
          </Link>
          <Link to="/signup" className="linkcss">
            Signup
          </Link>
        </div>
      </nav>
      <main>
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
