import { Link, Outlet } from "react-router-dom";
import services from "../services/index.js";
import { useState } from "react";

function Layout() {
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
          <Link to="/deepseek" className="linkcss">
            DeepSeek
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
    </>
  );
}
export default Layout;
