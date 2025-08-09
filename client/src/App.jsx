import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/home/1Navbar/Navbar";
import AboutMe from "./components/home/2About/About";
import PortfolioProjectsSection from "./components/home/3Projects/ProjectsSection";
import SkillsSection from "./components/home/4Skills/Skills";
import Education from "./components/home/5Education/Education";
import Contact from "./components/home/6Contact/Contact";

import ProjectsList from "./components/navigation/Projects/ProjectsPage";
import ScrollToTop from "./components/main/ScrollToTop";
import "./index.css";

function App() {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        document.body.classList.toggle("dark", darkMode);
    }, [darkMode]);

    const toggleDarkMode = () => {
        setDarkMode((prev) => !prev);
    };

    return (
        <div className={`app${darkMode ? " dark" : ""}`}>
            <ScrollToTop />
            <Navbar toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
            <Routes>
                <Route
                    path="/"
                    element={
                        <>
                            <AboutMe />
                            <PortfolioProjectsSection />
                            <SkillsSection />
                            <Education />
                            <Contact />
                        </>
                    }
                />
                {/* Add more routes if needed */}
                <Route path="/projects" element={<ProjectsList />} />
            </Routes>
        </div>
    );
}

export default App;
