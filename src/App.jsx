import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MenuCarousel from './components/MenuCarousel';
import Masterpieces from './components/Masterpieces';
import About from './components/About';
import OfferBanner from './components/OfferBanner';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Modal from './components/Modal';
import Cart from './components/Cart';
import { menuData } from './data/menuData';

function App() {
    const [modalState, setModalState] = useState({ isOpen: false, category: null });
    const [cartOpen, setCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        // Initialize Lenis Smooth Scroll
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);

    const openCategory = (category) => {
        if (!menuData[category]) return;
        setModalState({ isOpen: true, category });
        document.body.classList.add('modal-open');
    };

    const closeCategory = () => {
        setModalState({ isOpen: false, category: null });
        document.body.classList.remove('modal-open');
    };

    // ---- Cart handlers ----
    const handleAddToCart = (item) => {
        setCartItems(prev => {
            const existing = prev.find(i => i.name === item.name);
            if (existing) {
                return prev.map(i => i.name === item.name ? { ...i, qty: i.qty + 1 } : i);
            }
            return [...prev, { ...item, qty: 1 }];
        });
    };

    const handleUpdateQty = (item, newQty) => {
        if (newQty <= 0) {
            handleRemoveItem(item);
        } else {
            setCartItems(prev => prev.map(i => i.name === item.name ? { ...i, qty: newQty } : i));
        }
    };

    const handleRemoveItem = (item) => {
        setCartItems(prev => prev.filter(i => i.name !== item.name));
    };

    const handleClearCart = () => {
        setCartItems([]);
    };

    const cartCount = cartItems.reduce((sum, i) => sum + i.qty, 0);

    return (
        <div className="app-wrapper">
            <Navbar
                cartCount={cartCount}
                onCartOpen={() => setCartOpen(true)}
            />
            <Hero />
            <MenuCarousel onCategorySelect={openCategory} />
            <Masterpieces
                onCategorySelect={openCategory}
                onAddToCart={handleAddToCart}
                cartItems={cartItems}
            />
            <About />
            <OfferBanner />
            <Contact />
            <Footer />

            <Modal
                isOpen={modalState.isOpen}
                onClose={closeCategory}
                category={modalState.category}
                menuData={menuData}
                onAddToCart={handleAddToCart}
                cartItems={cartItems}
            />

            <Cart
                isOpen={cartOpen}
                onClose={() => setCartOpen(false)}
                cartItems={cartItems}
                onUpdateQty={handleUpdateQty}
                onRemove={handleRemoveItem}
                onClearCart={handleClearCart}
            />
        </div>
    );
}

export default App;
