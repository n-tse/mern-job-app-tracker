import React from "react";
import "./css/NavBar.css";
import GreatJobLogo from "../assets/GreatJobLogo.png";

export const NavBar = () => {
  return (
    <div className="nav-bar-container">
      <img src={GreatJobLogo} style={{ width: 80, height: 80 }} />
      <em>Job App<br/>Tracker</em>
    </div>
  );
};
