import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaHome, FaArrowUp } from "react-icons/fa";
import { projects } from "../../data/ProjectData";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./projectsPage.css";

const ProjectsList = () => {
    const [showTopBtn, setShowTopBtn] = useState(false);
    const [filter, setFilter] = useState("all");

    const filteredProjects =
        filter === "all"
            ? projects
            : projects.filter((proj) => proj.type === filter);

    const noProjectsFound = filteredProjects.length === 0;

    useEffect(() => {
        const handleScroll = () => {
            setShowTopBtn(window.scrollY > 300);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div className="projects-list-container">
            <header className="projects-header">
                <Link to="/" className="home-button">
                    <FaHome className="home-icon" />
                    Home
                </Link>
                <h2 className="projects-title">My Projects</h2>

                <div className="project-filters">
                    {["all", "frontend", "fullstack", "backend"].map((cat) => (
                        <button
                            key={cat}
                            className={`filter-btn ${
                                filter === cat ? "active" : ""
                            }`}
                            onClick={() => setFilter(cat)}
                        >
                            {cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </button>
                    ))}
                </div>
            </header>

            <p className="project-count-message">
                {filter === "all"
                    ? `Total Projects: ${filteredProjects.length}`
                    : `${
                          filter.charAt(0).toUpperCase() + filter.slice(1)
                      } Projects: ${filteredProjects.length}`}
            </p>

            <AnimatePresence>
                {noProjectsFound && (
                    <motion.div
                        className="no-projects-card"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="no-projects-icon">📂</div>
                        <h3 className="no-projects-title">No Projects Found</h3>
                        <p className="no-projects-message">
                            No{" "}
                            {filter.charAt(0).toUpperCase() + filter.slice(1)}{" "}
                            projects match your filter.
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="projects-grid" key={filter}>
                <AnimatePresence>
                    {filteredProjects.map((project) => (
                        <motion.div
                            key={project.name}
                            className="project-card"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="card-header">
                                <h3>{project.name}</h3>
                                <span className="project-type">
                                    {project.type}
                                </span>
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
                                                        alt={`${project.name} ${
                                                            i + 1
                                                        }`}
                                                    />
                                                </div>
                                            </SwiperSlide>
                                        ))
                                    ) : (
                                        <SwiperSlide>
                                            <div className="image-container">
                                                <span>No images</span>
                                            </div>
                                        </SwiperSlide>
                                    )}
                                </Swiper>
                            </div>

                            <div className="card-content">
                                <div className="project-meta-row">
                                    <div className="project-timeframe-pill">
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

                                <div className="project-description">
                                    {project.description}
                                </div>

                                <div className="project-skills">
                                    <strong>Skills:</strong>
                                    <div className="skills-container">
                                        {project.skills.map((skill, i) => (
                                            <span key={i} className="skill-tag">
                                                {skill}
                                            </span>
                                        ))}
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
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {showTopBtn && (
                <motion.button
                    className="scroll-to-top-btn"
                    onClick={scrollToTop}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <FaArrowUp />
                </motion.button>
            )}
        </div>
    );
};

export default ProjectsList;
