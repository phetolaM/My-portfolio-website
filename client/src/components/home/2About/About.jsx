import React from "react";
import "./about.css";
import { Typewriter } from "react-simple-typewriter";
import profilePicture from "../../../assets/23456578.jpg";

function AboutMe() {
  return (
    <div className="portfolio-container" id="about">
      <section className="about-section">
        <div className="about-content">
          <div className="about-text">
            <h2 className="section-title">About Me</h2>
            <p className="about-description">
              I'm a full-stack developer based in Johannesburg, South Africa, 
              specializing in building robust data-driven applications with 
              clean, efficient code.
            </p>
            <p className="about-description">
              With a passion for solving complex problems, I create scalable 
              backend systems that power exceptional user experiences.
            </p>
            <p className="about-description">
              I mostly specialize in{" "}
              <span className="typewriter-text">
                <Typewriter
                  words={[
                    "React.js.",
                    "JavaScript (ES6+).",
                    "Node.js Backend.",
                    "MongoDB & Mongoose.",
                  ]}
                  loop={true}
                  cursor
                  cursorStyle="|"
                  typeSpeed={80}
                  deleteSpeed={80}
                  delaySpeed={2000}
                />
              </span>
            </p>
          </div>
          
          <div className="about-image-container">
            <div className="image-frame">
              <img
                src={profilePicture}
                alt="Phetola Mashashane"
                className="about-image"
              />
              <div className="frame-decoration"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutMe;