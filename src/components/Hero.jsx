import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
    const heroRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {

            /* ----------------------------------------------------------------
               LAYER 1 — Background image parallax
               Shifts backgroundPosition for pure CSS background-image divs
            ---------------------------------------------------------------- */
            gsap.to('.hero-bg-img', {
                backgroundPositionY: '65%',   // shifts from 30% → 65% as scrolled
                ease: 'none',
                scrollTrigger: {
                    trigger: '.hero',
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 1,
                },
            });

            /* ----------------------------------------------------------------
               LAYER 2 — Dark overlay (gets slightly lighter as you scroll,
               revealing the transition to the next section)
            ---------------------------------------------------------------- */
            gsap.to('.hero-bg-overlay', {
                opacity: 0.4,
                ease: 'none',
                scrollTrigger: {
                    trigger: '.hero',
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 1.5,
                },
            });

            /* ----------------------------------------------------------------
               LAYER 3 — Hero content / text (medium speed + fades out early)
            ---------------------------------------------------------------- */
            gsap.to('.hero-content', {
                yPercent: -18,         // rises faster than bg = parallax gap
                opacity: 0,
                ease: 'none',
                scrollTrigger: {
                    trigger: '.hero',
                    start: 'top top',
                    end: '60% top',    // text fades before BG finishes
                    scrub: 1.2,
                },
            });

            /* ----------------------------------------------------------------
               LAYER 4 — Food cards (fastest layer, floats off first)
            ---------------------------------------------------------------- */
            gsap.to('.card-top', {
                yPercent: -32,
                xPercent: -8,
                opacity: 0,
                ease: 'none',
                scrollTrigger: {
                    trigger: '.hero',
                    start: 'top top',
                    end: '55% top',
                    scrub: 0.8,
                },
            });

            gsap.to('.card-bottom', {
                yPercent: -28,
                xPercent: 8,
                opacity: 0,
                ease: 'none',
                scrollTrigger: {
                    trigger: '.hero',
                    start: 'top top',
                    end: '50% top',
                    scrub: 0.9,
                },
            });

            /* ----------------------------------------------------------------
               LAYER 5 — Floating pill badge (own speed, slight side drift)
            ---------------------------------------------------------------- */
            gsap.to('.hero-float-badge', {
                yPercent: -22,
                opacity: 0,
                ease: 'none',
                scrollTrigger: {
                    trigger: '.hero',
                    start: 'top top',
                    end: '45% top',
                    scrub: 0.6,
                },
            });

            /* ----------------------------------------------------------------
               LAYER 6 — Scroll indicator (fades out immediately on scroll)
            ---------------------------------------------------------------- */
            gsap.to('.scroll-indicator', {
                opacity: 0,
                ease: 'none',
                scrollTrigger: {
                    trigger: '.hero',
                    start: 'top top',
                    end: '15% top',
                    scrub: true,
                },
            });

            /* ----------------------------------------------------------------
               ENTRANCE ANIMATION (plays on load, before scrolling)
            ---------------------------------------------------------------- */
            const tl = gsap.timeline({ delay: 0.15 });

            tl.from('.hero-bg-img', {
                scale: 1.1,
                duration: 2.0,
                ease: 'power3.out',
            })
                .from('.hero-title', {
                    y: 50, opacity: 0, duration: 0.9, ease: 'power3.out',
                }, '-=1.4')
                .from('.hero-subtitle', {
                    y: 28, opacity: 0, duration: 0.8, ease: 'power3.out',
                }, '-=0.7')
                .from('.hero-btns', {
                    y: 22, opacity: 0, duration: 0.7, ease: 'power3.out',
                }, '-=0.65')
                .from('.hero-stats-row', {
                    y: 18, opacity: 0, duration: 0.7, ease: 'power3.out',
                }, '-=0.55')
                .from('.card-top', {
                    y: 70, opacity: 0, rotate: -3, duration: 1.0, ease: 'power3.out',
                }, '-=0.8')
                .from('.card-bottom', {
                    y: 90, opacity: 0, rotate: 3, duration: 1.0, ease: 'power3.out',
                }, '-=0.75')
                .from('.hero-float-badge', {
                    scale: 0.7, opacity: 0, duration: 0.6, ease: 'back.out(1.8)',
                }, '-=0.5')
                .from('.scroll-indicator', {
                    opacity: 0, y: 8, duration: 0.5,
                }, '-=0.2');

        }, heroRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="hero" ref={heroRef}>

            {/* ── Layer 1: Background image ── */}
            <div className="hero-bg">
                <div
                    className="hero-bg-img"
                    style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1920&q=85')`,
                    }}
                    role="img"
                    aria-label="Indian restaurant food spread"
                ></div>
                {/* ── Layer 2: Gradient overlay ── */}
                <div className="hero-bg-overlay"></div>
            </div>

            {/* ── Layer 3: Main content ── */}
            <div className="hero-main-container container">
                <div className="hero-inner">

                    <div className="hero-content">

                        <h1 className="hero-title">
                            Fresh&nbsp;&amp;&nbsp;Desi <br />
                            <span className="gradient-text">Every&nbsp;Bite Counts</span>
                        </h1>

                        <p className="hero-subtitle">
                            Shawarma • Pizzas • Biryani • Manchurian • Noodles &amp; more —
                            made fresh daily at <strong style={{ color: '#fff' }}>UrbanBites Cafe</strong>.
                        </p>

                        <div className="hero-btns">
                            <button
                                className="btn-hero-primary"
                                onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
                            >
                                Explore Menu
                                <span className="btn-arrow">→</span>
                            </button>
                            <button
                                className="btn-hero-secondary"
                                onClick={() => alert('service is off currently due to technical issues')}
                            >
                                Order Now
                            </button>
                        </div>

                        <div className="hero-stats-row">
                            <div className="hero-stat">
                                <strong>4.9★</strong>
                                <span>Rating</span>
                            </div>
                            <div className="hero-stat-divider"></div>
                            <div className="hero-stat">
                                <strong>120+</strong>
                                <span>Dishes</span>
                            </div>
                            <div className="hero-stat-divider"></div>
                            <div className="hero-stat">
                                <strong>25&nbsp;min</strong>
                                <span>Avg. Delivery</span>
                            </div>
                        </div>
                    </div>

                    {/* ── Layers 4 & 5: Floating cards + pill ── */}
                    <div className="hero-visual-stack">
                        {/* Card: Classic Chicken Shawarma */}
                        <div className="hero-food-card card-top">
                            <img
                                src="https://images.unsplash.com/photo-1632761327178-595229-7830a5c91f9f?auto=format&fit=crop&w=600&q=80"
                                alt="Classic Chicken Shawarma"
                                onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1763478279936-4d8f6e86b42c?auto=format&fit=crop&w=600&q=80'; }}
                            />
                            <div className="hero-food-card-info">
                                <span className="food-card-tag">Chef's Pick</span>
                                <p className="food-card-name">Classic Chicken Shawarma</p>
                                <p className="food-card-price">₹120</p>
                            </div>
                        </div>

                        {/* Card: Chicken Biryani */}
                        <div className="hero-food-card card-bottom">
                            <img
                                src="https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80"
                                alt="Chicken Biryani"
                                onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1763478279936-4d8f6e86b42c?auto=format&fit=crop&w=600&q=80'; }}
                            />
                            <div className="hero-food-card-info">
                                <span className="food-card-tag">20% OFF</span>
                                <p className="food-card-name">Chicken Biryani</p>
                                <p className="food-card-price">₹250</p>
                            </div>
                        </div>

                        {/* ── Layer 5: Delivery pill ── */}
                        <div className="hero-float-badge">
                            <div className="float-badge-icon">🍽️</div>
                            <div>
                                <p className="float-badge-label">Order Ready</p>
                                <p className="float-badge-sub">Avg. 25 min delivery</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* ── Layer 6: Scroll indicator ── */}
            <div className="scroll-indicator">
                <div className="mouse">
                    <div className="wheel"></div>
                </div>
            </div>

        </section>
    );
};

export default Hero;
