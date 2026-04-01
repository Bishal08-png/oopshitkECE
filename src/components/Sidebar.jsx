import { useState } from 'react';
import { Plus, Trash2, BookOpen, ChevronRight } from 'lucide-react';
import { useData } from '../context/DataContext';
import { useTheme } from '../context/ThemeContext';

export default function Sidebar({ selectedDayId, onSelectDay, onCreateNew, isOpen, onClose }) {
  const { days, deleteDay } = useData();
  const { dark } = useTheme();
  const [confirmDelete, setConfirmDelete] = useState(null); // dayId pending confirm

  const bg      = dark ? 'bg-gray-950 border-gray-800'  : 'bg-white border-gray-200';
  const item    = dark ? 'text-gray-400 hover:bg-gray-800 hover:text-gray-100' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900';
  const active  = dark ? 'bg-gray-800 text-gray-100 font-medium' : 'bg-gray-100 text-gray-900 font-medium';
  const divider = dark ? 'border-gray-800' : 'border-gray-100';
  const title   = dark ? 'text-gray-200' : 'text-gray-800';
  const badge   = dark ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500';
  const createBtn = dark
    ? 'bg-gray-800 text-gray-200 hover:bg-gray-700 border border-gray-700'
    : 'bg-gray-900 text-white hover:bg-gray-700';

  const handleDelete = async (e, dayId) => {
    e.stopPropagation();
    if (confirmDelete === dayId) {
      await deleteDay(dayId);
      setConfirmDelete(null);
      if (selectedDayId === dayId) onSelectDay(null);
    } else {
      setConfirmDelete(dayId);
      setTimeout(() => setConfirmDelete(null), 3000); // auto-cancel after 3s
    }
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/30 z-20 lg:hidden backdrop-blur-[2px]" onClick={onClose} />
      )}

      <aside className={`
        fixed top-0 left-0 h-full w-64 border-r z-30 flex flex-col
        sidebar-transition
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:z-auto
        ${bg}
      `}>
        {/* Logo */}
        <div className={`flex items-center gap-2.5 px-5 py-4 border-b ${divider}`}>
          <div className={`w-7 h-7 rounded-md flex items-center justify-center ${dark ? 'bg-gray-800' : 'bg-gray-900'}`}>
            <BookOpen size={14} className="text-white" />
          </div>
          <div>
            <p className={`text-sm font-semibold leading-tight ${title}`}>OOPsHitkECE</p>
            <p className={`text-[10px] ${dark ? 'text-gray-500' : 'text-gray-400'}`}>Lab Portal</p>
          </div>
        </div>

        {/* Create new lab button */}
        <div className="px-3 pt-3 pb-1">
          <button
            id="create-new-lab-btn"
            onClick={() => { onCreateNew(); onClose(); }}
            className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 cursor-pointer ${createBtn}`}
          >
            <Plus size={15} />
            Create New Lab
          </button>
        </div>

        {/* Label */}
        <p className={`px-5 pt-3 pb-1.5 text-[10px] font-semibold uppercase tracking-widest ${dark ? 'text-gray-600' : 'text-gray-400'}`}>
          Labs · {days.length}
        </p>

        {/* Day list */}
        <nav className="flex-1 overflow-y-auto px-2 pb-2">
          {days.length === 0 && (
            <p className={`text-xs px-3 py-3 ${dark ? 'text-gray-600' : 'text-gray-400'}`}>
              No labs yet. Create one!
            </p>
          )}
          {days.map(day => (
            <div
              key={day._id}
              className={`group flex items-center gap-1 mb-0.5 rounded-lg transition-all duration-100
                ${selectedDayId === day._id ? active : item}`}
            >
              <button
                id={`sidebar-day-${day._id}`}
                onClick={() => { onSelectDay(day._id); onClose(); }}
                className="flex-1 flex items-center gap-2 px-3 py-2 text-sm text-left cursor-pointer min-w-0"
              >
                <ChevronRight size={12} className="shrink-0 opacity-40" />
                <span className="truncate">
                  <span className="font-medium">Day {day.dayNumber}</span>
                  {day.topic && <span className="opacity-60"> · {day.topic}</span>}
                </span>
                {day.submissions.length > 0 && (
                  <span className={`shrink-0 text-[10px] px-1.5 py-0.5 rounded-full ml-auto ${badge}`}>
                    {day.submissions.length}
                  </span>
                )}
              </button>

              {/* Delete day button */}
              <button
                onClick={e => handleDelete(e, day._id)}
                title={confirmDelete === day._id ? 'Click again to confirm delete' : 'Delete this lab'}
                className={`shrink-0 mr-1.5 p-1 rounded opacity-0 group-hover:opacity-100 transition-all cursor-pointer
                  ${confirmDelete === day._id
                    ? 'opacity-100 text-red-500 bg-red-50 dark:bg-red-900/20'
                    : dark ? 'hover:bg-gray-700 text-gray-500 hover:text-red-400' : 'hover:bg-gray-200 text-gray-400 hover:text-red-500'
                  }`}
              >
                <Trash2 size={12} />
              </button>
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}
