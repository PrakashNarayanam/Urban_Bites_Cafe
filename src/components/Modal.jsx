import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

const Modal = ({ isOpen, onClose, category, menuData, onAddToCart, cartItems }) => {
    const [selectedItem, setSelectedItem] = useState(null);
    const [addedFeedback, setAddedFeedback] = useState(false);
    const modalRef = useRef(null);
    const contentRef = useRef(null);
    const detailsRef = useRef(null);

    // Lock body scroll when modal opens
    useEffect(() => {
        if (isOpen) {
            document.body.classList.add('modal-open');
        } else {
            document.body.classList.remove('modal-open');
        }
        return () => {
            document.body.classList.remove('modal-open');
        };
    }, [isOpen]);

    useEffect(() => {
        if (isOpen && category && menuData[category]) {
            setSelectedItem(menuData[category].items[0]);
            setAddedFeedback(false);
            gsap.fromTo(contentRef.current,
                { scale: 0.93, opacity: 0, y: 20 },
                { scale: 1, opacity: 1, y: 0, duration: 0.45, ease: 'back.out(1.5)' }
            );
        }
    }, [isOpen, category, menuData]);

    const handleItemClick = (item) => {
        setAddedFeedback(false);
        gsap.to(detailsRef.current, {
            opacity: 0, x: 16, duration: 0.18, onComplete: () => {
                setSelectedItem(item);
                gsap.to(detailsRef.current, { opacity: 1, x: 0, duration: 0.28, ease: 'power2.out' });
            }
        });
    };

    const handleClose = () => {
        gsap.to(contentRef.current, {
            scale: 0.93, opacity: 0, y: 20, duration: 0.28, ease: 'power2.in', onComplete: onClose
        });
    };

    const handleAddToCart = () => {
        if (selectedItem && onAddToCart) {
            onAddToCart(selectedItem);
            setAddedFeedback(true);
            setTimeout(() => setAddedFeedback(false), 1800);
        }
    };

    if (!isOpen) return null;

    const data = menuData[category];

    // Check if current item is permanently in cart
    const isItemInCart = selectedItem && cartItems && cartItems.some(i => i.name === selectedItem.name);

    return (
        <div className="detail-modal" ref={modalRef}>
            {/* Backdrop */}
            <div className="modal-bg" onClick={handleClose}></div>

            {/* Modal box */}
            <div className="modal-content-glass" ref={contentRef}>

                {/* Close button */}
                <button className="close-modal" onClick={handleClose} aria-label="Close">
                    &times;
                </button>

                {/* Two-panel grid — fills height, each panel scrolls independently */}
                <div className="modal-grid">

                    {/* LEFT: item list */}
                    <div className="modal-list-side">
                        <h2 id="modal-cat-title">{data.title}</h2>
                        <div className="item-list">
                            {data.items.map((item, idx) => (
                                <div
                                    key={idx}
                                    className={`list-item ${selectedItem === item ? 'active' : ''}`}
                                    onClick={() => handleItemClick(item)}
                                >
                                    <h4>{item.name}</h4>
                                    <span>{item.price}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT: item details */}
                    <div className="modal-info-side">
                        {selectedItem && (
                            <div className="details-view" ref={detailsRef}>
                                <div className="detail-img-frame">
                                    <img
                                        src={selectedItem.img}
                                        alt={selectedItem.name}
                                        onError={(e) => {
                                            e.target.src = 'https://images.unsplash.com/photo-1763478279936-4d8f6e86b42c?auto=format&fit=crop&w=800&q=80';
                                        }}
                                    />
                                </div>
                                <div className="detail-text">
                                    <h3>{selectedItem.name}</h3>
                                    <p className="desc">{selectedItem.desc}</p>
                                    <div className="detail-meta">
                                        <div className="meta-box">
                                            <label>Taste Profile</label>
                                            <p>{selectedItem.taste}</p>
                                        </div>
                                        <div className="meta-box">
                                            <label>Key Ingredients</label>
                                            <p>{selectedItem.ingredients}</p>
                                        </div>
                                    </div>
                                    <div className="detail-price-box">
                                        <span>{selectedItem.price}</span>
                                        <button
                                            className={`btn btn-primary add-cart-btn ${addedFeedback || isItemInCart ? 'added' : ''}`}
                                            onClick={handleAddToCart}
                                            disabled={isItemInCart}
                                            style={isItemInCart ? { background: '#22c55e', pointerEvents: 'none' } : {}}
                                        >
                                            {isItemInCart ? '✓ Added to Cart!' : (addedFeedback ? '✓ Added to Cart!' : '🛒 Add to Cart')}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Modal;
