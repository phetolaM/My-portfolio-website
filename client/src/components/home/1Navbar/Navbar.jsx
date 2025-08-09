import React from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import "./navbar.css";

import myCV from "../../../assets/myCV/MashashaneCV.pdf";


function Navbar({ toggleDarkMode, darkMode }) {
    const handleDownload = () => {
        window.open(myCV, "_blank");
        const link = document.createElement("a");
        link.href = myCV;
        link.download = "Phetola_Mashashane_CV.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <header className="header">
            <div className="portfolio-container">
                <div className="header-content">
                    <div className="header-text">
                        <h1 className="hero-title">Phetola Mashashane</h1>
                        <p className="hero-subtitle">
                            Software Developer / Backend Developer
                        </p>
                        <p className="hero-description">
                            I build robust and scalable backend systems with
                            modern technologies
                        </p>
                    </div>

                    <div className="header-actions">
                        <button
                            className="hero-button"
                            onClick={handleDownload}
                        >
                            Download Resume
                        </button>

                        <button
                            className="dark-mode-toggle"
                            onClick={toggleDarkMode}
                        >
                            {darkMode ? (
                                <FaSun className="mode-icon sun-icon" />
                            ) : (
                                <FaMoon className="mode-icon moon-icon" />
                            )}
                            <span className="sr-only">
                                {darkMode
                                    ? "Switch to Light Mode"
                                    : "Switch to Dark Mode"}
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Navbar;
