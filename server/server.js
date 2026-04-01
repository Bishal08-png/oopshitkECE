import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import daysRouter from './routes/days.js';

const app  = express();
const PORT = process.env.PORT || 5000;

// ── Middleware ─────────────────────────────────────────────────────────────────
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());

// ── Routes ─────────────────────────────────────────────────────────────────────
app.use('/api/days', daysRouter);

app.get('/api/health', (_, res) => res.json({ status: 'ok', time: new Date() }));

// ── MongoDB Connection ─────────────────────────────────────────────────────────
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB Atlas');
    app.listen(PORT, () =>
      console.log(`🚀 Server running → http://localhost:${PORT}`)
    );
  })
  .catch(err => {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  });
