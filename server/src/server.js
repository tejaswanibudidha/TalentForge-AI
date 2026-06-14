import app from './app.js';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

(async function start() {
  try {
    await connectDB();
  } catch (err) {
    console.error('Unexpected error while connecting to DB:', err);
  } finally {
    // Create HTTP server and handle listen errors (EADDRINUSE) gracefully by attempting next port
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

    startServer(PORT);
  }
})();
