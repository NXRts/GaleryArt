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
  onToggleFavorite
}: {
  favorites: string[],
  onToggleFavorite: (photo: UnsplashPhoto, e: React.MouseEvent) => void
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
          data = await searchPhotos(searchQuery, page);
        } else {
          data = await fetchPhotos(page);
        }
        setPhotos(data);
      } catch (error) {
        console.error("Failed to load photos", error);
      }
      setLoading(false);
    };

    loadPhotos();
  }, [searchQuery, page]);

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

  useEffect(() => {
    const savedFavs = localStorage.getItem('favorites');
    const savedObjects = localStorage.getItem('favorite_objects');
    if (savedFavs) setFavorites(JSON.parse(savedFavs));
    if (savedObjects) setFavoriteObjects(JSON.parse(savedObjects));
  }, []);

  const handleSearch = (query: string) => {
    navigate(`/?q=${encodeURIComponent(query)}`);
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
      <Navbar onSearch={handleSearch} />

      <Routes>
        <Route path="/" element={<Home favorites={favorites} onToggleFavorite={handleToggleFavorite} />} />
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
