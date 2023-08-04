import React from "react";
import "./about.css";
import node from "../../assets/proj_node.jpg";
import react from "../../assets/proh_react.png";
import db from "../../assets/proj_postgre.png";

const About = () => {
  return (
    <div className="ff__about-container">
      <div className="ff__about-header">
        <span>A Brief Introduction</span>
        <p>
          It's project has made by put in practice the habilities adquires
          throug the <strong>Henry Bootcamp</strong> that has begun on August
          1st, 2022.
          <br />
          The entire process was a thoug journey, due the time frame and the
          continuous learning, but every hour spend on it has a great value now
          that everyone can see the result.
        </p>
        <p>
          Special thanks to our instructor, <strong>Christopher Luna</strong> who took
          every class as a way for everyone of us which has part on it 
          may participate, can we adquire the knowledge, expertice and confidence to{" "}
          <em>sail these waters with no fear</em>
        </p>
        <p>This Proyect has been made using these technologies:</p>
      </div>
      <div className="ff__about-proyect">
        <div className="ff__about-proyect_article">
          <div>
            <h2>ReactJS + Redux</h2>
            <p>
              The FrontEnd has been develop using the REACT JS Library. It
              allows me to create dynamic components that are interconected
              throug the Router library, for navigation and browser
              interoperativity, and the Redux Library, that enables the data
              flow between each component.
            </p>
          </div>
          <img src={react} alt="React and Redux" />
        </div>
        <div className="ff__about-proyect_article-div" />
        <div className="ff__about-proyect_article">
          <img src={node} alt="NodeJS and ExpressJS" />
          <div>
            <h2>NodeJS + ExpressJS</h2>
            <p>
              This proyect also has it own API REST backend. It delivers all the
              data from the external API and the local database.
              <br />
              The Express framework, that runs over NodeJS, unleash all the
              power to read and write to the database and process all the data
              that is sent to the external API.
            </p>
          </div>
        </div>
        <div className="ff__about-proyect_article-div" />
        <div className="ff__about-proyect_article">
          <div>
            <h2>Postgre SQL</h2>
            <p>
              Some time has seen a ferrary engine under the hood of a small car?
              Well, that's the situation. <br />
              All the power of Postgre Database is inside this app. That means
              that the possibilities of grouth are limitless, open the way to
              future implementation that implies User login, a cart, traking...
              and almost anything you can imagine.
            </p>
          </div>
          <img src={db} alt="Postgre SQL" />
        </div>
      </div>
    </div>
  );
};

export default About;
