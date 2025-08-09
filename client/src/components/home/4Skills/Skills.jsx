import React from "react";
import { skills } from "../../data/ProjectData";
import "./skills.css";

function SkillsSection() {
    return (
        <div className="portfolio-container" id="skills">
            <section className="skills-section">
                <h2 className="section-title">Skills</h2>
                <div className="skills-grid">
                    {skills.map((skill) => (
                        <div key={skill.name} className="skill-card">
                            <div className="skill-icon">{skill.icon}</div>
                            <h3 className="skill-name">{skill.name}</h3>
                            <div className="skill-progress">
                                <div
                                    className="progress-bar"
                                    style={{ width: `${skill.level}%` }}
                                ></div>
                            </div>
                            <span className="skill-level">{skill.level}%</span>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default SkillsSection;
