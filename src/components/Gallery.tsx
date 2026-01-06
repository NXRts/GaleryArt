import React from 'react';
import type { UnsplashPhoto } from '../services/api';

import { Heart } from 'lucide-react';

interface GalleryProps {
  photos: UnsplashPhoto[];
  onPhotoClick: (photo: UnsplashPhoto) => void;
  favorites: string[];
  onToggleFavorite: (photo: UnsplashPhoto, e: React.MouseEvent) => void;
}

const Gallery: React.FC<GalleryProps> = ({ photos, onPhotoClick, favorites, onToggleFavorite }) => {
  return (
    <div className="gallery-container">
      {photos.map((photo) => {
        const isFavorite = favorites.includes(photo.id);
        return (
          <div
            key={photo.id}
            className="gallery-item fade-in"
            onClick={() => onPhotoClick(photo)}
            style={{ animationDelay: `${Math.random() * 0.5}s` }}
          >
            <div className="image-wrapper">
              <img
                src={photo.urls.regular}
                alt={photo.alt_description || 'Art'}
                className="gallery-image"
                loading="lazy"
              />
              <div className="overlay">
                <span>{photo.user.name}</span>
                <button
                  className={`fav-btn ${isFavorite ? 'active' : ''}`}
                  onClick={(e) => onToggleFavorite(photo, e)}
                >
                  <Heart size={20} fill={isFavorite ? "#e74c3c" : "none"} />
                </button>
              </div>
            </div>
          </div>
        );
      })}

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
          justify-content: space-between;
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

        .fav-btn {
            background: rgba(255,255,255,0.1);
            border-radius: 50%;
            width: 35px;
            height: 35px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            transition: all var(--transition-fast);
        }

        .fav-btn:hover {
            background: rgba(255,255,255,0.3);
            transform: scale(1.1);
        }

        .fav-btn.active {
            color: #e74c3c;
            background: rgba(255,255,255,0.9);
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
