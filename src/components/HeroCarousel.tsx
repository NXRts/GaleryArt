import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { UnsplashPhoto } from '../services/api';

interface HeroCarouselProps {
    photos: UnsplashPhoto[];
    onPhotoClick: (photo: UnsplashPhoto) => void;
}

const HeroCarousel: React.FC<HeroCarouselProps> = ({ photos, onPhotoClick }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    // Auto-play functionality
    useEffect(() => {
        if (isPaused || photos.length === 0) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % photos.length);
        }, 5000); // Change slide every 5 seconds

        return () => clearInterval(interval);
    }, [isPaused, photos.length]);

    const goToPrevious = () => {
        setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
    };

    const goToNext = () => {
        setCurrentIndex((prev) => (prev + 1) % photos.length);
    };

    const goToSlide = (index: number) => {
        setCurrentIndex(index);
    };

    if (photos.length === 0) return null;

    const currentPhoto = photos[currentIndex];

    return (
        <div 
            className="hero-carousel"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <div className="carousel-container">
                {/* Main Image */}
                <div 
                    className="carousel-image-wrapper"
                    onClick={() => onPhotoClick(currentPhoto)}
                >
                    <img
                        src={currentPhoto.urls.full}
                        alt={currentPhoto.alt_description || 'Featured artwork'}
                        className="carousel-image"
                    />
                    
                    {/* Minimal overlay for better text readability */}
                    <div className="carousel-overlay"></div>
                    
                    {/* Centered hero content */}
                    <div className="carousel-hero-content">
                        <h1 className="hero-title">GaleryArt</h1>
                        <p className="hero-subtitle">
                            Sumber internet untuk visual.<br />
                            Didukung oleh kreator di mana saja.
                        </p>
                    </div>

                    {/* Artist attribution in bottom corner */}
                    <div className="carousel-attribution">
                        <span>Photo by {currentPhoto.user.name}</span>
                    </div>
                </div>

                {/* Navigation Buttons - More subtle */}
                <button 
                    className="carousel-nav carousel-nav-prev" 
                    onClick={goToPrevious}
                    aria-label="Previous slide"
                >
                    <ChevronLeft size={24} />
                </button>
                <button 
                    className="carousel-nav carousel-nav-next" 
                    onClick={goToNext}
                    aria-label="Next slide"
                >
                    <ChevronRight size={24} />
                </button>

                {/* Dot Indicators - More spaced and minimal */}
                <div className="carousel-dots">
                    {photos.map((_, index) => (
                        <button
                            key={index}
                            className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
                            onClick={() => goToSlide(index)}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>

            <style>{`
                .hero-carousel {
                    width: 100%;
                    margin-bottom: var(--spacing-lg);
                    position: relative;
                }

                .carousel-container {
                    position: relative;
                    width: 100%;
                    height: 60vh;
                    min-height: 450px;
                    max-height: 650px;
                    overflow: hidden;
                    border-radius: var(--border-radius);
                    background: #000;
                }

                .carousel-image-wrapper {
                    width: 100%;
                    height: 100%;
                    position: relative;
                    cursor: pointer;
                }

                .carousel-image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    display: block;
                }

                /* Minimal overlay for text readability */
                .carousel-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.25);
                    pointer-events: none;
                }

                /* Centered hero content - Unsplash style */
                .carousel-hero-content {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    text-align: center;
                    color: white;
                    z-index: 2;
                    width: 90%;
                    max-width: 800px;
                }

                .hero-title {
                    font-size: 3.5rem;
                    font-weight: 700;
                    margin-bottom: 1rem;
                    text-shadow: 0 2px 20px rgba(0, 0, 0, 0.4);
                    letter-spacing: -0.02em;
                }

                .hero-subtitle {
                    font-size: 1.25rem;
                    font-weight: 400;
                    line-height: 1.6;
                    text-shadow: 0 1px 10px rgba(0, 0, 0, 0.4);
                    opacity: 0.95;
                }

                /* Artist attribution - bottom corner */
                .carousel-attribution {
                    position: absolute;
                    bottom: var(--spacing-md);
                    left: var(--spacing-md);
                    color: white;
                    font-size: 0.875rem;
                    z-index: 2;
                    text-shadow: 0 1px 4px rgba(0, 0, 0, 0.5);
                    opacity: 0.9;
                }

                /* Navigation Buttons - More subtle */
                .carousel-nav {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    background: rgba(255, 255, 255, 0.3);
                    backdrop-filter: blur(8px);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    color: white;
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    z-index: 10;
                    opacity: 0.7;
                }

                .carousel-nav:hover {
                    background: rgba(255, 255, 255, 0.5);
                    opacity: 1;
                    transform: translateY(-50%) scale(1.05);
                }

                .carousel-nav-prev {
                    left: var(--spacing-md);
                }

                .carousel-nav-next {
                    right: var(--spacing-md);
                }

                /* Dot Indicators - More minimal */
                .carousel-dots {
                    position: absolute;
                    bottom: var(--spacing-md);
                    left: 50%;
                    transform: translateX(-50%);
                    display: flex;
                    gap: 1rem;
                    z-index: 10;
                }

                .carousel-dot {
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.5);
                    border: none;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    padding: 0;
                    opacity: 0.7;
                }

                .carousel-dot:hover {
                    background: rgba(255, 255, 255, 0.8);
                    opacity: 1;
                    transform: scale(1.2);
                }

                .carousel-dot.active {
                    background: white;
                    opacity: 1;
                    transform: scale(1.3);
                }

                /* Responsive */
                @media (max-width: 768px) {
                    .carousel-container {
                        height: 50vh;
                        min-height: 400px;
                    }

                    .hero-title {
                        font-size: 2.5rem;
                    }

                    .hero-subtitle {
                        font-size: 1rem;
                    }

                    .carousel-nav {
                        width: 36px;
                        height: 36px;
                        opacity: 0.6;
                    }

                    .carousel-nav-prev {
                        left: var(--spacing-sm);
                    }

                    .carousel-nav-next {
                        right: var(--spacing-sm);
                    }

                    .carousel-attribution {
                        font-size: 0.75rem;
                        bottom: var(--spacing-sm);
                        left: var(--spacing-sm);
                    }
                }

                @media (max-width: 480px) {
                    .hero-title {
                        font-size: 2rem;
                    }

                    .hero-subtitle {
                        font-size: 0.9rem;
                    }
                }
            `}</style>
        </div>
    );
};

export default HeroCarousel;
