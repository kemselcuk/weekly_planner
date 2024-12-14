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
        handleLogout();
        return;
      }
      const notes = await res.json();
      
      // Get current week dates
      const today = new Date();
      const currentDay = today.getDay();
      const diff = currentDay === 0 ? 6 : currentDay - 1;
      const monday = new Date(today);
      monday.setDate(today.getDate() - diff);
      
      const weekDates = Array.from({ length: 7 }, (_, i) => {
        const date = new Date(monday);
        date.setDate(monday.getDate() + i);
        return date.toISOString().split('T')[0];
      });

      // Transform backend notes into a WeekPlan structure
      const newWeekPlan: WeekPlan = weekDates.map(date => ({
        date,
        notes: notes
          .filter((n: any) => n.date === date)
          .map((n: any) => ({
            id: n._id,
            content: n.content,
            time: n.time,
            status: n.status || 'pending', // Add this line
            color: n.color || (isDarkMode ? '#a855f7' : '#8B5CF6')
          }))
      }));

      setWeekPlan(newWeekPlan);
    };

    fetchNotes();
  }, [token, isDarkMode]);

  const handleAddNote = async (
    date: string, 
    content: string, 
    time?: string, 
    status: 'pending' | 'in-progress' | 'completed' = 'pending'
  ) => {
    if (!token) return;
    const body = { 
      date,
      content,
      time,
      status
    };
    console.log('Sending note data:', body); // Add this line to debug
    const res = await fetch('http://localhost:5000/api/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(body)
    });
    if (!res.ok) {
      const errorData = await res.json(); // Add this line to see the error
      console.error('Error response:', errorData); // Add this line to debug
      alert('Error adding note');
      return;
    }
    const newNote = await res.json();

    // Update state with status included
    setWeekPlan((currentPlan) =>
      currentPlan.map((dayPlan) =>
        dayPlan.date === date
          ? {
              ...dayPlan,
              notes: [
                ...dayPlan.notes,
                {
                  id: newNote._id,
                  content: newNote.content,
                  time: newNote.time,
                  status: newNote.status, // Add this line
                  color: newNote.color || (isDarkMode ? '#a855f7' : '#8B5CF6')
                },
              ],
            }
          : dayPlan
      )
    );
  };

  const handleDeleteNote = async (date: string, noteId: string) => {
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
        dayPlan.date === date
          ? {
              ...dayPlan,
              notes: dayPlan.notes.filter((note) => note.id !== noteId),
            }
          : dayPlan
      )
    );
  };

  const handleUpdateNoteStatus = async (
    date: string,
    noteId: string,
    newStatus: 'pending' | 'in-progress' | 'completed'
  ) => {
    if (!token) return;
    
    try {
      const res = await fetch(`http://localhost:5000/api/notes/${noteId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
  
      if (!res.ok) {
        const errorData = await res.json();
        console.error('Error updating status:', errorData);
        alert('Error updating note status');
        return;
      }
  
      const updatedNote = await res.json();
  
      // Update state locally only after successful backend update
      setWeekPlan((currentPlan) =>
        currentPlan.map((dayPlan) =>
          dayPlan.date === date
            ? {
                ...dayPlan,
                notes: dayPlan.notes.map((note) =>
                  note.id === noteId
                    ? { 
                        ...note, 
                        status: updatedNote.status // Use the status from the server response
                      }
                    : note
                ),
              }
            : dayPlan
        )
      );
    } catch (error) {
      console.error('Error:', error);
      alert('Error updating note status');
    }
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
                    onAddNote={(date) => {
                      console.log('Selected date:', date); // Add this debug log
                      setSelectedDay(date);
                      setIsAddNoteOpen(true);
                    }}
                    onDeleteNote={handleDeleteNote}
                    onUpdateNoteStatus={handleUpdateNoteStatus}
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
            onClose={() => {
              setIsAddNoteOpen(false);
              setSelectedDay(undefined); // Reset selectedDay when closing
            }}
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
