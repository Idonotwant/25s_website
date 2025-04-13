import { useState } from "react";
import "./App.css";
import services from "./services/index.js";

function App() {
  const handleclick = () => {
    services.user.getAll().then((data) => {
      console.log(data);
    });
  };

  return (
    <>
      <button onClick={handleclick}>test</button>
    </>
  );
}

export default App;
