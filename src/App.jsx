return (
  <div className={`flex h-screen overflow-hidden ${main}`}>
    <Sidebar
      selectedDayId={view === 'day' ? effectiveId : null}
      onSelectDay={handleSelectDay}
      onCreateNew={handleCreateNew}
      isOpen={sidebarOpen}
      onClose={() => setSidebarOpen(false)}
    />

    <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
      <Topbar onMenuClick={() => setSidebarOpen(true)} />

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-y-auto">
        {loading ? (
          <div className={`flex flex-col items-center justify-center h-full gap-3 text-sm ${spinner}`}>
            <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
            Connecting to database…
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center h-full gap-2 text-sm text-red-400 text-center px-6">
            <span className="text-2xl">⚠️</span>
            <p className="font-medium">Could not reach the server</p>
            <p className="text-xs opacity-70">{error}</p>
            <p className="text-xs opacity-50 mt-1">
              Make sure the backend is running: <code>cd server && npm run dev</code>
            </p>
          </div>
        ) : view === 'create' ? (
          <CreateLabForm onCreated={handleCreated} onCancel={() => setView('day')} />
        ) : selectedDay ? (
          <DayPage key={selectedDay._id} day={selectedDay} />
        ) : (
          <div className="flex flex-col items-center justify-center h-full gap-3 text-center">
            <p className={`text-sm ${dark ? 'text-gray-500' : 'text-gray-400'}`}>
              No labs yet.
            </p>
            <button
              onClick={handleCreateNew}
              className={`text-sm px-4 py-2 rounded-lg font-medium cursor-pointer transition-colors
                ${dark ? 'bg-gray-800 text-gray-200 hover:bg-gray-700' : 'bg-gray-900 text-white hover:bg-gray-700'}`}
            >
              + Create your first lab
            </button>
          </div>
        )}
      </main>

      {/* 🔥 FOOTER ADDED HERE */}
      <footer className={`text-center py-3 text-xs border-t 
        ${dark ? 'border-gray-800 text-gray-500' : 'border-gray-200 text-gray-500'}`}>
        © 2026 OOPsHitkECE Lab Portal • Made by Bishal
      </footer>

    </div>
  </div>
);
