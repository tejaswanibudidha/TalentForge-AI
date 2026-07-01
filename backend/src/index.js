import dotenv from 'dotenv';
import app from './app.js';
import { connectDB } from './config/db.js';
import { seedDatabase } from './controllers/seedController.js';

dotenv.config();

let PORT = process.env.PORT || 5000;

function startServer(port) {
  return new Promise((resolve) => {
    const server = app.listen(port, () => {
      console.log(`\n🚀 TalentForge AI backend running on http://localhost:${port}`);
      console.log(`📡 API endpoints available at http://localhost:${port}/api/*\n`);
      resolve(server);
    }).on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.warn(`⚠️  Port ${port} is already in use, trying port ${port + 1}...`);
        server.close();
        resolve(startServer(port + 1));
      } else {
        throw err;
      }
    });
  });
}

(async () => {
  try {
    await connectDB();
    await seedDatabase();
    await startServer(PORT);
  } catch (error) {
    console.error('❌ Backend startup failed:', error.message);
    process.exit(1);
  }
})();
