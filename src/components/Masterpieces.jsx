import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ── Today's top picks — one from each category ── */
const masterpieceItems = [
    {
        id: 'shawarma',
        category: 'Shawarma',
        name: 'Classic Chicken Shawarma',
        price: '₹120',
        rating: '4.9',
        tag: 'BESTSELLER',
        img: 'https://images.unsplash.com/photo-1632761327178-595229-7830a5c91f9f?auto=format&fit=crop&w=800&q=80',
        desc: 'Juicy grilled chicken marinated in aromatic spices, wrapped in soft roomali roti with garlic sauce and fresh slaw.',
        badge: '🔴 Non-Veg'
    },
    {
        id: 'pizza',
        category: 'Pizza',
        name: 'Veg Tandoori Pizza',
        price: '₹220',
        rating: '4.8',
        tag: '20% OFF',
        img: 'https://images.unsplash.com/photo-1665033628673-7de125eb6b12?auto=format&fit=crop&w=800&q=80',
        desc: 'Thin crust loaded with tandoori-marinated vegetables, capsicum, onion and melted mozzarella on a spicy red base.',
        badge: '🟢 Veg'
    },
    {
        id: 'sandwich',
        category: 'Sandwich',
        name: 'Bombay Masala Toast',
        price: '₹80',
        rating: '4.7',
        tag: 'MUST TRY',
        img: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80',
        desc: 'The beloved street classic — spiced potato stuffing with green chutney, sev and butter on crisp toasted bread.',
        badge: '🟢 Veg'
    },
    {
        id: 'fastfood',
        category: 'Fast Food',
        name: 'Chicken Manchurian',
        price: '₹160',
        rating: '4.9',
        tag: 'HOT & SPICY',
        img: 'https://images.unsplash.com/photo-1516684669134-de6f7c473a2a?auto=format&fit=crop&w=800&q=80',
        desc: 'Crispy chicken chunks wok-tossed in a bold Indo-Chinese Manchurian sauce with garlic, chilli and spring onion.',
        badge: '🔴 Non-Veg'
    },
    {
        id: 'fastfood',
        category: 'Fast Food',
        name: 'Veg Manchurian',
        price: '₹120',
        rating: '4.8',
        tag: 'BESTSELLER',
        img: 'https://images.unsplash.com/photo-1682989063450-02ab841d54fb?auto=format&fit=crop&w=800&q=80',
        desc: 'Golden crispy vegetable balls tossed in our signature spicy Indo-Chinese Manchurian sauce with fresh spring onions.',
        badge: '🟢 Veg'
    },
    {
        id: 'indian',
        category: 'Indian Special',
        name: 'Chicken Biryani',
        price: '₹250',
        rating: '5.0',
        tag: "CHEF'S PICK",
        img: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80',
        desc: 'Dum-cooked fragrant basmati rice layered with marinated chicken, caramelised onions and whole aromatic spices.',
        badge: '🔴 Non-Veg'
    },
];

const Masterpieces = ({ onCategorySelect, onAddToCart, cartItems = [] }) => {
    const sectionRef = useRef(null);

    useEffect(() => {
        // Make all cards visible immediately - no opacity:0 flash
        const cards = document.querySelectorAll('.mp-food-card');
        cards.forEach(c => { c.style.opacity = '1'; c.style.transform = 'none'; });

        const timer = setTimeout(() => {
            const ctx = gsap.context(() => {
                gsap.from('.mp-header', {
                    scrollTrigger: {
                        trigger: '.masterpieces-section',
                        start: 'top 80%',
                        once: true,
                    },
                    y: 40,
                    opacity: 0,
                    duration: 0.9,
                    ease: 'power3.out',
                });

                gsap.from('.mp-food-card', {
                    scrollTrigger: {
                        trigger: '.mp-food-grid',
                        start: 'top 88%',
                        once: true,
                    },
                    y: 60,
                    opacity: 0,
                    duration: 0.8,
                    stagger: 0.09,
                    ease: 'power3.out',
                });
            }, sectionRef);

            return () => ctx.revert();
        }, 150);

        return () => clearTimeout(timer);
    }, []);

    return (
        <section className="masterpieces-section" id="masterpieces" ref={sectionRef}>
            <div className="container">

                {/* Header */}
                <div className="section-header center mp-header">
                    <span className="eyebrow">Today's Picks</span>
                    <h2 className="section-title">
                        Today's <span className="gradient-text">Masterpieces</span>
                    </h2>
                    <p className="mp-subtitle">
                        Freshly prepared every morning — our most-loved dishes in one place.
                        Click any dish to see the full menu.
                    </p>
                </div>

                {/* Grid */}
                <div className="mp-food-grid">
                    {masterpieceItems.map((item, idx) => (
                        <div
                            key={idx}
                            className="mp-food-card"
                            onClick={() => onCategorySelect && onCategorySelect(item.id)}
                        >
                            {/* Image */}
                            <div className="mp-card-img-wrap">
                                <img
                                    src={item.img}
                                    alt={item.name}
                                    loading="lazy"
                                    onError={(e) => {
                                        e.target.src = 'https://images.unsplash.com/photo-1763478279936-4d8f6e86b42c?auto=format&fit=crop&w=800&q=80';
                                    }}
                                />
                                <span className="mp-card-tag">{item.tag}</span>
                                <div className="mp-card-img-overlay"></div>
                                <span className="mp-veg-badge">{item.badge}</span>
                            </div>

                            {/* Details */}
                            <div className="mp-card-body">
                                <div className="mp-card-meta">
                                    <span className="mp-card-cat">{item.category}</span>
                                    <span className="mp-card-rating">★ {item.rating}</span>
                                </div>
                                <h3 className="mp-card-title">{item.name}</h3>
                                <p className="mp-card-desc">{item.desc}</p>
                                <div className="mp-card-footer">
                                    <span className="mp-card-price">{item.price}</span>
                                    <button
                                        className={`mp-add-btn ${cartItems.some(i => i.name === item.name) ? 'added' : ''}`}
                                        title={cartItems.some(i => i.name === item.name) ? "Added to Cart" : "Add to Cart"}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            if (onAddToCart && !cartItems.some(i => i.name === item.name)) {
                                                onAddToCart(item);
                                            }
                                        }}
                                        aria-label="Add to cart"
                                    >
                                        <span>{cartItems.some(i => i.name === item.name) ? '✓' : '+'}</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Masterpieces;
