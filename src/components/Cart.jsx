import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

const Cart = ({ isOpen, onClose, cartItems, onUpdateQty, onRemove, onClearCart }) => {
    const [step, setStep] = useState('cart'); // 'cart' | 'checkout' | 'success'
    const [formData, setFormData] = useState({ name: '', phone: '', address: '', payment: 'cod' });
    const panelRef = useRef(null);

    useEffect(() => {
        if (!panelRef.current) return;
        if (isOpen) {
            setStep('cart');
            gsap.fromTo(panelRef.current,
                { x: '100%', opacity: 0 },
                { x: '0%', opacity: 1, duration: 0.4, ease: 'power3.out' }
            );
        }
    }, [isOpen]);

    const handleClose = () => {
        gsap.to(panelRef.current, {
            x: '100%', opacity: 0, duration: 0.3, ease: 'power2.in',
            onComplete: onClose
        });
    };

    const total = cartItems.reduce((sum, item) => {
        const price = parseInt(item.price.replace(/[^\d]/g, ''), 10) || 0;
        return sum + price * item.qty;
    }, 0);

    if (!isOpen) return null;

    return (
        <div className="cart-overlay">
            <div className="cart-backdrop" onClick={handleClose} />
            <div className="cart-panel" ref={panelRef}>
                {/* Header */}
                <div className="cart-header">
                    {step === 'cart' && <h2>🛒 Your Cart</h2>}
                    {step === 'checkout' && <h2>Checkout Details</h2>}
                    {step === 'success' && <h2>Order Complete</h2>}
                    <button className="cart-close-btn" onClick={handleClose} aria-label="Close cart">✕</button>
                </div>

                {step === 'cart' && (
                    <>
                        {/* Items */}
                        <div className="cart-items-list">
                            {cartItems.length === 0 ? (
                                <div className="cart-empty">
                                    <div className="cart-empty-icon">🍽️</div>
                                    <p>Your cart is empty</p>
                                    <span>Add delicious items from the menu!</span>
                                </div>
                            ) : (
                                cartItems.map((item, idx) => {
                                    const priceVal = parseInt(item.price.replace(/[^\d]/g, ''), 10) || 0;
                                    return (
                                        <div key={idx} className="cart-item-row">
                                            <img
                                                src={item.img}
                                                alt={item.name}
                                                onError={e => { e.target.src = 'https://images.unsplash.com/photo-1763478279936-4d8f6e86b42c?auto=format&fit=crop&w=200&q=60'; }}
                                            />
                                            <div className="cart-item-info">
                                                <p className="cart-item-name">{item.name}</p>
                                                <p className="cart-item-price">₹{priceVal} × {item.qty} = <strong>₹{priceVal * item.qty}</strong></p>
                                            </div>
                                            <div className="cart-qty-controls">
                                                <button onClick={() => onUpdateQty(item, item.qty - 1)} aria-label="Decrease">−</button>
                                                <span>{item.qty}</span>
                                                <button onClick={() => onUpdateQty(item, item.qty + 1)} aria-label="Increase">+</button>
                                            </div>
                                            <button className="cart-remove-btn" onClick={() => onRemove(item)} aria-label="Remove">🗑</button>
                                        </div>
                                    );
                                })
                            )}
                        </div>

                        {/* Footer */}
                        {cartItems.length > 0 && (
                            <div className="cart-footer">
                                <div className="cart-total-row">
                                    <span>Subtotal ({cartItems.reduce((s, i) => s + i.qty, 0)} items)</span>
                                    <strong>₹{total}</strong>
                                </div>
                                <div className="cart-total-row cart-grand">
                                    <span>Delivery</span>
                                    <strong className="cart-free">FREE</strong>
                                </div>
                                <div className="cart-divider" />
                                <div className="cart-total-row cart-final">
                                    <span>Total</span>
                                    <strong>₹{total}</strong>
                                </div>
                                <button className="cart-checkout-btn btn-glow" onClick={() => setStep('checkout')}>
                                    Proceed to Checkout →
                                </button>
                            </div>
                        )}
                    </>
                )}

                {step === 'checkout' && (
                    <form
                        className="cart-checkout-form"
                        onSubmit={(e) => {
                            e.preventDefault();
                            setStep('success');
                            if (onClearCart) onClearCart();
                        }}
                    >
                        <div className="cart-checkout-scroll">
                            <div className="form-group">
                                <label>Full Name</label>
                                <input required type="text" placeholder="John Doe" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Phone Number</label>
                                <input required type="tel" placeholder="+91 99999 99999" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Delivery Address</label>
                                <textarea required rows="3" placeholder="Apartment, Street info, Landmark" value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })}></textarea>
                            </div>

                            <div className="checkout-payment-options">
                                <label>Payment Method</label>
                                <div className="payment-radio-group">
                                    <label className={`payment-radio ${formData.payment === 'cod' ? 'selected' : ''}`}>
                                        <input type="radio" name="payment" value="cod" checked={formData.payment === 'cod'} onChange={e => setFormData({ ...formData, payment: e.target.value })} />
                                        <span>Cash on Delivery</span>
                                    </label>
                                    <label className={`payment-radio ${formData.payment === 'card' ? 'selected' : ''}`}>
                                        <input type="radio" name="payment" value="card" checked={formData.payment === 'card'} onChange={e => setFormData({ ...formData, payment: e.target.value })} />
                                        <span>Credit / Debit Card</span>
                                    </label>
                                    <label className={`payment-radio ${formData.payment === 'upi' ? 'selected' : ''}`}>
                                        <input type="radio" name="payment" value="upi" checked={formData.payment === 'upi'} onChange={e => setFormData({ ...formData, payment: e.target.value })} />
                                        <span>UPI Payments</span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="cart-footer">
                            <div className="cart-total-row cart-final" style={{ marginBottom: '0.5rem' }}>
                                <span>Amount to Pay</span>
                                <strong>₹{total}</strong>
                            </div>
                            <button className="cart-checkout-btn btn-glow" type="submit">
                                Confirm & Place Order
                            </button>
                            <button type="button" className="cart-back-btn" onClick={() => setStep('cart')}>← Back to Cart</button>
                        </div>
                    </form>
                )}

                {step === 'success' && (
                    <div className="cart-success-view">
                        <div className="success-icon-wrap">
                            <div className="success-check">✓</div>
                        </div>
                        <h3>Order Successfully Placed!</h3>
                        <p>Your food will be arriving soon. We&apos;ve sent a confirmation to your phone.</p>
                        <div className="cart-footer" style={{ width: '100%', marginTop: 'auto' }}>
                            <button className="cart-checkout-btn btn-glow" onClick={handleClose}>
                                Continue Browsing
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
