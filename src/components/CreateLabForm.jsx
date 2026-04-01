import { useState } from 'react';
import { ArrowLeft, BookPlus } from 'lucide-react';
import { useData } from '../context/DataContext';
import { useTheme } from '../context/ThemeContext';

export default function CreateLabForm({ onCreated, onCancel }) {
  const { days, createDay } = useData();
  const { dark } = useTheme();

  const nextDay = (days.length > 0 ? Math.max(...days.map(d => d.dayNumber)) : 0) + 1;

  const [dayNumber, setDayNumber] = useState(String(nextDay));
  const [topic, setTopic]         = useState('');
  const [question, setQuestion]   = useState('');
  const [saving, setSaving]       = useState(false);
  const [error, setError]         = useState('');

  const surface  = dark ? 'bg-gray-900 border-gray-800'  : 'bg-white border-gray-200';
  const input    = dark
    ? 'bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-500 focus:border-gray-500'
    : 'bg-gray-50  border-gray-200 text-gray-900 placeholder-gray-400 focus:border-gray-400';
  const label    = dark ? 'text-gray-400' : 'text-gray-500';
  const heading  = dark ? 'text-gray-100' : 'text-gray-900';
  const back     = dark ? 'text-gray-400 hover:text-gray-200' : 'text-gray-400 hover:text-gray-700';

  const handleSave = async (e) => {
    e.preventDefault();
    setError('');
    if (!dayNumber || isNaN(Number(dayNumber))) { setError('Enter a valid day number.'); return; }
    if (!topic.trim()) { setError('Topic name is required.'); return; }
    if (!question.trim()) { setError('Lab question is required.'); return; }

    setSaving(true);
    try {
      const newDay = await createDay({
        dayNumber: Number(dayNumber),
        topic: topic.trim(),
        question: question.trim(),
      });
      onCreated(newDay._id);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 fade-in">
      {/* Back */}
      <button
        onClick={onCancel}
        className={`flex items-center gap-1.5 text-sm mb-6 transition-colors cursor-pointer ${back}`}
      >
        <ArrowLeft size={14} />
        Back
      </button>

      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${dark ? 'bg-gray-800' : 'bg-gray-100'}`}>
          <BookPlus size={18} className={dark ? 'text-gray-300' : 'text-gray-600'} />
        </div>
        <div>
          <h1 className={`text-2xl font-bold tracking-tight ${heading}`}>Create New Lab</h1>
          <p className={`text-sm ${label}`}>Add a new day, topic, and question to the portal</p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSave} className={`border rounded-xl p-6 flex flex-col gap-5 ${surface}`}>
        {/* Row: Day number + Topic */}
        <div className="flex gap-4 flex-col sm:flex-row">
          <div className="flex flex-col gap-1.5 sm:w-28">
            <label className={`text-xs font-semibold uppercase tracking-widest ${label}`}>Day #</label>
            <input
              id="create-day-number"
              type="number"
              min="1"
              value={dayNumber}
              onChange={e => setDayNumber(e.target.value)}
              className={`border rounded-lg px-3 py-2 text-sm transition-colors duration-150 ${input}`}
              placeholder="1"
            />
          </div>
          <div className="flex flex-col gap-1.5 flex-1">
            <label className={`text-xs font-semibold uppercase tracking-widest ${label}`}>Topic Name</label>
            <input
              id="create-topic-input"
              type="text"
              value={topic}
              onChange={e => setTopic(e.target.value)}
              placeholder="e.g. Classes & Objects"
              className={`border rounded-lg px-3 py-2 text-sm transition-colors duration-150 ${input}`}
            />
          </div>
        </div>

        {/* Question */}
        <div className="flex flex-col gap-1.5">
          <label className={`text-xs font-semibold uppercase tracking-widest ${label}`}>Lab Question</label>
          <textarea
            id="create-question-textarea"
            value={question}
            onChange={e => setQuestion(e.target.value)}
            rows={5}
            placeholder="Enter the full lab question here..."
            className={`border rounded-lg px-3 py-2.5 text-sm leading-relaxed resize-y transition-colors duration-150 ${input}`}
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        {/* Actions */}
        <div className="flex items-center justify-between pt-1">
          <button
            type="button"
            onClick={onCancel}
            className={`text-sm px-4 py-2 rounded-lg cursor-pointer transition-colors
              ${dark ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-800' : 'text-gray-500 hover:text-gray-800 hover:bg-gray-100'}`}
          >
            Cancel
          </button>
          <button
            id="save-lab-btn"
            type="submit"
            disabled={saving}
            className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer
              ${dark ? 'bg-gray-100 text-gray-900 hover:bg-white disabled:opacity-50' : 'bg-gray-900 text-white hover:bg-gray-700 disabled:opacity-50'}`}
          >
            {saving ? 'Saving…' : '✓ Save Lab'}
          </button>
        </div>
      </form>
    </div>
  );
}
