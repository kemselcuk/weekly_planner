import React from 'react';
import { DayCard } from './DayCard';
import { WeekPlan } from '../types/planner';

interface WeeklyPlannerProps {
  weekPlan: WeekPlan;
  onAddNote: (day: string) => void;
  onDeleteNote: (day: string, noteId: string) => void;
}

export const WeeklyPlanner: React.FC<WeeklyPlannerProps> = ({
  weekPlan,
  onAddNote,
  onDeleteNote,
}) => {
  return (
    <div className="max-w-3xl mx-auto space-y-4">
      {weekPlan.map((day) => (
        <DayCard
          key={day.day}
          day={day}
          onAddNote={onAddNote}
          onDeleteNote={onDeleteNote}
        />
      ))}
    </div>
  );
};