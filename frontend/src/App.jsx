import { useState } from "react";
import "./App.css";
import services from "./services/index.js";
function App() {
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
      <button onClick={handleclick}>getAll users</button>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder="name"
          value={username}
          onChange={handleUsernameChange}
        />
        <button type="submit">Create User</button>
      </form>
    </>
  );
}

export default App;
