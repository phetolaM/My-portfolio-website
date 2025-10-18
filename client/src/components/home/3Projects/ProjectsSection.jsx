import React from "react";
import { Link } from "react-router-dom";
import { projects } from "../../data/ProjectData";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./projectSection.css";

function PortfolioProjectsSection() {
    // Check if projects array exists and has any items
    const hasProjects =
        projects && Array.isArray(projects) && projects.length > 0;

    // If there are projects, filter out any that are missing a name
    const validProjects = hasProjects
        ? projects.filter((project) => project.name)
        : [];

    // Determine if we should show actual projects or the "coming soon" card
    const showProjects = validProjects.length > 0;

    // Only show "View More" button if there are more than 2 valid projects
    const showMoreButton = showProjects && validProjects.length > 2;

    return (
        <div className="portfolio-container" id="projects">
            <section className="projects-section">
                <h2 className="section-title">Projects</h2>

                <div className="projects-wrapper">
                    {showProjects ? (
                        validProjects.slice(0, 2).map((project, index) => (
                            <div key={index} className="project-card">
                                <div className="project-header">
                                    <h3 className="project-name">
                                        {project.name}
                                    </h3>
                                    <div className="project-meta">
                                        <div className="project-timeframe">
                                            <span className="time-icon">⏱</span>{" "}
                                            {project.timeframe || "Ongoing"}
                                        </div>
                                        {project.deployed && (
                                            <div
                                                className="project-deployed"
                                                title={`Deployed ${project.deployed}`}
                                            >
                                                <span className="deploy-icon">
                                                    🚀
                                                </span>
                                                <span>
                                                    Deployed {project.deployed}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="project-gallery">
                                    <Swiper
                                        spaceBetween={0}
                                        slidesPerView={1}
                                        navigation
                                        pagination={{ clickable: true }}
                                        modules={[Navigation, Pagination]}
                                        className="project-swiper"
                                    >
                                        {Array.isArray(project.gallery) &&
                                        project.gallery.length > 0 ? (
                                            project.gallery.map((img, i) => (
                                                <SwiperSlide key={i}>
                                                    <div className="image-container">
                                                        <img
                                                            src={img}
                                                            alt={`${
                                                                project.name
                                                            } ${i + 1}`}
                                                        />
                                                    </div>
                                                </SwiperSlide>
                                            ))
                                        ) : (
                                            <SwiperSlide>
                                                <div className="image-container no-image">
                                                    <span>
                                                        No images available
                                                    </span>
                                                </div>
                                            </SwiperSlide>
                                        )}
                                    </Swiper>
                                </div>

                                <div className="project-content">
                                    <div className="project-skills">
                                        <strong>Skills:</strong>
                                        <div className="skills-container">
                                            {Array.isArray(project.skills) &&
                                            project.skills.length > 0 ? (
                                                project.skills.map(
                                                    (skill, i) => (
                                                        <span
                                                            key={i}
                                                            className="skill-tag"
                                                        >
                                                            {skill}
                                                        </span>
                                                    )
                                                )
                                            ) : (
                                                <span className="no-skills">
                                                    No skills listed
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="project-buttons">
                                        {project.live && (
                                            <a
                                                href={project.live}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="project-button"
                                            >
                                                View Project
                                            </a>
                                        )}
                                        {project.github && (
                                            <a
                                                href={project.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="project-button github"
                                            >
                                                GitHub Repo
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="coming-soon-card">
                            <div className="project-header">
                                <h3 className="project-name">
                                    Projects Still Coming
                                </h3>
                            </div>
                            <div className="project-gallery">
                                <div className="image-container placeholder-image">
                                    <div className="placeholder-icon">🚧</div>
                                    <p>Under Construction</p>
                                </div>
                            </div>
                            <div className="project-content">
                                <div className="project-skills">
                                    <strong>Status:</strong>
                                    <div className="skills-container">
                                        <span className="skill-tag">
                                            In Development
                                        </span>
                                        <span className="skill-tag">
                                            Coming Soon
                                        </span>
                                    </div>
                                </div>
                                <div className="project-buttons">
                                    <button className="project-button" disabled>
                                        Stay Tuned
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Only show "View More" button if there are valid projects */}
                {showMoreButton && (
                    <div className="more-projects-container">
                        <Link to="/projects" className="more-link">
                            View All Projects <span className="arrow">→</span>
                        </Link>
                    </div>
                )}
            </section>
        </div>
    );
}

export default PortfolioProjectsSection;
