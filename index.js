import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import apiRoutes from './routes.js';
import { db } from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// API Routes
app.use('/api', apiRoutes);

// Serve static frontend assets in production build if present
const distPath = path.join(__dirname, '../dist');
app.use(express.static(distPath));

app.get('*', (req, res, next) => {
  if (req.url.startsWith('/api')) {
    return next();
  }
  const indexPath = path.join(distPath, 'index.html');
  res.sendFile(indexPath, (err) => {
    if (err) {
      res.status(200).send('StartupSetu Backend Server active on port 5000. Launch Vite dev server for frontend.');
    }
  });
});

// Keep malformed JSON responses consistent with the REST API.
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ error: 'Request body must contain valid JSON.' });
  }
  return next(err);
});

if (!process.env.VERCEL) {
  await db.ready;
  app.listen(PORT, () => {
    console.log(`=======================================================`);
    console.log(`🚀 StartupSetu GovTech Server running on port ${PORT}`);
    console.log(`👉 REST API Base: http://localhost:${PORT}/api`);
    console.log(`=======================================================`);
  });
}

export default app;
