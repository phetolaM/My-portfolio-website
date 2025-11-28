import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { 
  FaGithub, 
  FaLinkedin, 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt,
  FaPaperPlane,
  FaUser,
  FaEnvelopeOpen,
  FaComment
} from "react-icons/fa";
import { socialLinks } from "../../data/ProjectData";
import "./contact.css";

function Contact() {
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [focusedField, setFocusedField] = useState(null);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleFocus = (fieldName) => {
        setFocusedField(fieldName);
    };

    const handleBlur = () => {
        setFocusedField(null);
    };

    const showSuccessToast = () => {
        toast.success("Message sent successfully!", {
            duration: 5000,
            style: {
                background: "var(--primary-aqua)",
                color: "var(--white)",
                padding: "16px 24px",
                borderRadius: "12px",
                boxShadow: "0 8px 25px rgba(0, 230, 230, 0.3)",
                border: "1px solid var(--primary-aqua)",
            },
            iconTheme: {
                primary: "var(--white)",
                secondary: "var(--primary-aqua)",
            },
        });
    };

    const showErrorToast = (message) => {
        toast.error(message || "Failed to send message. Please try again.", {
            duration: 5000,
            style: {
                background: "#ef4444",
                color: "var(--white)",
                padding: "16px 24px",
                borderRadius: "12px",
                boxShadow: "0 8px 25px rgba(239, 68, 68, 0.3)",
                border: "1px solid #ef4444",
            },
            iconTheme: {
                primary: "var(--white)",
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
                <div className="contact-header">
                    <h2 className="section-title">Let's Connect</h2>
                    <p className="section-subtitle">
                        Ready to bring your ideas to life? Let's discuss your next project.
                    </p>
                </div>

                <div className="contact-container">
                    {/* Contact Form */}
                    <div className="contact-form-container">
                        <div className="form-header">
                            <div className="form-icon">
                                <FaEnvelopeOpen />
                            </div>
                            <h3>Send me a message</h3>
                            <p>I'll get back to you within 24 hours</p>
                        </div>

                        <form onSubmit={handleSubmit} className="contact-form">
                            <div className={`form-group ${focusedField === 'name' ? 'focused' : ''} ${form.name ? 'filled' : ''}`}>
                                <label htmlFor="name">
                                    <FaUser className="input-icon" />
                                    Your Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    className="input"
                                    value={form.name}
                                    onChange={handleChange}
                                    onFocus={() => handleFocus('name')}
                                    onBlur={handleBlur}
                                    placeholder="Enter your full name"
                                    name="name"
                                    required
                                />
                            </div>

                            <div className={`form-group ${focusedField === 'email' ? 'focused' : ''} ${form.email ? 'filled' : ''}`}>
                                <label htmlFor="email">
                                    <FaEnvelope className="input-icon" />
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    className="input"
                                    placeholder="your.email@example.com"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    onFocus={() => handleFocus('email')}
                                    onBlur={handleBlur}
                                    required
                                />
                            </div>

                            <div className={`form-group ${focusedField === 'message' ? 'focused' : ''} ${form.message ? 'filled' : ''}`}>
                                <label htmlFor="message">
                                    <FaComment className="input-icon" />
                                    Your Message
                                </label>
                                <textarea
                                    id="message"
                                    placeholder="Tell me about your project or inquiry..."
                                    rows="6"
                                    name="message"
                                    className="textarea"
                                    value={form.message}
                                    onChange={handleChange}
                                    onFocus={() => handleFocus('message')}
                                    onBlur={handleBlur}
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
                                    <>
                                        <FaPaperPlane className="button-icon" />
                                        Send Message
                                    </>
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Contact Information */}
                    <div className="contact-info-container">
                        <div className="contact-info">
                            <div className="info-header">
                                <h3>Get in Touch</h3>
                                <p>Let's create something amazing together</p>
                            </div>

                            <div className="contact-details">
                                <div className="detail-item">
                                    <div className="detail-icon">
                                        <FaEnvelope />
                                    </div>
                                    <div className="detail-content">
                                        <h4>Email</h4>
                                        <p>pemashashane2@gmail.com</p>
                                    </div>
                                </div>

                                <div className="detail-item">
                                    <div className="detail-icon">
                                        <FaPhone />
                                    </div>
                                    <div className="detail-content">
                                        <h4>Phone</h4>
                                        <p>+27 66 212 6872</p>
                                    </div>
                                </div>

                                <div className="detail-item">
                                    <div className="detail-icon">
                                        <FaMapMarkerAlt />
                                    </div>
                                    <div className="detail-content">
                                        <h4>Location</h4>
                                        <p>Johannesburg, South Africa</p>
                                    </div>
                                </div>
                            </div>

                            <div className="social-section">
                                <h4>Follow Me</h4>
                                <div className="social-links">
                                    <a
                                        href={socialLinks.github}
                                        rel="noopener noreferrer"
                                        className="social-link"
                                        target="_blank"
                                    >
                                        <div className="social-icon">
                                            <FaGithub />
                                        </div>
                                        <span>GitHub</span>
                                    </a>
                                    <a
                                        href={socialLinks.linkedin}
                                        rel="noopener noreferrer"
                                        className="social-link"
                                        target="_blank"
                                    >
                                        <div className="social-icon">
                                            <FaLinkedin />
                                        </div>
                                        <span>LinkedIn</span>
                                    </a>
                                    <a
                                        href={`mailto:${socialLinks.email}`}
                                        rel="noopener noreferrer"
                                        className="social-link"
                                    >
                                        <div className="social-icon">
                                            <FaEnvelope />
                                        </div>
                                        <span>Email</span>
                                    </a>
                                </div>
                            </div>

                            <div className="availability">
                                <div className="availability-indicator">
                                    <div className="status-dot"></div>
                                    <span>Available for new projects</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="footer">
                <div className="footer-content">
                    <p>
                        © {new Date().getFullYear()} Phetola Mashashane. All rights reserved.
                    </p>
                    <p className="footer-message">
                        Built with passion and attention to detail
                    </p>
                </div>
            </footer>
        </div>
    );
}

export default Contact;