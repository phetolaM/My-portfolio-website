import React from "react";
import "./education.css";

function Education() {
    return (
        <div className="portfolio-container" id="education">
            <section className="education-section">
                <h2 className="section-title">Education</h2>
                <div className="education-timeline">
                    <div className="timeline-item">
                        <div className="timeline-date">2023</div>
                        <div className="timeline-content">
                            <h3 className="education-degree">Matric</h3>
                            <p className="education-school">
                                R.W Fick Senior Secondary School
                            </p>
                            <p className="education-description">
                                Focused on science subjects and passed with a
                                diploma endorsement.
                            </p>
                        </div>
                    </div>

                    <div className="timeline-item">
                        <div className="timeline-date">2025 - Current</div>
                        <div className="timeline-content">
                            <h3 className="education-degree">
                                Diploma in Financial Information Systems
                            </h3>
                            <p className="education-school">
                                Walter Sisulu University
                            </p>
                            <p className="education-description">
                               Currently in first year, building a strong foundation in financial systems, information technology, and problem-solving, with upcoming coursework in JavaScript, React, Node.js, and MongoDB.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Education;
