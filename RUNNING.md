# How to Run wick ai (trial) from GitHub

This guide will help you set up and run the project from the GitHub repository: https://github.com/MalyajNailwal/wick-testing-ai.git

## Prerequisites
- Node.js (v18 or higher recommended)
- npm (comes with Node.js)
- Git
- Visual Studio Code (recommended)

## Steps

### 1. Get the GitHub Link
Copy the repository URL: `https://github.com/MalyajNailwal/wick-testing-ai.git`

### 2. Open Visual Studio Code
Launch VS Code on your computer.

### 3. Clone the Repository in VS Code
- Open the Command Palette (`Cmd+Shift+P` on Mac, `Ctrl+Shift+P` on Windows/Linux)
- Type `Git: Clone` and select it
- Paste the repository URL and press Enter
- Choose a folder to clone into
- When prompted, click "Open" to open the cloned project in VS Code

### 4. Open a Terminal in VS Code
- Go to `View` > `Terminal` or press ``Ctrl+` `` (backtick)

### 5. Install Dependencies
Use the legacy peer dependencies flag to avoid conflicts:
```bash
npm install --legacy-peer-deps
```

### 6. Start the Development Server
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
