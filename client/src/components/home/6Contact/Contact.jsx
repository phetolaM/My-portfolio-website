import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { socialLinks } from "../../data/ProjectData";
import "./contact.css";

function Contact() {
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const showSuccessToast = () => {
        toast.success("Message sent successfully!", {
            duration: 5000,
            style: {
                background: "#4ade80",
                color: "#fff",
                padding: "16px 24px",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            },
            iconTheme: {
                primary: "#fff",
                secondary: "#4ade80",
            },
        });
    };

    const showErrorToast = (message) => {
        toast.error(message || "Failed to send message. Please try again.", {
            duration: 5000,
            style: {
                background: "#ef4444",
                color: "#fff",
                padding: "16px 24px",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            },
            iconTheme: {
                primary: "#fff",
                secondary: "#ef4444",
            },
        });
    };

    const validateForm = () => {
        if (!form.name.trim()) {
            showErrorToast("Please enter your name");
            return false;
        }

        if (!form.email.trim()) {
            showErrorToast("Please enter your email");
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(form.email)) {
            showErrorToast("Please enter a valid email address");
            return false;
        }

        if (!form.message.trim()) {
            showErrorToast("Please enter your message");
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch("https://formspree.io/f/mkgzkwoy", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    name: form.name,
                    email: form.email,
                    message: form.message,
                }),
            });

            if (response.ok) {
                showSuccessToast();
                setForm({ name: "", email: "", message: "" });
            } else {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to send message");
            }
        } catch (err) {
            console.error("Form submission error:", err);
            showErrorToast();
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="portfolio-container" id="contact">
            <Toaster
                position="top-center"
                containerStyle={{
                    top: "80px",
                }}
                toastOptions={{
                    success: { duration: 5000 },
                    error: { duration: 5000 },
                }}
            />

            <section className="contact-section">
                <h2 className="section-title">Contact</h2>

                <div className="contact-container">
                    <form onSubmit={handleSubmit} className="contact-form">
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                className="input"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="Your Name"
                                name="name"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                className="input"
                                placeholder="Your Email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="message">Message</label>
                            <textarea
                                id="message"
                                placeholder="Your Message"
                                rows="5"
                                name="message"
                                className="textarea"
                                value={form.message}
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="contact-button"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <div className="button-loader">
                                    <div className="loader-dot"></div>
                                    <div className="loader-dot"></div>
                                    <div className="loader-dot"></div>
                                </div>
                            ) : (
                                "Send Message"
                            )}
                        </button>
                    </form>

                    <div className="contact-info">
                        <h3 className="info-title">Get in Touch</h3>
                        <p className="info-description">
                            Have a project in mind or want to discuss potential
                            opportunities? Feel free to reach out!
                        </p>

                        <div className="contact-details">
                            <div className="detail-item">
                                <span className="detail-icon">📧</span>
                                <span>pemashashane2@gmail.com</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-icon">📞</span>
                                <span>+27 66 212 6872</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-icon">📍</span>
                                <span>Johannesburg, South Africa</span>
                            </div>
                        </div>

                        <div className="social-links">
                            <a
                                href={socialLinks.github}
                                rel="noopener noreferrer"
                                className="social-icon"
                                target="_blank"
                            >
                                <span className="icon">🐙</span>
                                <span>GitHub</span>
                            </a>
                            <a
                                href={socialLinks.linkedin}
                                rel="noopener noreferrer"
                                className="social-icon"
                                target="_blank"
                            >
                                <span className="icon">👔</span>
                                <span>LinkedIn</span>
                            </a>
                            <a
                                href={`mailto:${socialLinks.email}`}
                                rel="noopener noreferrer"
                                className="social-icon"
                            >
                                <span className="icon">✉️</span>
                                <span>Email</span>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="footer">
                <p>
                    © {new Date().getFullYear()} Phetola Mashashane. All rights
                    reserved.
                </p>
            </footer>
        </div>
    );
}

export default Contact;
