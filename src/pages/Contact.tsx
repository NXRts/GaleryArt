import React, { type FormEvent, useState } from 'react';

const Contact: React.FC = () => {
    const [focusedField, setFocusedField] = useState<string | null>(null);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        alert("Thank you for reaching out! We'll get back to you soon.");
    };

    return (
        <div className="page-container fade-in">
            <div className="contact-grid">
                {/* Left Column: Info & Typography */}
                <div className="contact-info">
                    <h1 className="main-title">Get in Touch</h1>
                    <div className="info-block">
                        <p className="description">
                            We are always looking for new talents and collaborations.
                            Whether you're an artist, collector, or just an art enthusiast,
                            we'd love to hear from you.
                        </p>

                        <div className="details">
                            <div className="detail-item">
                                <h3>Visit Us</h3>
                                <p>123 Art Avenue, creative District<br />Jakarta, Indonesia 10110</p>
                            </div>
                            <div className="detail-item">
                                <h3>Inquiries</h3>
                                <p>hello@galeryart.com<br />+62 21 5555 1234</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Minimal Form */}
                <div className="contact-form-wrapper">
                    <form className="minimal-form" onSubmit={handleSubmit}>
                        <div className={`form-group ${focusedField === 'name' ? 'focused' : ''}`}>
                            <label htmlFor="name">your name</label>
                            <input
                                type="text"
                                id="name"
                                required
                                placeholder="Jane Doe"
                                onFocus={() => setFocusedField('name')}
                                onBlur={() => setFocusedField(null)}
                            />
                        </div>

                        <div className={`form-group ${focusedField === 'email' ? 'focused' : ''}`}>
                            <label htmlFor="email">email address</label>
                            <input
                                type="email"
                                id="email"
                                required
                                placeholder="jane@example.com"
                                onFocus={() => setFocusedField('email')}
                                onBlur={() => setFocusedField(null)}
                            />
                        </div>

                        <div className={`form-group ${focusedField === 'message' ? 'focused' : ''}`}>
                            <label htmlFor="message">message</label>
                            <textarea
                                id="message"
                                rows={4}
                                required
                                placeholder="Tell us about your project..."
                                onFocus={() => setFocusedField('message')}
                                onBlur={() => setFocusedField(null)}
                            ></textarea>
                        </div>

                        <button type="submit" className="submit-btn-minimal">
                            Send Message
                            <span className="arrow">→</span>
                        </button>
                    </form>
                </div>
            </div>

            <style>{`
                .page-container {
                    padding: var(--spacing-xl) var(--spacing-md);
                    max-width: 1400px; /* Wider layout */
                    margin: 0 auto;
                    min-height: 90vh;
                    display: flex;
                    align-items: center;
                }

                .contact-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: var(--spacing-xl);
                    width: 100%;
                }

                /* Left Column */
                .contact-info {
                    padding-right: var(--spacing-lg);
                }

                .main-title {
                    font-size: 5rem; /* Huge editorial font */
                    line-height: 1;
                    margin-bottom: var(--spacing-md);
                }

                .description {
                    font-size: 1.2rem;
                    color: var(--color-text-secondary);
                    max-width: 400px;
                    margin-bottom: var(--spacing-lg);
                    font-weight: 300;
                }

                .details {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: var(--spacing-md);
                    margin-top: var(--spacing-lg);
                }

                .detail-item h3 {
                    font-family: var(--font-sans);
                    font-size: 0.9rem;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    margin-bottom: 0.5rem;
                    color: var(--color-accent);
                }

                .detail-item p {
                    color: var(--color-text-secondary);
                    font-size: 0.95rem;
                }

                /* Right Column - Form */
                .contact-form-wrapper {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                }

                .minimal-form {
                    display: flex;
                    flex-direction: column;
                    gap: var(--spacing-md);
                }

                .form-group {
                    position: relative;
                    padding-top: 1.5rem;
                }

                .form-group label {
                    position: absolute;
                    top: 0;
                    left: 0;
                    font-size: 0.8rem;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    color: var(--color-text-secondary);
                    transition: color 0.3s;
                }
                
                .form-group.focused label {
                    color: var(--color-accent);
                }

                .form-group input,
                .form-group textarea {
                    width: 100%;
                    background: transparent;
                    border: none;
                    border-bottom: 1px solid #333;
                    padding: 0.5rem 0;
                    font-size: 1.5rem;
                    font-family: var(--font-serif); /* Editorial feel for input text */
                    color: var(--color-text-primary);
                    border-radius: 0;
                    transition: border-color 0.3s;
                }

                .form-group input:focus,
                .form-group textarea:focus {
                    outline: none;
                    border-bottom-color: var(--color-accent);
                }

                .form-group input::placeholder,
                .form-group textarea::placeholder {
                    color: #333; /* Very subtle placeholder */
                    font-family: var(--font-sans);
                    font-size: 1rem;
                    font-weight: 300;
                }

                /* Button */
                .submit-btn-minimal {
                    display: inline-flex;
                    align-items: center;
                    gap: 1rem;
                    margin-top: var(--spacing-sm);
                    font-size: 1rem;
                    text-transform: uppercase;
                    letter-spacing: 0.2em;
                    padding: 1rem 0;
                    color: var(--color-text-primary);
                    transition: color 0.3s;
                    align-self: flex-start;
                }

                .submit-btn-minimal .arrow {
                    transition: transform 0.3s;
                }

                .submit-btn-minimal:hover {
                    color: var(--color-accent);
                }

                .submit-btn-minimal:hover .arrow {
                    transform: translateX(5px);
                }

                /* Responsive */
                @media (max-width: 900px) {
                    .contact-grid {
                        grid-template-columns: 1fr;
                        gap: var(--spacing-lg);
                    }

                    .main-title {
                        font-size: 3rem;
                    }

                    .contact-info {
                        padding-right: 0;
                    }
                    
                    .page-container {
                        padding-top: var(--spacing-lg);
                    }
                }
            `}</style>
        </div>
    );
};

export default Contact;
