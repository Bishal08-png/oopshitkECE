import mongoose from 'mongoose';

const submissionSchema = new mongoose.Schema(
  {
    studentName: { type: String, required: true, trim: true },
    language:    { type: String, enum: ['java', 'cpp', 'python', 'js'], default: 'java' },
    code:        { type: String, required: true },
  },
  { timestamps: true }
);

const daySchema = new mongoose.Schema(
  {
    dayNumber: { type: Number, required: true, unique: true },
    title:     { type: String, required: true },
    topic:     { type: String, default: '' },          // ← new: e.g. "Inheritance"
    question:  { type: String, default: '' },
    submissions: [submissionSchema],
  },
  { timestamps: true }
);

export const Day = mongoose.model('Day', daySchema);
