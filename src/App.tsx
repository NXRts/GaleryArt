import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { fetchPhotos, searchPhotos, type UnsplashPhoto } from './services/api';
import Gallery from './components/Gallery';
import Modal from './components/Modal';
import Navbar from './components/Navbar';
import About from './pages/About';
import Contact from './pages/Contact';

const Home = () => {
  const [photos, setPhotos] = useState<UnsplashPhoto[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<UnsplashPhoto | null>(null);
  const [loading, setLoading] = useState(true);
  const [page] = useState(1);
  const location = useLocation();

  // Parse search query from URL or state if we were to lift state up. 
  // For simplicity, let's use a simple prop-drilled search or URL param if we wanted deep linking.
  // However, the Navbar currently pushes to '/' and we need to know the query.
  // Let's implement a search context or just use a custom hook?
  // Actually, let's make the Home component handle both default fetch and search.

  // We can use a query param for search: /?q=art
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
        <Gallery photos={photos} onPhotoClick={setSelectedPhoto} />
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

// Wrapper handling Navigation
const AppContent = () => {
  const navigate = useNavigate();

  const handleSearch = (query: string) => {
    navigate(`/?q=${encodeURIComponent(query)}`);
  };

  return (
    <div className="app-container">
      <Navbar onSearch={handleSearch} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

      <footer className="app-footer">
        <p>Images via Unsplash • Built with React & TypeScript</p>
      </footer>

      <style>{`
                .app-container {
                    min-height: 100vh;
                    padding-bottom: var(--spacing-xl);
                }
                
                .app-footer {
                    text-align: center;
                    padding: var(--spacing-lg);
                    color: rgba(255,255,255,0.3);
                    font-size: 0.9rem;
                    margin-top: auto;
                    border-top: 1px solid rgba(255,255,255,0.05);
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
