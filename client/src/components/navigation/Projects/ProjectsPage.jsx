import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  FaHome, 
  FaArrowUp, 
  FaGithub, 
  FaExternalLinkAlt,
  FaCalendar,
  FaRocket,
  FaFilter,
  FaCode,
  FaLayerGroup,
  FaServer,
  FaGlobe
} from "react-icons/fa";
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
    const [isMounted, setIsMounted] = useState(false);

    const projectTypes = [
        { key: "all", label: "All Projects", icon: <FaLayerGroup />, count: projects.length },
        { key: "frontend", label: "Frontend", icon: <FaGlobe />, count: projects.filter(p => p.type === "frontend").length },
        { key: "fullstack", label: "Full Stack", icon: <FaCode />, count: projects.filter(p => p.type === "fullstack").length },
        { key: "backend", label: "Backend", icon: <FaServer />, count: projects.filter(p => p.type === "backend").length },
    ];

    const filteredProjects = filter === "all" 
        ? projects 
        : projects.filter((proj) => proj.type === filter);

    const noProjectsFound = filteredProjects.length === 0;

    useEffect(() => {
        setIsMounted(true);
        const handleScroll = () => {
            setShowTopBtn(window.scrollY > 300);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const getProjectIcon = (type) => {
        switch (type) {
            case 'frontend': return <FaGlobe />;
            case 'backend': return <FaServer />;
            case 'fullstack': return <FaCode />;
            default: return <FaCode />;
        }
    };

    if (!isMounted) {
        return <div className="projects-list-container">Loading...</div>;
    }

    return (
        <div className="projects-list-container">
            {/* Header Section */}
            <motion.header 
                className="projects-header"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <div className="header-content">
                    <Link to="/" className="home-button">
                        <FaHome className="home-icon" />
                        Back to Home
                    </Link>
                    
                    <div className="header-text">
                        <h1 className="projects-title">My Projects</h1>
                        <p className="projects-subtitle">
                            A collection of my work and development journey
                        </p>
                    </div>

                    {/* Stats */}
                    <div className="projects-stats">
                        <div className="stat-item">
                            <span className="stat-number">{projects.length}</span>
                            <span className="stat-label">Total Projects</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">
                                {projects.filter(p => p.deployed).length}
                            </span>
                            <span className="stat-label">Live Projects</span>
                        </div>
                    </div>
                </div>
            </motion.header>

            {/* Filters Section */}
            <motion.section 
                className="filters-section"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                <div className="filters-header">
                    <FaFilter className="filter-icon" />
                    <h3>Filter Projects</h3>
                </div>
                
                <div className="project-filters">
                    {projectTypes.map(({ key, label, icon, count }) => (
                        <button
                            key={key}
                            className={`filter-btn ${filter === key ? "active" : ""}`}
                            onClick={() => setFilter(key)}
                            disabled={count === 0 && key !== 'all'}
                        >
                            <span className="filter-icon">{icon}</span>
                            <span className="filter-text">{label}</span>
                            <span className="filter-count">{count}</span>
                        </button>
                    ))}
                </div>

                <div className="filter-info">
                    <p className="project-count-message">
                        Showing {filteredProjects.length} {filter === 'all' ? 'projects' : filter + ' projects'}
                    </p>
                </div>
            </motion.section>

            {/* Projects Grid */}
            <section className="projects-main">
                <AnimatePresence mode="wait">
                    {noProjectsFound ? (
                        <motion.div
                            className="no-projects-card"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="no-projects-icon">🚧</div>
                            <h3 className="no-projects-title">No Projects Found</h3>
                            <p className="no-projects-message">
                                No {filter !== 'all' ? filter + ' ' : ''}projects match your current filter.
                            </p>
                            <button 
                                className="reset-filter-btn"
                                onClick={() => setFilter('all')}
                            >
                                Show All Projects
                            </button>
                        </motion.div>
                    ) : (
                        <motion.div 
                            className="projects-grid"
                            key={filter}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <AnimatePresence>
                                {filteredProjects.map((project, index) => (
                                    <motion.div
                                        key={project.name}
                                        className="project-card"
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        whileHover={{ y: -8 }}
                                    >
                                        {/* Project Badge */}
                                        <div className="project-badge">
                                            {project.featured && (
                                                <span className="featured-badge">
                                                    ⭐ Featured
                                                </span>
                                            )}
                                            <span className={`project-type type-${project.type}`}>
                                                <span className="type-icon">
                                                    {getProjectIcon(project.type)}
                                                </span>
                                                {project.type}
                                            </span>
                                        </div>

                                        {/* Project Gallery */}
                                        <div className="project-gallery">
                                            <Swiper
                                                spaceBetween={0}
                                                slidesPerView={1}
                                                navigation
                                                pagination={{ clickable: true }}
                                                modules={[Navigation, Pagination]}
                                                className="project-swiper"
                                            >
                                                {Array.isArray(project.gallery) && project.gallery.length > 0 ? (
                                                    project.gallery.map((img, i) => (
                                                        <SwiperSlide key={i}>
                                                            <div className="image-container">
                                                                <img
                                                                    src={img}
                                                                    alt={`${project.name} ${i + 1}`}
                                                                    loading="lazy"
                                                                />
                                                                <div className="image-overlay"></div>
                                                            </div>
                                                        </SwiperSlide>
                                                    ))
                                                ) : (
                                                    <SwiperSlide>
                                                        <div className="image-container no-image">
                                                            <div className="placeholder-icon">📱</div>
                                                            <p>Project Preview</p>
                                                        </div>
                                                    </SwiperSlide>
                                                )}
                                            </Swiper>
                                        </div>

                                        {/* Project Content */}
                                        <div className="card-content">
                                            <div className="project-header">
                                                <h3 className="project-name">{project.name}</h3>
                                            </div>

                                            <div className="project-meta-row">
                                                <div className="meta-item">
                                                    <FaCalendar className="meta-icon" />
                                                    <span>{project.timeframe || "Ongoing"}</span>
                                                </div>
                                                {project.deployed && (
                                                    <div className="meta-item deployed">
                                                        <FaRocket className="meta-icon" />
                                                        <span>Live</span>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="project-description">
                                                <p>{project.description || "A modern project showcasing innovative solutions and best practices."}</p>
                                            </div>

                                            <div className="project-skills">
                                                <div className="skills-header">
                                                    <strong>Technologies</strong>
                                                </div>
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
                                                        className="project-button primary"
                                                    >
                                                        <FaExternalLinkAlt className="button-icon" />
                                                        Live Demo
                                                    </a>
                                                )}
                                                {project.github && (
                                                    <a
                                                        href={project.github}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="project-button secondary"
                                                    >
                                                        <FaGithub className="button-icon" />
                                                        Source Code
                                                    </a>
                                                )}
                                                {!project.live && !project.github && (
                                                    <button className="project-button primary" disabled>
                                                        <FaCode className="button-icon" />
                                                        Coming Soon
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    )}
                </AnimatePresence>
            </section>

            {/* Scroll to Top Button */}
            <AnimatePresence>
                {showTopBtn && (
                    <motion.button
                        className="scroll-to-top-btn"
                        onClick={scrollToTop}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <FaArrowUp />
                    </motion.button>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ProjectsList;