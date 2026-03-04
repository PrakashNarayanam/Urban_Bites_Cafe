import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.about-visual', {
                scrollTrigger: {
                    trigger: '.about',
                    start: "top 70%",
                },
                x: -100,
                opacity: 0,
                duration: 1.5,
                ease: "power4.out"
            });
            gsap.from('.about-content', {
                scrollTrigger: {
                    trigger: '.about',
                    start: "top 70%",
                },
                x: 100,
                opacity: 0,
                duration: 1.5,
                ease: "power4.out"
            });

            gsap.utils.toArray('.counter').forEach(counter => {
                const target = parseInt(counter.getAttribute('data-target'));
                gsap.to(counter, {
                    scrollTrigger: {
                        trigger: counter,
                        start: "top 90%",
                    },
                    innerText: target,
                    duration: 2,
                    snap: { innerText: 1 },
                    ease: "power1.out",
                    onUpdate: function () {
                        this.targets()[0].innerText = Math.round(this.targets()[0].innerText);
                    }
                });
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="about" id="about" ref={sectionRef}>
            <div className="container">
                <div className="about-wrapper">
                    <div className="about-visual">
                        <div className="about-img-frame">
                            <img src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=800" alt="Chef Crafting" />
                            <div className="img-badge">Est. <br /> 2010</div>
                        </div>
                    </div>

                    <div className="about-content">
                        <div className="section-header">
                            <span className="eyebrow">Our Legacy</span>
                            <h2 className="section-title">Where Passion <br /> Meets the <span className="gradient-text">Plate</span></h2>
                        </div>
                        <p className="hero-subtitle">
                            For over a decade, Urban Bites has been at the forefront of the culinary revolution.
                            We don&apos;t just cook; we engineer experiences using the finest heritage ingredients
                            and modern gastronomic techniques. Every dish is a testament to our commitment
                            to quality and artisanal craftsmanship.
                        </p>

                        <div className="about-stats">
                            <div className="stat-item">
                                <h4 className="counter" data-target="15">0</h4>
                                <span>Years of Art</span>
                            </div>
                            <div className="stat-item">
                                <h4 className="counter" data-target="85">0</h4>
                                <span>Master Chefs</span>
                            </div>
                            <div className="stat-item">
                                <h4 className="counter" data-target="120">0</h4>
                                <span>Unique Dishes</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
