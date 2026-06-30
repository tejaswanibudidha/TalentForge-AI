import dotenv from 'dotenv';
import app from './app.js';
import { connectDB } from './config/db.js';
import { seedDatabase } from './controllers/seedController.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await connectDB();
    await seedDatabase();
    app.listen(PORT, () => {
      console.log(`TalentForge AI backend running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Backend startup failed:', error);
    process.exit(1);
  }
})();
