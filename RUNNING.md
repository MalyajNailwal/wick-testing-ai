# How to Run wick ai (trial) from GitHub

This guide will help you set up and run the project from the GitHub repository: https://github.com/MalyajNailwal/wick-testing-ai.git

## Prerequisites
- Node.js (v18 or higher recommended)
- npm (comes with Node.js)
- Git

## Steps

### 1. Clone the Repository
Open your terminal and run:
```bash
git clone https://github.com/MalyajNailwal/wick-testing-ai.git
```

### 2. Navigate to the Project Directory
```bash
cd wick-testing-ai
```

### 3. Install Dependencies
Use the legacy peer dependencies flag to avoid conflicts:
```bash
npm install --legacy-peer-deps
```

### 4. Start the Development Server
```bash
npm run dev
```

The app will start locally, usually at [http://localhost:5173](http://localhost:5173).

## Additional Scripts
- `npm run build` – Build the app for production
- `npm run preview` – Preview the production build
- `npm run lint` – Run ESLint for code quality

## Project Structure
- `src/` – Source code (components, pages, services)
- `public/` – Static assets and favicon
- `package.json` – Project dependencies and scripts

## Troubleshooting
- If you encounter dependency issues, ensure you are using the correct Node.js version.
- For any other issues, check the repository's Issues tab or open a new issue.

---

Maintained by Malyaj Nailwal
