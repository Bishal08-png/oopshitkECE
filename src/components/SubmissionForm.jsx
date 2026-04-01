import { useState } from 'react';
import { Send, ChevronDown } from 'lucide-react';
import { useData } from '../context/DataContext';
import { useTheme } from '../context/ThemeContext';

const LANGUAGES = [
  { value: 'java',   label: 'Java' },
  { value: 'cpp',    label: 'C++' },
  { value: 'python', label: 'Python' },
  { value: 'js',     label: 'JavaScript' },
];

export default function SubmissionForm({ dayId }) {
  const { addSubmission } = useData();
  const { dark } = useTheme();
  const [studentName, setStudentName] = useState('');
  const [code, setCode]               = useState('');
  const [language, setLanguage]       = useState('java');
  const [submitted, setSubmitted]     = useState(false);
  const [error, setError]             = useState('');
  const [submitting, setSubmitting]   = useState(false);

  const surface = dark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200';
  const input   = dark
    ? 'bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-500 focus:border-gray-500'
    : 'bg-gray-50  border-gray-200 text-gray-900 placeholder-gray-400 focus:border-gray-400';
  const label   = dark ? 'text-gray-400' : 'text-gray-500';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!studentName.trim()) { setError('Please enter your name.'); return; }
    if (!code.trim())        { setError('Please paste your code.'); return; }
    setError('');
    setSubmitting(true);
    try {
      await addSubmission(dayId, { studentName: studentName.trim(), code: code.trim(), language });
      setSubmitted(true);
      setTimeout(() => { setSubmitted(false); setStudentName(''); setCode(''); setLanguage('java'); }, 2000);
    } catch (err) {
      setError('Submit failed: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={`border rounded-xl p-5 ${surface}`}>
      <h3 className={`text-xs font-semibold uppercase tracking-widest mb-4 ${label}`}>
        Submit Your Solution
      </h3>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className="flex gap-3 flex-col sm:flex-row">
          <input
            id="student-name-input"
            type="text"
            placeholder="Your name..."
            value={studentName}
            onChange={e => setStudentName(e.target.value)}
            className={`flex-1 border rounded-lg px-3 py-2 text-sm transition-colors duration-150 ${input}`}
          />
          <div className="relative">
            <select
              id="language-select"
              value={language}
              onChange={e => setLanguage(e.target.value)}
              className={`appearance-none border rounded-lg px-3 py-2 pr-8 text-sm cursor-pointer w-full sm:w-auto transition-colors duration-150 ${input}`}
            >
              {LANGUAGES.map(l => <option key={l.value} value={l.value}>{l.label}</option>)}
            </select>
            <ChevronDown size={14} className={`absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none ${label}`} />
          </div>
        </div>
        <textarea
          id="code-textarea"
          placeholder="// Paste your code here..."
          value={code}
          onChange={e => setCode(e.target.value)}
          rows={10}
          spellCheck={false}
          className={`border rounded-lg px-3 py-2.5 text-xs font-mono leading-relaxed resize-y transition-colors duration-150 ${input}`}
        />
        {error && <p className="text-red-500 text-xs">{error}</p>}
        <div className="flex justify-end">
          <button
            id="submit-code-btn"
            type="submit"
            disabled={submitting}
            className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium transition-all duration-150 cursor-pointer disabled:opacity-50
              ${submitted
                ? 'bg-green-500 text-white'
                : dark
                  ? 'bg-gray-100 text-gray-900 hover:bg-white'
                  : 'bg-gray-900 text-white hover:bg-gray-700'
              }`}
          >
            <Send size={14} />
            {submitting ? 'Submitting…' : submitted ? 'Submitted!' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
}
