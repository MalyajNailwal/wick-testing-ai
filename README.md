# wick ai (trial)

A voice-enabled AI chat web application built with React, Vite, and TypeScript.

## Features
- Real-time voice recognition and chat
- Modern UI with Tailwind CSS
- Cohere AI integration for natural language understanding
- Image and voice services
- Responsive design for mobile and desktop

## Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm

### Installation
```bash
npm install --legacy-peer-deps
```

### Environment Variables
Create a `.env` file in the project root and add your Cohere API key:
```env
VITE_COHERE_API_KEY=your_cohere_api_key_here
```

### Running Locally
```bash
npm run dev
```
Visit [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure
- `src/components` – UI and chat components
- `src/pages` – Main app pages (Chat, Landing, Login, Register, etc.)
- `src/services` – API and utility services
- `public/` – Static assets and favicon

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License
MIT

---

