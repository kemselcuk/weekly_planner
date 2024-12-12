import React, { useState, useEffect } from 'react';
import { WeeklyPlanner } from './components/WeeklyPlanner';
import { Header } from './components/Header';
import { FloatingNav } from './components/FloatingNav';
import { SearchModal } from './components/SearchModal';
import { SettingsModal } from './components/SettingsModal';
import { AddNoteModal } from './components/AddNoteModal';
import { WeekPlan } from './types/planner';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MonthlyPlanner from './pages/MonthlyPlanner';
import Pricing from './pages/Pricing';
import AboutUs from './pages/AboutUs';
import UserInfo from './pages/UserInfo'; // Ensure correct path to UserInfo component
import Login from './components/Login'; // If you have a login page
import SignIn from './pages/SignIn'; // If you have a sign-in page
import MeetingsPage  from './pages/MeetingsPage';

function AppContent() {
  const { isDarkMode } = useTheme();
  const [weekPlan, setWeekPlan] = useState<WeekPlan>([]);  
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isAddNoteOpen, setIsAddNoteOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState<string | undefined>(undefined);

  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  // Fetch notes from backend on mount/update
  useEffect(() => {
    const fetchNotes = async () => {
      if (!token) return;
      const res = await fetch('http://localhost:5000/api/notes', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!res.ok) {
        // If fetching notes fails (e.g., invalid token), log the user out
        handleLogout();
        return;
      }
      const notes = await res.json(); 
      
      // Transform backend notes into a WeekPlan structure
      const daysOfWeek = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
      
      const newWeekPlan: WeekPlan = daysOfWeek.map(day => ({
        day: day,
        notes: notes.filter((n: any) => {
          // Adjust this logic if your backend's day field is a string rather than a number
          // If your backend returns day as a number (1=Monday), this maps correctly
          return n.day === daysOfWeek.indexOf(day) + 1;
        }).map((n: any) => ({
          id: n._id,
          content: n.content,
          time: n.time,
          color: n.color || (isDarkMode ? '#a855f7' : '#8B5CF6')
        }))
      }));

      setWeekPlan(newWeekPlan);
    };

    fetchNotes();
  }, [token, isDarkMode]);

  const handleAddNote = async (day: string, content: string, time?: string) => {
    if (!token) return;
    const body = { 
      day: (["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"].indexOf(day)+1),
      content,
      time
    };
    const res = await fetch('http://localhost:5000/api/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(body)
    });
    if (!res.ok) {
      alert('Error adding note');
      return;
    }
    const newNote = await res.json();

    // Update state
    setWeekPlan((currentPlan) =>
      currentPlan.map((dayPlan) =>
        dayPlan.day === day
          ? {
              ...dayPlan,
              notes: [
                ...dayPlan.notes,
                {
                  id: newNote._id,
                  content: newNote.content,
                  time: newNote.time,
                  color: newNote.color || (isDarkMode ? '#a855f7' : '#8B5CF6')
                },
              ],
            }
          : dayPlan
      )
    );
  };

  const handleDeleteNote = async (day: string, noteId: string) => {
    if (!token) return;
    const res = await fetch(`http://localhost:5000/api/notes/${noteId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (!res.ok) {
      alert('Error deleting note');
      return;
    }

    // Update state
    setWeekPlan((currentPlan) =>
      currentPlan.map((dayPlan) =>
        dayPlan.day === day
          ? {
              ...dayPlan,
              notes: dayPlan.notes.filter((note) => note.id !== noteId),
            }
          : dayPlan
      )
    );
  };

  // If not authenticated, redirect all protected routes to /login
  return (
    <div className={`min-h-screen ${
      isDarkMode 
        ? 'bg-slate-950 text-gray-100' 
        : 'bg-gradient-to-b from-purple-50 to-white text-gray-900'
    }`}>
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24">
        <Routes>
          {token ? (
            <>
              <Route 
                path="/" 
                element={
                  <WeeklyPlanner
                    weekPlan={weekPlan}
                    onAddNote={(day) => {
                      setSelectedDay(day);
                      setIsAddNoteOpen(true);
                    }}
                    onDeleteNote={handleDeleteNote}
                  />
                } 
              />
              <Route path="/meetings" element={<MeetingsPage />} />
              <Route path="/monthly-planner" element={<MonthlyPlanner />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/user" element={<UserInfo token={token} onLogout={handleLogout} />} />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          ) : (
            <>
              <Route path="/login" element={<Login onLoginSuccess={(newToken: string) => {
                localStorage.setItem('token', newToken);
                setToken(newToken);
              }} />} />
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </>
          )}
        </Routes>
      </main>
      {token && (
        <>
          <FloatingNav
            onOpenSearch={() => setIsSearchOpen(true)}
            onOpenAddNote={() => setIsAddNoteOpen(true)}
            onOpenSettings={() => setIsSettingsOpen(true)}
          />
          <SearchModal
            isOpen={isSearchOpen}
            onClose={() => setIsSearchOpen(false)}
            weekPlan={weekPlan}
          />
          <SettingsModal
            isOpen={isSettingsOpen}
            onClose={() => setIsSettingsOpen(false)}
          />
          <AddNoteModal
            isOpen={isAddNoteOpen}
            onClose={() => setIsAddNoteOpen(false)}
            onAddNote={handleAddNote}
            selectedDay={selectedDay}
          />
        </>
      )}
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}

export default App;
