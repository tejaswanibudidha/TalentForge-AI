import app from './app.js';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

(async function start() {
  const http = await import('http');
  const startServer = (port) => {
    const server = http.createServer(app);
    server.listen(port);
    server.on('listening', () => {
      console.log(`SmartHire AI server running on http://localhost:${port}`);
    });
    server.on('error', (err) => {
      if (err && err.code === 'EADDRINUSE') {
        const nextPort = Number(port) + 1;
        console.warn(`Port ${port} in use, trying ${nextPort}...`);
        setTimeout(() => startServer(nextPort), 500);
      } else {
        console.error('Server error:', err);
      }
    });
  };

  try {
    await connectDB();
    startServer(PORT);
  } catch (err) {
    console.error('Failed to start server because MongoDB is not connected:', err);
    process.exit(1);
  }
})();
