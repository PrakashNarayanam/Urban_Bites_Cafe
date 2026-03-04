import React, { useState, useEffect } from 'react';

const Navbar = ({ cartCount, onCartOpen }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
            <div className="nav-container">
                <a href="#" className="logo">URBAN<span>BITES.</span></a>

                <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
                    <li><a href="#" className="nav-item active">Home</a></li>
                    <li><a href="#menu" className="nav-item">Menu</a></li>
                    <li><a href="#masterpieces" className="nav-item">Masterpieces</a></li>
                    <li><a href="#about" className="nav-item">About</a></li>
                    <li><a href="#offers" className="nav-item">Offers</a></li>
                    <li><a href="#contact" className="nav-item">Contact</a></li>
                </ul>

                <div className="nav-actions">
                    <button
                        className="btn-glow order-btn"
                        onClick={onCartOpen}
                        style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '8px' }}
                    >
                        Cart
                        {cartCount > 0 && (
                            <span className="cart-badge" style={{ position: 'relative', top: 'auto', right: 'auto', margin: '0 -4px' }}>
                                {cartCount}
                            </span>
                        )}
                    </button>
                    <div className={`menu-toggle ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
