import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const categories = [
    {
        id: 'shawarma',
        name: 'Shawarma & Wraps',
        count: '5 items',
        img: 'https://images.unsplash.com/photo-1632761327178-595229-7830a5c91f9f?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 'pizza',
        name: 'Indian Pizzas',
        count: '5 items',
        img: 'https://images.unsplash.com/photo-1665033628673-7de125eb6b12?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 'sandwich',
        name: 'Sandwiches',
        count: '5 items',
        img: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 'fastfood',
        name: 'Manchurian & Noodles',
        count: '6 items',
        img: 'https://images.unsplash.com/photo-1516684669134-de6f7c473a2a?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 'indian',
        name: 'Indian Specials',
        count: '6 items',
        img: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80'
    },
];

const MenuCarousel = ({ onCategorySelect }) => {
    const trackRef = useRef(null);

    useEffect(() => {
        const track = trackRef.current;
        const ctx = gsap.context(() => {
            gsap.to(track, {
                x: '-50%',
                duration: 30,
                repeat: -1,
                ease: 'none',
            });
        }, track);

        const handleMouseEnter = () => gsap.getTweensOf(track).forEach(t => t.pause());
        const handleMouseLeave = () => gsap.getTweensOf(track).forEach(t => t.play());

        track.addEventListener('mouseenter', handleMouseEnter);
        track.addEventListener('mouseleave', handleMouseLeave);

        // Entrance animation
        const ctx2 = gsap.context(() => {
            gsap.from('.section-header.center', {
                scrollTrigger: {
                    trigger: '.menu-discovery',
                    start: 'top 80%'
                },
                y: 30,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out'
            });
            gsap.from('.carousel-container', {
                scrollTrigger: {
                    trigger: '.menu-discovery',
                    start: 'top 75%'
                },
                opacity: 0,
                y: 50,
                duration: 1,
                ease: 'power3.out'
            });
        });

        return () => {
            ctx.revert();
            ctx2.revert();
            if (track) {
                track.removeEventListener('mouseenter', handleMouseEnter);
                track.removeEventListener('mouseleave', handleMouseLeave);
            }
        };
    }, []);

    // Double for infinite loop
    const displayCategories = [...categories, ...categories];

    return (
        <section className="menu-discovery" id="menu">
            <div className="container">
                <div className="section-header center">
                    <span className="eyebrow">Explore Our Menu</span>
                    <h2 className="section-title">
                        Our <span className="gradient-text">Collections</span>
                    </h2>
                    <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem', fontSize: '1rem' }}>
                        Fresh, desi &amp; made with love — Veg &amp; Non-Veg
                    </p>
                </div>
            </div>

            <div className="carousel-container">
                <div className="infinite-track" ref={trackRef}>
                    {displayCategories.map((cat, idx) => (
                        <div
                            key={`${cat.id}-${idx}`}
                            className="cat-card"
                            onClick={() => onCategorySelect(cat.id)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={e => e.key === 'Enter' && onCategorySelect(cat.id)}
                        >
                            <div className="cat-visual">
                                <img
                                    src={cat.img}
                                    alt={cat.name}
                                    loading="lazy"
                                    onError={(e) => {
                                        e.target.src = 'https://images.unsplash.com/photo-1763478279936-4d8f6e86b42c?auto=format&fit=crop&w=800&q=80';
                                    }}
                                />
                            </div>
                            <div className="cat-info">
                                <h3>{cat.name}</h3>
                                <div className="view-list-btn">
                                    <span>{cat.count}</span>
                                    <div className="line"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default MenuCarousel;
