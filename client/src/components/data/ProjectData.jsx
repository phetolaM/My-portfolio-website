// react icons
import { FaReact, FaNodeJs, FaGitAlt, FaGithub } from "react-icons/fa";
import { SiMongodb, SiMongoose, SiExpress } from "react-icons/si";
import { AiOutlineApi } from "react-icons/ai";

// images
// portfolio project
import portfolioImage1 from '../../assets/projects/portfolio website/Screenshot 2025-08-09 124505.png'
import portfolioImage2 from '../../assets/projects/portfolio website/Screenshot 2025-08-09 124517.png'
import portfolioImage3 from '../../assets/projects/portfolio website/Screenshot 2025-08-09 124529.png'

// results calculator
import resultsCalculatorImage1 from '../../assets/projects/results calculator/Screenshot 2025-10-14 224754.png'
import resultsCalculatorImage2 from '../../assets/projects/results calculator/Screenshot 2025-10-14 224826.png'

// on the type, there is fullstack,frontend, backend

const projects = [
    {
        name: "My Portfolio Website",
        type: "frontend",
        skills: ["React", "CSS", "Responsive Design"],
        timeframe: "July 2025 - August 2025",
        gallery: [portfolioImage1, portfolioImage2, portfolioImage3],
        live: "https://phetola-mashashane-portfolio.vercel.app/",
        github: "https://github.com/phetolaM/My-portfolio-website",
    },
    {
        name: "University Results Calculator",
        type: "frontend",
        skills: ["React js", "CSS"],
        timeframe: "oct 2025 - oct 2025",
        gallery: [resultsCalculatorImage1, resultsCalculatorImage2],
        live: "https://results-tracker-blue.vercel.app/",
        github: "https://github.com/phetolaM/results-tracker",
    },
    // {
    //     name: "Blog CMS",
    //     skills: ["React", "Firebase", "Authentication"],
    //     timeframe: "Dec 2024 - Jan 2025",
    //     type: "frontend",
    //     gallery: [image2, image3],
    //     live: "https://blogcms-demo.com",
    //     github: "https://github.com/yourusername/portfolio",
    // },
    // {
    //     name: "Weather App",
    //     skills: ["HTML", "CSS", "JavaScript", "API"],
    //     timeframe: "Nov 2024",
    //     type: "frontend",
    //     gallery: [image3, image4],
    //     live: "https://weather-app-demo.com",
    //     github: "https://github.com/yourusername/portfolio",
    // },
];

const socialLinks = {
    github: "https://github.com/phetolaM",
    linkedin: "https://www.linkedin.com/in/phetola-mashashane-870071268",
    email: "mailto:pemashashane2@gmail.com",
};

const skills = [
    {
        name: "React",
        icon: <FaReact style={{ color: "aqua", fontSize: "3rem" }} />,
        level: 80
    },
    {
        name: "Node.js",
        icon: (
            <FaNodeJs
                style={{
                    color: "green",
                    fontSize: "3rem",
                }}
            />
        ),level: 80
    },
    {
        name: "MongoDB",
        icon: (
            <SiMongodb
                style={{
                    color: "green",
                    fontSize: "3rem",
                }}
            />
        ),level: 80
    },
    {
        name: "Mongoose",
        icon: (
            <SiMongoose
                style={{
                    color: " #800000",
                    fontSize: "3rem",
                }}
            />
        ),level: 80
    },
    {
        name: "Express.js",
        icon: (
            <SiExpress
                style={{
                    color: "#4CAF50",
                    fontSize: "3rem",
                }}
            />
        ),level: 80
    },
    {
        name: "REST APIs",
        icon: (
            <AiOutlineApi
                style={{
                    color: "#E91E63",
                    fontSize: "3rem",
                }}
            />
        ),level: 80
    },
    {
        name: "Git",
        icon: (
            <FaGitAlt
                style={{
                    color: "#F05032",
                    fontSize: "3rem",
                }}
            />
        ),level: 80
    },
    {
        name: "GitHub",
        icon: (
            <FaGithub
                style={{
                    color: "#edececff",
                    fontSize: "3rem",
                }}
            />
        ),level: 80
    },
];

export { projects, socialLinks, skills };
