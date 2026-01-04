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

// Simple seeded random number generator to ensure consistent results across refreshes
const seededRandom = (seed: number) => {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
};

export const fetchPhotos = async (page: number = 1, perPage: number = 20): Promise<UnsplashPhoto[]> => {
    try {
        const key = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

        if (!key) {
            console.warn('Unsplash API Key is missing. Please add VITE_UNSPLASH_ACCESS_KEY to your .env file.');
            return generateMockPhotos(perPage, page);
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
        return generateMockPhotos(perPage, page);
    }
};

export const searchPhotos = async (query: string, page: number = 1, perPage: number = 20): Promise<UnsplashPhoto[]> => {
    try {
        const key = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

        if (!key) {
            console.warn('Unsplash API Key is missing. Using mock data for search.');
            return generateMockPhotos(perPage, page);
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
        return generateMockPhotos(perPage, page);
    }
};

const generateMockPhotos = (count: number, page: number = 1): UnsplashPhoto[] => {
    return Array.from({ length: count }).map((_, i) => {
        // Create a unique seed based on page and index to ensure this specific item is always the same
        const seed = page * 1000 + i;

        // Use seeded random for aspect ratios
        const aspectRatio = seededRandom(seed);
        let width, height;

        if (aspectRatio < 0.4) {
            // Portrait
            width = 400;
            height = 600 + Math.floor(seededRandom(seed + 1) * 200);
        } else if (aspectRatio < 0.8) {
            // Landscape
            width = 600;
            height = 400 + Math.floor(seededRandom(seed + 2) * 100);
        } else {
            // Square-ish
            width = 500;
            height = 500;
        }

        // Use the seed for the image URL too, ensuring the image visual is consistent
        const imageSeed = Math.floor(seededRandom(seed + 3) * 1000);

        return {
            id: `mock-${seed}`, // Use the stable seed as ID so it persists correctly with page
            created_at: new Date().toISOString(),
            width: width,
            height: height,
            color: '#333',
            blur_hash: 'L0000000000000000000',
            description: 'Mock Photo',
            alt_description: 'A placeholder image for the art gallery',
            urls: {
                raw: `https://picsum.photos/seed/${imageSeed}/${width}/${height}`,
                full: `https://picsum.photos/seed/${imageSeed}/${width}/${height}`,
                regular: `https://picsum.photos/seed/${imageSeed}/${width}/${height}`,
                small: `https://picsum.photos/seed/${imageSeed}/${width}/${height}`,
                thumb: `https://picsum.photos/seed/${imageSeed}/200/200`,
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
        };
    });
};
