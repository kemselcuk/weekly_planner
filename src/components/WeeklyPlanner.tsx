import React from 'react';
import { DayCard } from './DayCard';
import { WeekPlan } from '../types/planner';

interface WeeklyPlannerProps {
  weekPlan: WeekPlan;
  onAddNote: (date: string) => void;
  onDeleteNote: (date: string, noteId: string) => void;
}

export const WeeklyPlanner: React.FC<WeeklyPlannerProps> = ({
  weekPlan,
  onAddNote,
  onDeleteNote,
}) => {
  // Generate dates for the current week
  const getCurrentWeekDates = () => {
    const dates = [];
    const today = new Date();
    const currentDay = today.getDay();
    const diff = currentDay === 0 ? 6 : currentDay - 1; // Adjust to make Monday the first day
    
    const monday = new Date(today);
    monday.setDate(today.getDate() - diff);

    for (let i = 0; i < 7; i++) {
      const date = new Date(monday);
      date.setDate(monday.getDate() + i);
      dates.push(date.toISOString().split('T')[0]);
    }
    return dates;
  };

  const weekDates = getCurrentWeekDates();

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      {weekDates.map((date) => (
        <DayCard
          key={date}
          day={{
            date: date, // Make sure this is the exact date string
            notes: weekPlan.find(d => d.date === date)?.notes || []
          }}
          onAddNote={() => onAddNote(date)} // Modified: directly pass the date
          onDeleteNote={onDeleteNote}
        />
      ))}
    </div>
  );
};