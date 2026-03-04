import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const OfferBanner = () => {
    const [timeLeft, setTimeLeft] = useState(15730); // 4h 22m 10s
    const sectionRef = useRef(null);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => prev > 0 ? prev - 1 : 15730);
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.to('.offer-img-main', {
                yPercent: 15, // Parallax down
                ease: 'none',
                scrollTrigger: {
                    trigger: '.offers',
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true
                }
            });
            gsap.from('.offer-content-modern', {
                scrollTrigger: {
                    trigger: '.offers',
                    start: 'top 75%'
                },
                x: 100,
                opacity: 0,
                duration: 1.2,
                ease: 'power3.out'
            });
            gsap.from('.offer-visual-modern', {
                scrollTrigger: {
                    trigger: '.offers',
                    start: 'top 75%'
                },
                x: -100,
                opacity: 0,
                duration: 1.2,
                ease: 'power3.out'
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    const formatTime = (seconds) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return `Ends in: ${h.toString().padStart(2, '0')}h ${m.toString().padStart(2, '0')}m ${s.toString().padStart(2, '0')}s`;
    };

    return (
        <section className="offers" id="offers" ref={sectionRef}>
            <div className="container">
                <div className="offer-banner-prime">
                    <div className="offer-visual-modern">
                        <img src="https://images.unsplash.com/photo-1763478279936-4d8f6e86b42c?q=80&w=1200" alt="Flash Sale" className="offer-img-main" />
                        <div className="offer-badge-float">50% OFF</div>
                        <div className="visual-glow"></div>
                    </div>

                    <div className="offer-content-modern">
                        <span className="eyebrow">Flash Weekend Deal</span>
                        <h2 className="offer-title-modern">Artisan Pizza <br /><span className="gradient-text">Midnight Feast</span></h2>
                        <p className="offer-text-modern">
                            Experience our legendary wood-fired sourdough pizzas at half the price.
                            Available for delivery and dine-in. Limited slots available tonight.
                        </p>

                        <div className="offer-footer">
                            <button className="btn btn-primary">Claim Offer Now</button>
                            <span className="offer-timer">{formatTime(timeLeft)}</span>
                        </div>
                        <div className="offer-glow-bg"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OfferBanner;
