import { useState } from 'react';
import { Users, Code2, Pencil, Check, X } from 'lucide-react';
import SubmissionForm from './SubmissionForm';
import CodeBlock from './CodeBlock';
import { useData } from '../context/DataContext';
import { useTheme } from '../context/ThemeContext';

export default function DayPage({ day }) {
  const { updateDay } = useData();
  const { dark } = useTheme();
  const [editing, setEditing]       = useState(false);
  const [editTopic, setEditTopic]   = useState(day.topic || '');
  const [editQ, setEditQ]           = useState(day.question || '');
  const [saving, setSaving]         = useState(false);

  const heading    = dark ? 'text-gray-100' : 'text-gray-900';
  const subheading = dark ? 'text-gray-500' : 'text-gray-400';
  const question   = dark ? 'text-gray-300 border-gray-700 bg-gray-800/50' : 'text-gray-600 border-gray-200 bg-gray-50';
  const empty      = dark ? 'text-gray-600 border-gray-800 bg-gray-900/40' : 'text-gray-400 border-gray-200 bg-gray-50';
  const sectionLbl = dark ? 'text-gray-500' : 'text-gray-400';
  const input      = dark
    ? 'bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-500 focus:border-gray-500'
    : 'bg-gray-50  border-gray-200 text-gray-900 placeholder-gray-400 focus:border-gray-400';
  const editBtn    = dark ? 'text-gray-500 hover:text-gray-300 hover:bg-gray-800' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100';

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateDay(day._id, { topic: editTopic.trim(), question: editQ.trim() });
      setEditing(false);
    } catch (err) {
      alert('Save failed: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setEditTopic(day.topic || '');
    setEditQ(day.question || '');
    setEditing(false);
  };

  const count = day.submissions.length;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 fade-in">
      {/* Header */}
      <div className="mb-6">
        <p className={`text-xs font-semibold uppercase tracking-widest mb-1 ${subheading}`}>
          Object-Oriented Programming Lab
        </p>

        {editing ? (
          /* ── Edit mode ── */
          <div className="flex flex-col gap-3">
            <div className="flex gap-3 items-center">
              <span className={`text-3xl font-bold tracking-tight ${heading}`}>{day.title} —</span>
              <input
                autoFocus
                value={editTopic}
                onChange={e => setEditTopic(e.target.value)}
                placeholder="Topic name"
                className={`flex-1 border rounded-lg px-3 py-1.5 text-xl font-bold transition-colors ${input}`}
              />
            </div>
            <textarea
              value={editQ}
              onChange={e => setEditQ(e.target.value)}
              rows={4}
              placeholder="Lab question..."
              className={`border rounded-lg px-3 py-2.5 text-sm leading-relaxed resize-y transition-colors ${input}`}
            />
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                disabled={saving}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm font-medium cursor-pointer transition-colors
                  ${dark ? 'bg-gray-100 text-gray-900 hover:bg-white' : 'bg-gray-900 text-white hover:bg-gray-700'} disabled:opacity-50`}
              >
                <Check size={14} /> {saving ? 'Saving…' : 'Save'}
              </button>
              <button
                onClick={handleCancel}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm cursor-pointer transition-colors ${editBtn}`}
              >
                <X size={14} /> Cancel
              </button>
            </div>
          </div>
        ) : (
          /* ── View mode ── */
          <div>
            <div className="flex items-start gap-2 group">
              <h1 className={`text-3xl font-bold tracking-tight mb-3 ${heading}`}>
                {day.title}
                {day.topic && <span className={`${dark ? 'text-gray-400' : 'text-gray-500'}`}> · {day.topic}</span>}
              </h1>
              <button
                id="edit-day-btn"
                onClick={() => setEditing(true)}
                title="Edit topic & question"
                className={`mt-1 p-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-all cursor-pointer ${editBtn}`}
              >
                <Pencil size={13} />
              </button>
            </div>
            {day.question ? (
              <blockquote className={`border-l-2 pl-4 py-1 rounded-r-lg text-sm leading-relaxed ${question}`}>
                {day.question}
              </blockquote>
            ) : (
              <p className={`text-sm italic ${dark ? 'text-gray-600' : 'text-gray-400'}`}>
                No question set. <button onClick={() => setEditing(true)} className="underline cursor-pointer">Add one</button>
              </p>
            )}
          </div>
        )}
      </div>

      {/* Submit section */}
      <div className={`flex items-center gap-2 text-xs my-6 ${sectionLbl}`}>
        <Code2 size={13} />
        <span className="uppercase tracking-widest font-medium">Submit Your Solution</span>
      </div>
      <SubmissionForm dayId={day._id} />

      {/* Feed section */}
      <div className={`flex items-center gap-2 text-xs mt-8 mb-4 ${sectionLbl}`}>
        <Users size={13} />
        <span className="uppercase tracking-widest font-medium">Class Submissions · {count}</span>
      </div>

      {count === 0 ? (
        <div className={`border border-dashed rounded-xl p-10 text-center text-sm ${empty}`}>
          No submissions yet. Be the first to submit!
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {day.submissions.map(sub => (
            <CodeBlock key={sub._id} dayId={day._id} submission={sub} />
          ))}
        </div>
      )}

      <div className="h-16" />
    </div>
  );
}
