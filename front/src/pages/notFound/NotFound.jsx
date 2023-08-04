import React from "react";
import { Link } from "react-router-dom";
import notFound from "../../assets/notFound02.jpg";
import "./notFound.css";

const NotFound = () => {
  return (
    <div className="ff__notFound-container">
      <div className="ff__notFound">
        <img src={notFound} alt="Page not Found" />
        <div className="ff__notFound-text">
          <div className="ff__notFound-emp">We're Sorry...</div>
          <h1>
            we had a little issue
            <br /> and it's embarrassing...
          </h1>
          <span>
            so... this is the infamous <br />
            <strong>404 - page not found</strong>
          </span>
          <p>
            <Link to="/">do you wanna try it later?</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
