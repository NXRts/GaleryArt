import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook, Mail, Github } from 'lucide-react';

const Footer: React.FC = () => {
    return (
        <footer className="footer-container">
            <div className="footer-content">
                <div className="footer-brand">
                    <h3>GaleryArt.</h3>
                    <p>Curating the world's visual inspiration.</p>
                </div>

                <div className="footer-links">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                    </ul>
                </div>

                <div className="footer-social">
                    <h4>Follow Us</h4>
                    <div className="social-icons">
                        <a href="#" className="icon-link"><Instagram size={20} /></a>
                        <a href="#" className="icon-link"><Twitter size={20} /></a>
                        <a href="#" className="icon-link"><Facebook size={20} /></a>
                        <a href="/contact" className="icon-link"><Mail size={20} /></a>
                        <a href="#" className="icon-link"><Github size={20} /></a>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} GaleryArt. All rights reserved.</p>
                <p className="credit">Images powered by Unsplash</p>
            </div>

            <style>{`
                .footer-container {
                    background: var(--color-surface);
                    padding: var(--spacing-lg) var(--spacing-md) var(--spacing-md);
                    margin-top: auto;
                    border-top: 1px solid rgba(255,255,255,0.05);
                }

                .footer-content {
                    max-width: 1200px;
                    margin: 0 auto;
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: var(--spacing-lg);
                    margin-bottom: var(--spacing-lg);
                }

                .footer-brand h3 {
                    font-size: 1.5rem;
                    margin-bottom: var(--spacing-xs);
                    color: #fff;
                }

                .footer-brand p {
                    color: var(--color-text-secondary);
                    font-size: 0.9rem;
                    max-width: 300px;
                }

                .footer-links h4, .footer-social h4 {
                    color: #fff;
                    margin-bottom: var(--spacing-sm);
                    font-size: 1.1rem;
                }

                .footer-links ul {
                    list-style: none;
                }

                .footer-links li {
                    margin-bottom: 0.5rem;
                }

                .footer-links a {
                    color: var(--color-text-secondary);
                    transition: color var(--transition-fast);
                }

                .footer-links a:hover {
                    color: var(--color-accent);
                }

                .social-icons {
                    display: flex;
                    gap: 1rem;
                }

                .icon-link {
                    color: var(--color-text-secondary);
                    transition: all var(--transition-fast);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    background: rgba(255,255,255,0.05);
                }

                .icon-link:hover {
                    background: var(--color-accent);
                    color: #fff;
                    transform: translateY(-3px);
                }

                .footer-bottom {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding-top: var(--spacing-md);
                    border-top: 1px solid rgba(255,255,255,0.05);
                    display: flex;
                    justify-content: space-between;
                    flex-wrap: wrap;
                    gap: 1rem;
                    color: rgba(255,255,255,0.3);
                    font-size: 0.85rem;
                }

                @media (max-width: 768px) {
                    .footer-bottom {
                        flex-direction: column;
                        text-align: center;
                    }
                }
            `}</style>
        </footer>
    );
};

export default Footer;
