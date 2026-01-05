import React, { useEffect } from 'react';
import type { UnsplashPhoto } from '../services/api';

interface ModalProps {
    photo: UnsplashPhoto | null;
    onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ photo, onClose }) => {
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    if (!photo) return null;

    return (
        <div className="modal-overlay fade-in" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose}>&times;</button>

                <div className="image-container">
                    <img
                        src={photo.urls.regular}
                        alt={photo.alt_description || 'Art piece'}
                        className="modal-image"
                    />
                </div>

                <div className="photo-details">
                    <h2>{photo.description || 'Untitled'}</h2>
                    <div className="artist-info">
                        <img
                            src={photo.user.profile_image.medium}
                            alt={photo.user.name}
                            className="artist-avatar"
                        />
                        <div>
                            <h3>{photo.user.name}</h3>
                            <p>@{photo.user.username}</p>
                        </div>
                        {photo.user.portfolio_url && (
                            <a
                                href={photo.user.portfolio_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="portfolio-link"
                            >
                                View Portfolio
                            </a>
                        )}
                    </div>
                    <div className="download-section">
                        <a href={photo.links.html} target="_blank" rel="noopener noreferrer" className="unsplash-link">
                            View on Unsplash
                        </a>
                    </div>
                </div>
            </div>

            <style>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.85);
          backdrop-filter: blur(10px);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: var(--spacing-md);
        }
        
        .modal-content {
          background: var(--color-surface);
          border-radius: var(--border-radius);
          overflow: hidden;
          max-width: 1200px;
          width: 100%;
          max-height: 90vh;
          display: flex;
          flex-direction: row;
          position: relative;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }
        
        .image-container {
          flex: 2;
          background: #000;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        
        .modal-image {
          max-width: 100%;
          max-height: 90vh;
          object-fit: contain;
          display: block;
        }
        
        .photo-details {
          flex: 1;
          padding: var(--spacing-md);
          display: flex;
          flex-direction: column;
          border-left: 1px solid rgba(255, 255, 255, 0.1);
          overflow-y: auto;
        }
        
        .close-btn {
          position: absolute;
          top: var(--spacing-sm);
          right: var(--spacing-sm);
          font-size: 2rem;
          color: rgba(255,255,255,0.7);
          z-index: 10;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: rgba(0,0,0,0.5);
          transition: var(--transition-fast);
        }
        
        .close-btn:hover {
          background: var(--color-text-primary);
          color: var(--color-bg);
        }
        
        .photo-details h2 {
          font-size: 1.8rem;
          margin-bottom: var(--spacing-md);
          color: var(--color-text-primary);
        }
        
        .artist-info {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          margin-bottom: var(--spacing-md);
          padding-bottom: var(--spacing-md);
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }
        
        .artist-avatar {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          border: 2px solid var(--color-accent);
          object-fit: cover;
          background-color: #333;
          flex-shrink: 0;
          display: block;
          /* Hide alt text when broken */
          color: transparent;
          text-indent: 100%;
          white-space: nowrap;
          overflow: hidden;
        }
        
        .artist-info h3 {
          font-size: 1.1rem;
          margin-bottom: 0.2rem;
        }
        
        .artist-info p {
          font-size: 0.9rem;
          color: var(--color-text-secondary);
        }
        
        .portfolio-link {
          margin-left: auto;
          font-size: 0.9rem;
          color: var(--color-accent);
          text-decoration: underline;
        }
        
        .unsplash-link {
          display: inline-block;
          margin-top: auto;
          padding: var(--spacing-sm) var(--spacing-md);
          background: var(--color-text-primary);
          color: var(--color-bg);
          border-radius: var(--border-radius);
          font-weight: 600;
          text-align: center;
          transition: var(--transition-fast);
        }
        
        .unsplash-link:hover {
          background: var(--color-accent);
          color: var(--color-text-primary);
        }

        @media (max-width: 768px) {
          .modal-content {
            flex-direction: column;
            max-height: 95vh;
            overflow-y: auto;
          }
          
          .image-container {
            max-height: 50vh;
          }
          
          .photo-details {
            border-left: none;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
          }
        }
      `}</style>
        </div>
    );
};

export default Modal;
