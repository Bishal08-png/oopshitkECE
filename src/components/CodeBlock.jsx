import { useState } from 'react';
import { Copy, Check, Trash2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useData } from '../context/DataContext';

const LANG_LABELS = { java: 'Java', cpp: 'C++', python: 'Python', js: 'JavaScript' };

function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) +
    ' · ' + d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
}

export default function CodeBlock({ dayId, submission }) {
  const { dark } = useTheme();
  const { deleteSubmission } = useData();
  const [copied, setCopied]           = useState(false);
  const [deleting, setDeleting]       = useState(false);
  const [confirmDel, setConfirmDel]   = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(submission.code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  const handleDelete = async () => {
    if (!confirmDel) {
      setConfirmDel(true);
      setTimeout(() => setConfirmDel(false), 3000);
      return;
    }
    setDeleting(true);
    try {
      await deleteSubmission(dayId, submission._id);
    } catch {
      setDeleting(false);
    }
  };

  const bg   = dark ? 'bg-gray-900 border-gray-800'   : 'bg-gray-50 border-gray-200';
  const hdr  = dark ? 'bg-gray-800/70 border-gray-700' : 'bg-white border-gray-200';
  const name = dark ? 'text-gray-100' : 'text-gray-800';
  const meta = dark ? 'text-gray-400' : 'text-gray-500';
  const code = dark ? 'text-gray-200 bg-gray-900' : 'text-gray-800 bg-gray-50';
  const copyBtn = dark
    ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
    : 'bg-gray-100 hover:bg-gray-200 text-gray-600';

  return (
    <div className={`border rounded-lg overflow-hidden fade-in ${bg} ${deleting ? 'opacity-40 pointer-events-none' : ''}`}>
      {/* Card header */}
      <div className={`flex items-center justify-between px-4 py-2.5 border-b ${hdr}`}>
        <div className="flex items-center gap-3 min-w-0">
          <div className={`w-7 h-7 rounded-full shrink-0 flex items-center justify-center text-xs font-semibold
            ${dark ? 'bg-gray-700 text-gray-200' : 'bg-gray-200 text-gray-700'}`}>
            {submission.studentName[0].toUpperCase()}
          </div>
          <div className="min-w-0">
            <span className={`text-sm font-medium truncate block ${name}`}>{submission.studentName}</span>
          </div>
          <span className={`shrink-0 text-xs px-1.5 py-0.5 rounded font-mono
            ${dark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
            {LANG_LABELS[submission.language] || submission.language}
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className={`text-xs hidden sm:block ${meta}`}>{formatDate(submission.submittedAt || submission.createdAt)}</span>

          {/* Copy button */}
          <button
            id={`copy-btn-${submission._id}`}
            onClick={handleCopy}
            title="Copy code"
            className={`flex items-center gap-1.5 text-xs px-2 py-1.5 rounded-md transition-all cursor-pointer ${copyBtn}`}
          >
            {copied ? <Check size={13} className="text-green-500" /> : <Copy size={13} />}
            <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy'}</span>
          </button>

          {/* Delete button */}
          <button
            id={`delete-btn-${submission._id}`}
            onClick={handleDelete}
            title={confirmDel ? 'Click again to confirm delete' : 'Delete submission'}
            className={`flex items-center gap-1.5 text-xs px-2 py-1.5 rounded-md transition-all cursor-pointer
              ${confirmDel
                ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'
                : dark
                  ? 'bg-gray-700 hover:bg-red-900/30 text-gray-400 hover:text-red-400'
                  : 'bg-gray-100 hover:bg-red-50 text-gray-400 hover:text-red-500'
              }`}
          >
            <Trash2 size={13} />
            <span className="hidden sm:inline">{confirmDel ? 'Confirm?' : 'Delete'}</span>
          </button>
        </div>
      </div>

      {/* Code body */}
      <pre className={`p-4 text-xs leading-relaxed overflow-x-auto font-mono ${code}`}>
        <code>{submission.code}</code>
      </pre>
    </div>
  );
}
