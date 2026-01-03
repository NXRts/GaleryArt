import { useEffect, useState } from 'react';
import { fetchPhotos, type UnsplashPhoto } from './services/api';
import Gallery from './components/Gallery';
import Modal from './components/Modal';

function App() {
  const [photos, setPhotos] = useState<UnsplashPhoto[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<UnsplashPhoto | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPhotos = async () => {
      setLoading(true);
      const data = await fetchPhotos(1, 30);
      setPhotos(data);
      setLoading(false);
    };

    loadPhotos();
  }, []);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="logo">ArtGallery.</h1>
        <p className="subtitle">Curated visual inspiration.</p>
      </header>

      <main>
        {loading ? (
          <div className="loader">Loading Masterpieces...</div>
        ) : (
          <Gallery photos={photos} onPhotoClick={setSelectedPhoto} />
        )}
      </main>

      <footer className="app-footer">
        <p>Images via Unsplash</p>
      </footer>

      <Modal photo={selectedPhoto} onClose={() => setSelectedPhoto(null)} />

      <style>{`
        .app-container {
          min-height: 100vh;
          padding-bottom: var(--spacing-xl);
        }
        
        .app-header {
          padding: var(--spacing-xl) var(--spacing-md) var(--spacing-lg);
          text-align: center;
        }
        
        .logo {
          font-size: 4rem;
          margin-bottom: var(--spacing-xs);
          background: linear-gradient(135deg, #fff 0%, var(--color-accent) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .subtitle {
          color: var(--color-text-secondary);
          font-size: 1.2rem;
          max-width: 600px;
          margin: 0 auto;
        }
        
        .loader {
          text-align: center;
          padding: var(--spacing-xl);
          font-size: 1.5rem;
          color: var(--color-text-secondary);
        }
        
        .app-footer {
          text-align: center;
          padding: var(--spacing-lg);
          color: rgba(255,255,255,0.3);
          font-size: 0.9rem;
        }

        @media (max-width: 768px) {
          .logo { font-size: 2.5rem; }
        }
      `}</style>
    </div>
  );
}

export default App;
