import React, { type FormEvent } from 'react';

const Contact: React.FC = () => {
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        alert("Thank you for reaching out! We'll get back to you soon.");
    };

    return (
        <div className="page-container fade-in">
            <h1>Get in Touch</h1>
            <p className="subtitle">Have a question or just want to say hello?</p>

            <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" required placeholder="Jane Doe" />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" required placeholder="jane@example.com" />
                </div>

                <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea id="message" rows={5} required placeholder="Your thoughts..."></textarea>
                </div>

                <button type="submit" className="submit-btn">Send Message</button>
            </form>

            <style>{`
                .page-container {
                    padding: var(--spacing-xl) var(--spacing-md);
                    max-width: 600px;
                    margin: 0 auto;
                    min-height: 80vh;
                }

                h1 {
                    font-size: 3rem;
                    margin-bottom: var(--spacing-xs);
                    text-align: center;
                }

                .subtitle {
                    text-align: center;
                    color: var(--color-text-secondary);
                    margin-bottom: var(--spacing-lg);
                }

                .contact-form {
                    display: flex;
                    flex-direction: column;
                    gap: var(--spacing-md);
                    background: var(--color-surface);
                    padding: var(--spacing-lg);
                    border-radius: var(--border-radius);
                    box-shadow: 0 4px 6px rgba(0,0,0,0.3);
                }

                .form-group {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                }

                label {
                    font-size: 0.9rem;
                    font-weight: 600;
                    color: var(--color-text-secondary);
                }

                input, textarea {
                    background: var(--color-bg);
                    border: 1px solid #333;
                    padding: 1rem;
                    border-radius: 4px;
                    color: white;
                    font-family: var(--font-sans);
                    font-size: 1rem;
                    transition: border-color var(--transition-fast);
                }

                input:focus, textarea:focus {
                    outline: none;
                    border-color: var(--color-accent);
                }

                .submit-btn {
                    background: var(--color-accent);
                    color: #fff;
                    padding: 1rem;
                    border-radius: 4px;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    margin-top: var(--spacing-sm);
                    transition: opacity var(--transition-fast);
                }

                .submit-btn:hover {
                    opacity: 0.9;
                }
            `}</style>
        </div>
    );
};

export default Contact;
