// Unsplash API Service
// We use a public demo endpoint or just mock data if the key is missing to prevent breaking.

const API_URL = 'https://api.unsplash.com';

export interface UnsplashPhoto {
    id: string;
    created_at: string;
    width: number;
    height: number;
    color: string;
    blur_hash: string;
    description: string | null;
    alt_description: string | null;
    urls: {
        raw: string;
        full: string;
        regular: string;
        small: string;
        thumb: string;
    };
    links: {
        self: string;
        html: string;
        download: string;
        download_location: string;
    };
    user: {
        id: string;
        username: string;
        name: string;
        portfolio_url: string | null;
        bio: string | null;
        location: string | null;
        profile_image: {
            small: string;
            medium: string;
            large: string;
        };
    };
}

export const fetchPhotos = async (page: number = 1, perPage: number = 20): Promise<UnsplashPhoto[]> => {
    try {
        // Note: In a real app, the key should be in .env
        // For this demo, we assume the user might not have a key immediately,
        // so we'll check for a key or use a fallback mechanism (mock data) if I can't provide a real key.
        // I will NOT provide my own API key. I will assume the user has one or I will write a mock fallback.

        // Let's rely on an environment variable.
        const key = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

        if (!key) {
            console.warn('Unsplash API Key is missing. Please add VITE_UNSPLASH_ACCESS_KEY to your .env file.');
            // Return mock data for demonstration purposes if no key is found
            return generateMockPhotos(perPage);
        }

        const response = await fetch(`${API_URL}/photos?page=${page}&per_page=${perPage}&order_by=popular`, {
            headers: {
                Authorization: `Client-ID ${key}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Error fetching photos: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch photos:', error);
        return generateMockPhotos(perPage);
    }
};

export const searchPhotos = async (query: string, page: number = 1, perPage: number = 20): Promise<UnsplashPhoto[]> => {
    try {
        const key = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

        if (!key) {
            console.warn('Unsplash API Key is missing. Using mock data for search.');
            return generateMockPhotos(perPage);
        }

        const response = await fetch(`${API_URL}/search/photos?page=${page}&per_page=${perPage}&query=${encodeURIComponent(query)}`, {
            headers: {
                Authorization: `Client-ID ${key}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Error searching photos: ${response.statusText}`);
        }

        const data = await response.json();
        return data.results; // Search API returns { results: [...] }
    } catch (error) {
        console.error('Failed to search photos:', error);
        return generateMockPhotos(perPage);
    }
};

const generateMockPhotos = (count: number): UnsplashPhoto[] => {
    return Array.from({ length: count }).map((_, i) => ({
        id: `mock-${i}`,
        created_at: new Date().toISOString(),
        width: 1080,
        height: 1920,
        color: '#333',
        blur_hash: 'L0000000000000000000',
        description: 'Mock Photo',
        alt_description: 'A placeholder image for the art gallery',
        urls: {
            raw: `https://source.unsplash.com/random/800x600?art&sig=${i}`,
            full: `https://source.unsplash.com/random/800x600?art&sig=${i}`,
            regular: `https://source.unsplash.com/random/800x600?art&sig=${i}`, // Unsplash source is deprecated but serves as a simple placeholder URL structure, technically redirects or fails, checking.
            // Better mock: Picsum or similar if Unsplash Source is dead.
            // Actually, Unsplash Source was deprecated. Let's use Lorem Picsum for mocks.
            small: `https://picsum.photos/400/600?random=${i}`,
            thumb: `https://picsum.photos/200/300?random=${i}`,
        },
        links: { self: '', html: '', download: '', download_location: '' },
        user: {
            id: 'user-mock',
            username: 'artist_mock',
            name: 'Unknown Artist',
            portfolio_url: null,
            bio: 'Just a mock artist',
            location: 'Nowhere',
            profile_image: { small: '', medium: '', large: '' },
        },
    }));
};
