import express from 'express';
import { Day } from '../models/Day.js';

const router = express.Router();

// ── GET all days (sorted) ─────────────────────────────────────────────────────
router.get('/', async (req, res) => {
  try {
    const days = await Day.find().sort({ dayNumber: 1 });
    res.json(days);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ── GET single day ────────────────────────────────────────────────────────────
router.get('/:id', async (req, res) => {
  try {
    const day = await Day.findById(req.params.id);
    if (!day) return res.status(404).json({ message: 'Day not found' });
    res.json(day);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ── POST create new day ───────────────────────────────────────────────────────
// Body: { dayNumber, title?, topic?, question? }
router.post('/', async (req, res) => {
  try {
    const { dayNumber, title, topic, question } = req.body;
    const existing = await Day.findOne({ dayNumber });
    if (existing) return res.status(409).json({ message: `Day ${dayNumber} already exists.` });

    const day = new Day({
      dayNumber,
      title:    title    || `Day ${dayNumber}`,
      topic:    topic    || '',
      question: question || '',
    });
    const saved = await day.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ── PUT update a day (topic, question) ───────────────────────────────────────
// Body: { topic?, question?, title? }
router.put('/:id', async (req, res) => {
  try {
    const { title, topic, question } = req.body;
    const day = await Day.findById(req.params.id);
    if (!day) return res.status(404).json({ message: 'Day not found' });

    if (title    !== undefined) day.title    = title;
    if (topic    !== undefined) day.topic    = topic;
    if (question !== undefined) day.question = question;

    const saved = await day.save();
    res.json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ── DELETE an entire day ──────────────────────────────────────────────────────
router.delete('/:id', async (req, res) => {
  try {
    const day = await Day.findByIdAndDelete(req.params.id);
    if (!day) return res.status(404).json({ message: 'Day not found' });
    res.json({ message: 'Day deleted.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ── POST add submission to a day ──────────────────────────────────────────────
// Body: { studentName, language, code }
router.post('/:id/submissions', async (req, res) => {
  try {
    const day = await Day.findById(req.params.id);
    if (!day) return res.status(404).json({ message: 'Day not found' });

    const { studentName, language, code } = req.body;
    if (!studentName || !code)
      return res.status(400).json({ message: 'studentName and code are required.' });

    day.submissions.push({ studentName, language: language || 'java', code });
    const saved = await day.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ── DELETE a submission from a day ────────────────────────────────────────────
router.delete('/:dayId/submissions/:subId', async (req, res) => {
  try {
    const day = await Day.findById(req.params.dayId);
    if (!day) return res.status(404).json({ message: 'Day not found' });

    day.submissions.pull({ _id: req.params.subId });
    await day.save();
    res.json({ message: 'Submission deleted.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
