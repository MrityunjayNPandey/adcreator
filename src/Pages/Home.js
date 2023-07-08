import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate("/components"); // Replace '/components' with the actual path of the desired
  };

  return (
    <div>
      <h1>Home </h1>
      <button onClick={handleButtonClick}>Go to Another </button>
    </div>
  );
};

export default Home;
