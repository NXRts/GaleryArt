import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { fetchPhotos, searchPhotos, type UnsplashPhoto } from './services/api';
import Gallery from './components/Gallery';
import Modal from './components/Modal';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import About from './pages/About';
import Contact from './pages/Contact';
import Favorites from './pages/Favorites';

const Home = ({
  favorites,
  onToggleFavorite,
  refreshKey
}: {
  favorites: string[],
  onToggleFavorite: (photo: UnsplashPhoto, e: React.MouseEvent) => void;
  refreshKey: number;
}) => {
  const [photos, setPhotos] = useState<UnsplashPhoto[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<UnsplashPhoto | null>(null);
  const [loading, setLoading] = useState(true);
  const [page] = useState(1);
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('q');

  useEffect(() => {
    const loadPhotos = async () => {
      setLoading(true);
      try {
        let data;
        if (searchQuery) {
          data = await searchPhotos(searchQuery, page, 20, refreshKey);
        } else {
          data = await fetchPhotos(page, 20, refreshKey);
        }
        setPhotos(data);
      } catch (error) {
        console.error("Failed to load photos", error);
      }
      setLoading(false);
    };

    loadPhotos();
  }, [searchQuery, page, refreshKey]);

  return (
    <main>
      {loading ? (
        <div className="loader">Searching the archives...</div>
      ) : (
        <Gallery
          photos={photos}
          onPhotoClick={setSelectedPhoto}
          favorites={favorites}
          onToggleFavorite={onToggleFavorite}
        />
      )}
      <Modal photo={selectedPhoto} onClose={() => setSelectedPhoto(null)} />

      <style>{`
                .loader {
                    text-align: center;
                    padding: var(--spacing-xl);
                    font-size: 1.5rem;
                    color: var(--color-text-secondary);
                }
            `}</style>
    </main>
  );
};

const AppContent = () => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState<string[]>([]);
  // Keep a cache of full objects for the favorites page to use
  const [favoriteObjects, setFavoriteObjects] = useState<UnsplashPhoto[]>([]);

  // Stable seed calculation
  const getStabilitySeed = () => {
    // 1. Get or create stable deviceId
    let deviceId = localStorage.getItem('deviceId');
    if (!deviceId) {
      deviceId = Math.random().toString(36).substring(2, 11);
      localStorage.setItem('deviceId', deviceId);
    }

    // 2. Get manual offset (for force-refresh)
    const manualOffset = parseInt(localStorage.getItem('manualOffset') || '0', 10);

    // 3. Current hour (stability period)
    const currentHour = Math.floor(Date.now() / 3600000);

    // Combine them into a deterministic seed
    // Simple hash-like combination
    const seed = `${deviceId}-${currentHour}-${manualOffset}`;
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
        const char = seed.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
  };

  const [refreshKey, setRefreshKey] = useState(getStabilitySeed());

  useEffect(() => {
    const savedFavs = localStorage.getItem('favorites');
    const savedObjects = localStorage.getItem('favorite_objects');

    let initialFavs: string[] = [];
    let initialObjects: UnsplashPhoto[] = [];

    if (savedFavs) initialFavs = JSON.parse(savedFavs);
    if (savedObjects) initialObjects = JSON.parse(savedObjects);

    // MIGRATION: Filter out legacy favorites with unstable URLs (containing ?random)
    // This ensures users don't see "changing" images from old data.
    const consistentObjects = initialObjects.filter(photo => {
      return !photo.urls.small.includes('?random');
    });

    // Sync IDs with filtered objects
    const consistentIds = initialFavs.filter(id =>
      consistentObjects.find(obj => obj.id === id)
    );

    if (consistentObjects.length !== initialObjects.length) {
      console.log("Cleaned up unstable legacy favorites.");
      localStorage.setItem('favorites', JSON.stringify(consistentIds));
      localStorage.setItem('favorite_objects', JSON.stringify(consistentObjects));
    }

    setFavorites(consistentIds);
    setFavoriteObjects(consistentObjects);

    // Set an interval to check if the hour has changed to auto-refresh
    const interval = setInterval(() => {
        const newSeed = getStabilitySeed();
        if (newSeed !== refreshKey) {
            setRefreshKey(newSeed);
        }
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [refreshKey]);

  const handleSearch = (query: string) => {
    navigate(`/?q=${encodeURIComponent(query)}`);
  };

  const handleShuffle = () => {
    const currentOffset = parseInt(localStorage.getItem('manualOffset') || '0', 10);
    const newOffset = currentOffset + 1;
    localStorage.setItem('manualOffset', newOffset.toString());
    setRefreshKey(getStabilitySeed());
  };

  const handleToggleFavorite = (photo: UnsplashPhoto, e: React.MouseEvent) => {
    e.stopPropagation();
    const isFav = favorites.includes(photo.id);
    let newFavs, newObjects;

    if (isFav) {
      newFavs = favorites.filter(id => id !== photo.id);
      newObjects = favoriteObjects.filter(p => p.id !== photo.id);
    } else {
      newFavs = [...favorites, photo.id];
      // Avoid duplicates in objects just in case
      if (!favoriteObjects.find(p => p.id === photo.id)) {
        newObjects = [...favoriteObjects, photo];
      } else {
        newObjects = favoriteObjects;
      }
    }

    setFavorites(newFavs);
    setFavoriteObjects(newObjects);
    localStorage.setItem('favorites', JSON.stringify(newFavs));
    localStorage.setItem('favorite_objects', JSON.stringify(newObjects));
  };

  return (
    <div className="app-container">
      <Navbar onSearch={handleSearch} onShuffle={handleShuffle} />

      <Routes>
        <Route path="/" element={<Home favorites={favorites} onToggleFavorite={handleToggleFavorite} refreshKey={refreshKey} />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/favorites" element={
          <Favorites
            favorites={favorites}
            allPhotos={favoriteObjects}
            onToggleFavorite={handleToggleFavorite}
          />
        } />
      </Routes>

      <Footer />

      <style>{`
                .app-container {
                    min-height: 100vh;
                    display: flex;
                    flex-direction: column;
                }
            `}</style>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
