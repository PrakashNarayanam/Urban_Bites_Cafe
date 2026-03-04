import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.contact-wrapper', {
                scrollTrigger: {
                    trigger: '.contact',
                    start: 'top 80%',
                },
                y: 50,
                opacity: 0,
                duration: 1.2,
                ease: 'power3.out'
            });
            gsap.from('.form-group', {
                scrollTrigger: {
                    trigger: '.contact',
                    start: 'top 70%',
                },
                y: 20,
                opacity: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: 'power3.out'
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section className="contact" id="contact" ref={sectionRef}>
            <div className="container">
                <div className="contact-wrapper">
                    <div className="contact-info">
                        <div className="section-header">
                            <span className="eyebrow">Get in Touch</span>
                            <h2 className="section-title">Let&apos;s Talk <br /><span className="gradient-text">Gourmet</span></h2>
                        </div>
                        <p className="hero-subtitle">
                            Have a question about our secret spices or want to book a private artisanal experience?
                            Our team of culinary consultants is ready to assist you.
                        </p>

                        <div className="info-card">
                            <div className="accent-text">Visit Our Sanctuary</div>
                            <p className="hero-subtitle">123 Culinary Drive, Gourmet District<br />New Delhi, India 110001</p>

                            <div className="social-links">
                                <a href="https://www.instagram.com/rspl_academy/" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
                                <a href="https://ranbidge-solutions-private-limited.onrender.com/" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Website"><i className="fas fa-globe"></i></a>
                                <a href="https://www.youtube.com/@rspl-academy" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="YouTube"><i className="fab fa-youtube"></i></a>
                                <a href="https://linkedin.com/in/ranbidge-solutions-private-limited-company-a98983376" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
                            </div>
                        </div>
                    </div>

                    <div className="contact-main">
                        <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
                            <div className="form-group">
                                <input type="text" placeholder="Your Name" required />
                            </div>
                            <div className="form-group">
                                <input type="email" placeholder="Email Address" required />
                            </div>
                            <div className="form-group">
                                <textarea placeholder="How can we help you?" rows="5" required></textarea>
                            </div>
                            <button className="btn btn-primary" type="submit">Send Message</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
