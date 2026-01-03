import React, { useEffect, useState } from 'react';
import type { UnsplashPhoto } from '../services/api';
import Gallery from '../components/Gallery';
import Modal from '../components/Modal';

interface FavoritesProps {
    favorites: string[];
    allPhotos: UnsplashPhoto[];
    onToggleFavorite: (photo: UnsplashPhoto, e: React.MouseEvent) => void;
}

const Favorites: React.FC<FavoritesProps> = ({ favorites, allPhotos, onToggleFavorite }) => {
    const [favoritePhotos, setFavoritePhotos] = useState<UnsplashPhoto[]>([]);
    const [selectedPhoto, setSelectedPhoto] = useState<UnsplashPhoto | null>(null);

    useEffect(() => {
        const saved = localStorage.getItem('favorite_objects');
        if (saved) {
            setFavoritePhotos(JSON.parse(saved));
        } else {
            const filtered = allPhotos.filter(p => favorites.includes(p.id));
            setFavoritePhotos(filtered);
        }
    }, [favorites, allPhotos]);

    return (
        <div className="page-container fade-in">
            <h1>Your Collection</h1>
            {favoritePhotos.length === 0 ? (
                <div className="empty-state">
                    <p>No favorites yet. Start curating your gallery!</p>
                </div>
            ) : (
                <Gallery
                    photos={favoritePhotos}
                    onPhotoClick={setSelectedPhoto}
                    favorites={favorites}
                    onToggleFavorite={(photo, e) => {
                        onToggleFavorite(photo, e);
                        setFavoritePhotos(prev => prev.filter(p => p.id !== photo.id));
                    }}
                />
            )}
            <Modal photo={selectedPhoto} onClose={() => setSelectedPhoto(null)} />

            <style>{`
                .page-container {
                    padding: var(--spacing-lg) var(--spacing-sm);
                    min-height: 80vh;
                }
                h1 {
                    text-align: center;
                    margin-bottom: var(--spacing-lg);
                    font-size: 3rem;
                }
                .empty-state {
                    text-align: center;
                    margin-top: var(--spacing-xl);
                    color: var(--color-text-secondary);
                    font-size: 1.2rem;
                }
             `}</style>
        </div>
    );
};

export default Favorites;
