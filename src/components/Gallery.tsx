import React from 'react';
import type { UnsplashPhoto } from '../services/api';

interface GalleryProps {
    photos: UnsplashPhoto[];
    onPhotoClick: (photo: UnsplashPhoto) => void;
}

const Gallery: React.FC<GalleryProps> = ({ photos, onPhotoClick }) => {
    return (
        <div className="gallery-container">
            {photos.map((photo) => (
                <div
                    key={photo.id}
                    className="gallery-item fade-in"
                    onClick={() => onPhotoClick(photo)}
                    style={{ animationDelay: `${Math.random() * 0.5}s` }}
                >
                    <div className="image-wrapper">
                        <img
                            src={photo.urls.small}
                            alt={photo.alt_description || 'Art'}
                            className="gallery-image"
                            loading="lazy"
                        />
                        <div className="overlay">
                            <span>{photo.user.name}</span>
                        </div>
                    </div>
                </div>
            ))}

            <style>{`
        .gallery-container {
          column-count: 4;
          column-gap: var(--spacing-sm);
          padding: var(--spacing-sm);
        }
        
        .gallery-item {
          break-inside: avoid;
          margin-bottom: var(--spacing-sm);
          cursor: pointer;
          position: relative;
          border-radius: var(--border-radius);
          overflow: hidden;
        }

        .image-wrapper {
          position: relative;
          overflow: hidden;
          border-radius: var(--border-radius);
        }
        
        .gallery-image {
          width: 100%;
          height: auto;
          display: block;
          transition: transform var(--transition-slow);
        }
        
        .image-wrapper:hover .gallery-image {
          transform: scale(1.05);
        }

        .overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
          padding: var(--spacing-md) var(--spacing-sm) var(--spacing-sm);
          opacity: 0;
          transition: opacity var(--transition-fast);
          display: flex;
          align-items: flex-end;
        }
        
        .image-wrapper:hover .overlay {
          opacity: 1;
        }
        
        .overlay span {
          color: white;
          font-weight: 500;
          font-family: var(--font-sans);
          font-size: 0.9rem;
        }

        @media (max-width: 1200px) {
          .gallery-container { column-count: 3; }
        }
        
        @media (max-width: 800px) {
          .gallery-container { column-count: 2; }
        }
        
        @media (max-width: 500px) {
          .gallery-container { column-count: 1; }
        }
      `}</style>
        </div>
    );
};

export default Gallery;
