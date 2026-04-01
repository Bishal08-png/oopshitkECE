import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import daysRouter from './routes/days.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/days', daysRouter);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date() });
});

// MongoDB (connect only once)
let isConnected = false;

async function connectDB() {
  if (isConnected) return;
  await mongoose.connect(process.env.MONGO_URI);
  isConnected = true;
}

// Local dev fallback
if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
  const PORT = process.env.PORT || 5000;
  connectDB().then(() => {
    app.listen(PORT, () => console.log(`🚀 Server running locally on port ${PORT}`));
  });
}

// Vercel handler
export default async function handler(req, res) {
  await connectDB();
  return app(req, res);
}