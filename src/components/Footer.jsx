import React from 'react';

const Footer = () => {
    return (
        <footer className="footer-main">
            <div className="container">
                <div className="footer-grid-main">
                    <div className="footer-brand">
                        <div className="footer-logo">URBAN<span>BITES.</span></div>
                        <p className="footer-tagline">
                            Engineering the future of taste with artisanal craftsmanship
                            and a passion for culinary excellence since 2010.
                        </p>
                        <div className="footer-social-new">
                            <a href="https://www.instagram.com/rspl_academy/" target="_blank" rel="noopener noreferrer" className="social-link-btn" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
                            <a href="https://ranbidge-solutions-private-limited.onrender.com/" target="_blank" rel="noopener noreferrer" className="social-link-btn" aria-label="Website"><i className="fas fa-globe"></i></a>
                            <a href="https://www.youtube.com/@rspl-academy" target="_blank" rel="noopener noreferrer" className="social-link-btn" aria-label="YouTube"><i className="fab fa-youtube"></i></a>
                            <a href="https://linkedin.com/in/ranbidge-solutions-private-limited-company-a98983376" target="_blank" rel="noopener noreferrer" className="social-link-btn" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
                        </div>
                    </div>

                    <div className="footer-links-col">
                        <h4>Navigations</h4>
                        <ul>
                            <li><a href="#">Home</a></li>
                            <li><a href="#menu">Artisan Menu</a></li>
                            <li><a href="#masterpieces">Featured Gems</a></li>
                            <li><a href="#offers">Special Deals</a></li>
                        </ul>
                    </div>

                    <div className="footer-links-col">
                        <h4>Company</h4>
                        <ul>
                            <li><a href="#">Our Story</a></li>
                            <li><a href="#">Master Chefs</a></li>
                            <li><a href="#">Careers</a></li>
                            <li><a href="#">Contact Us</a></li>
                        </ul>
                    </div>

                    <div className="footer-links-col">
                        <h4>Visit Us</h4>
                        <p>Monday - Friday: 11 AM - 11 PM</p>
                        <p>Saturday - Sunday: 10 AM - 12 PM</p>
                        <p>123 Culinary Drive, New Delhi</p>
                    </div>
                </div>

                <div className="footer-bottom">
                    <div className="footer-bottom-flex">
                        <p>&copy; 2026 <strong>Ranbise Solutions Private Limited</strong>. All rights reserved.</p>
                        <div className="footer-bottom-links">
                            <a href="#">Privacy Policy</a>
                            <a href="#">Terms of Service</a>
                            <a href="#">Cookie Policy</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
