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
                        src={currentPhoto.urls.regular}
                        alt={currentPhoto.alt_description || 'Featured artwork'}
                        className="carousel-image"
                    />
                    <div className="carousel-overlay">
                        <div className="carousel-content">
                            <h2>{currentPhoto.description || 'Featured Artwork'}</h2>
                            <p className="carousel-artist">by {currentPhoto.user.name}</p>
                        </div>
                    </div>
                </div>

                {/* Navigation Buttons */}
                <button 
                    className="carousel-nav carousel-nav-prev" 
                    onClick={goToPrevious}
                    aria-label="Previous slide"
                >
                    <ChevronLeft size={32} />
                </button>
                <button 
                    className="carousel-nav carousel-nav-next" 
                    onClick={goToNext}
                    aria-label="Next slide"
                >
                    <ChevronRight size={32} />
                </button>

                {/* Dot Indicators */}
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
                    height: 70vh;
                    min-height: 500px;
                    max-height: 700px;
                    overflow: hidden;
                    border-radius: var(--border-radius);
                    background: #000;
                }

                .carousel-image-wrapper {
                    width: 100%;
                    height: 100%;
                    position: relative;
                    cursor: pointer;
                    transition: transform 0.3s ease;
                }

                .carousel-image-wrapper:hover {
                    transform: scale(1.02);
                }

                .carousel-image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    display: block;
                }

                .carousel-overlay {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    background: linear-gradient(
                        to top,
                        rgba(0, 0, 0, 0.9) 0%,
                        rgba(0, 0, 0, 0.6) 50%,
                        transparent 100%
                    );
                    padding: var(--spacing-lg);
                    color: white;
                }

                .carousel-content h2 {
                    font-size: 2.5rem;
                    margin-bottom: 0.5rem;
                    font-weight: 600;
                    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
                }

                .carousel-artist {
                    font-size: 1.2rem;
                    color: var(--color-accent);
                    font-weight: 500;
                }

                /* Navigation Buttons */
                .carousel-nav {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    background: rgba(0, 0, 0, 0.5);
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    color: white;
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    z-index: 10;
                }

                .carousel-nav:hover {
                    background: rgba(212, 163, 115, 0.9);
                    transform: translateY(-50%) scale(1.1);
                }

                .carousel-nav-prev {
                    left: var(--spacing-md);
                }

                .carousel-nav-next {
                    right: var(--spacing-md);
                }

                /* Dot Indicators */
                .carousel-dots {
                    position: absolute;
                    bottom: var(--spacing-md);
                    left: 50%;
                    transform: translateX(-50%);
                    display: flex;
                    gap: 0.75rem;
                    z-index: 10;
                }

                .carousel-dot {
                    width: 12px;
                    height: 12px;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.4);
                    border: 2px solid rgba(255, 255, 255, 0.6);
                    cursor: pointer;
                    transition: all 0.3s ease;
                    padding: 0;
                }

                .carousel-dot:hover {
                    background: rgba(255, 255, 255, 0.7);
                    transform: scale(1.2);
                }

                .carousel-dot.active {
                    background: var(--color-accent);
                    border-color: var(--color-accent);
                    transform: scale(1.3);
                }

                /* Responsive */
                @media (max-width: 768px) {
                    .carousel-container {
                        height: 50vh;
                        min-height: 400px;
                    }

                    .carousel-content h2 {
                        font-size: 1.8rem;
                    }

                    .carousel-artist {
                        font-size: 1rem;
                    }

                    .carousel-nav {
                        width: 40px;
                        height: 40px;
                    }

                    .carousel-nav-prev {
                        left: var(--spacing-sm);
                    }

                    .carousel-nav-next {
                        right: var(--spacing-sm);
                    }

                    .carousel-overlay {
                        padding: var(--spacing-md);
                    }
                }
            `}</style>
        </div>
    );
};

export default HeroCarousel;
