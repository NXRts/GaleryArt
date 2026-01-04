import React, { type FormEvent, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, Menu, X, Home, Info, Mail, Heart, RefreshCw } from 'lucide-react';

interface NavbarProps {
    onSearch: (query: string) => void;
    onShuffle: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearch, onShuffle }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    const handleSearch = (e: FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            onSearch(query);
            navigate('/'); // Go to home to show results
            setIsOpen(false);
        }
    };

    const isActive = (path: string) => location.pathname === path ? 'active' : '';

    return (
        <nav className="navbar">
            <div className="nav-container">
                <Link to="/" className="nav-logo" onClick={() => onSearch('')}>
                    GaleryArt.
                </Link>

                <div className="desktop-search">
                    <form onSubmit={handleSearch} className="search-form">
                        <Search size={18} className="search-icon" />
                        <input
                            type="text"
                            placeholder="Search for inspiration..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                    </form>
                </div>

                <div className="nav-actions">
                    <button className="icon-btn" onClick={onShuffle} title="Shuffle Gallery">
                        <RefreshCw size={20} />
                    </button>
                </div>

                {isOpen && <div className="mobile-backdrop" onClick={() => setIsOpen(false)}></div>}

                <div className={`nav-links ${isOpen ? 'open' : ''}`}>
                    <div className="mobile-search">
                        <form onSubmit={handleSearch} className="search-form">
                            <Search size={18} className="search-icon" />
                            <input
                                type="text"
                                placeholder="Search..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                        </form>
                    </div>

                    <Link to="/" className={`nav-item ${isActive('/')}`} onClick={() => setIsOpen(false)}>
                        <Home size={18} /> Home
                    </Link>
                    <Link to="/favorites" className={`nav-item ${isActive('/favorites')}`} onClick={() => setIsOpen(false)}>
                        <Heart size={18} /> Favorites
                    </Link>
                    <Link to="/about" className={`nav-item ${isActive('/about')}`} onClick={() => setIsOpen(false)}>
                        <Info size={18} /> About
                    </Link>
                    <Link to="/contact" className={`nav-item ${isActive('/contact')}`} onClick={() => setIsOpen(false)}>
                        <Mail size={18} /> Contact
                    </Link>
                </div>

                <button className="mobile-menu-btn" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            <style>{`
            .navbar {
                position: sticky;
                top: 0;
                z-index: 100;
                background: rgba(15, 15, 15, 0.85);
                backdrop-filter: blur(12px);
                border-bottom: 1px solid rgba(255,255,255,0.05);
                padding: 1rem var(--spacing-md);
            }

            .nav-container {
                max-width: 1400px;
                margin: 0 auto;
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: var(--spacing-md);
            }

            .nav-logo {
                font-family: var(--font-serif);
                font-size: 1.5rem;
                font-weight: 700;
                color: #fff;
            }

            .desktop-search {
                flex: 1;
                max-width: 500px;
                margin: 0 auto;
            }

            .search-form {
                position: relative;
                display: flex;
                align-items: center;
            }

            .search-icon {
                position: absolute;
                left: 1rem;
                color: var(--color-text-secondary);
            }

            .search-form input {
                width: 100%;
                background: #252525;
                border: 1px solid transparent;
                padding: 0.7rem 1rem 0.7rem 3rem;
                border-radius: 50px;
                color: white;
                font-family: var(--font-sans);
                transition: all var(--transition-fast);
            }

            .search-form input:focus {
                outline: none;
                background: #333;
                border-color: var(--color-accent);
            }
            
            .nav-actions {
                display: flex;
                align-items: center;
                gap: 1rem;
            }

            .icon-btn {
                background: transparent;
                border: none;
                color: var(--color-text-secondary);
                cursor: pointer;
                transition: color var(--transition-fast), transform var(--transition-fast);
                padding: 0.5rem;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .icon-btn:hover {
                color: var(--color-accent);
                transform: rotate(180deg);
            }

            .nav-links {
                display: flex;
                align-items: center;
                gap: var(--spacing-md);
            }

            .nav-item {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                font-size: 0.95rem;
                color: var(--color-text-secondary);
                transition: color var(--transition-fast);
            }

            .nav-item:hover, .nav-item.active {
                color: #fff;
            }

            .mobile-search {
                display: none;
                width: 100%;
                margin-bottom: 1rem;
            }
            
            .mobile-backdrop {
                display: none;
            }

            @media (max-width: 768px) {
                .navbar {
                    background: #000; /* Solid black on mobile */
                    backdrop-filter: none;
                }

                .desktop-search { display: none; }
                
                .mobile-menu-btn { display: block; z-index: 2001; }
                
                .mobile-backdrop {
                    display: block;
                    position: fixed;
                    top: 0;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    background: rgba(0,0,0,0.8); /* Darker dim */
                    backdrop-filter: blur(5px);
                    z-index: 1999;
                    animation: fadeIn 0.3s ease-out;
                }

                .nav-links {
                    position: fixed;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    width: 85%; /* Slightly wider */
                    max-width: 320px;
                    background: #000; /* Solid black */
                    flex-direction: column;
                    padding: 5rem var(--spacing-md) var(--spacing-md);
                    transform: translateX(100%);
                    transition: transform var(--transition-slow);
                    box-shadow: -5px 0 30px rgba(0,0,0,1);
                    align-items: flex-start;
                    z-index: 2000;
                    border-left: 1px solid #222;
                }

                .nav-links.open {
                    transform: translateX(0);
                }

                .mobile-search {
                    display: block;
                    margin-bottom: 2rem;
                }
                
                .mobile-search input {
                    background: #1a1a1a;
                    border: 1px solid #333;
                    color: white;
                    padding: 0.8rem 1rem 0.8rem 2.5rem; /* Larger touch target */
                }
                
                .nav-item {
                    width: 100%;
                    padding: 1rem 0; /* Larger touch target */
                    font-size: 1.2rem;
                    border-bottom: 1px solid rgba(255,255,255,0.08);
                }
            }
        `}</style>
        </nav>
    );
};

export default Navbar;
