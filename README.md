# 🎨 GaleryArt

GaleryArt is a modern, premium art gallery application designed with a focus on visual excellence and a seamless user experience. It leverages the **Unsplash API** to provide a vast collection of high-quality photographs, presented in a sleek, dark-themed interface.

---

## ✨ Features

- **🏆 Hero Carousel**: A dynamic, high-impact showcase of curated photography on the home page.
- **🖼️ Responsive Gallery**: A fluid, grid-based layout that adapts perfectly to any screen size.
- **🔍 Powerful Search**: Easily find inspiration by searching through millions of photos.
- **❤️ Favorites System**: Save your favorite pieces to a dedicated favorites collection, persisted locally.
- **📱 Immersive Modal**: Detailed view of each photograph with artist information and high-resolution previews.
- **⚡ Performance First**: Built with React 19 and Vite for lightning-fast load times and smooth transitions.
- **🌗 Premium Aesthetics**: A sophisticated dark-mode design using modern typography and smooth animations.

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite 7](https://vitejs.dev/)
- **Styling**: Vanilla CSS (Custom Hooks & CSS Variables)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Routing**: [React Router 7](https://reactrouter.com/)
- **API**: [Unsplash API](https://unsplash.com/developers)
- **Language**: [TypeScript](https://www.typescriptlang.org/)

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18.0.0 or higher)
- npm or yarn
- An Unsplash Developer account for an API Key

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/galery-art.git
   cd galery-art
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory and add your Unsplash Access Key:
   ```env
   VITE_UNSPLASH_ACCESS_KEY=your_access_key_here
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

---

## 📂 Project Structure

```text
src/
├── assets/         # Static assets and images
├── components/     # Reusable UI components (Navbar, Gallery, Modal, etc.)
├── pages/          # Top-level page components (Home, About, Favorites)
├── services/       # API integration and logic
│   └── api.ts      # Unsplash API service
├── App.tsx         # Main application component & routing
├── main.tsx        # Application entry point
├── index.css       # Global styles and design tokens
└── App.css         # Component-specific styles
```

---

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request if you have ideas for improvements or new features.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

*Made with ❤️ by the GaleryArt team.*
