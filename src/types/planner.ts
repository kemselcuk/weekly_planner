export interface Note {
  id: string;
  content: string;
  time?: string;
  color?: string;
  status: 'pending' | 'in-progress' | 'completed';
}

export interface DayPlan {
  date: string; // Changed from day to date
  notes: Note[];
}

export type WeekPlan = DayPlan[];

export interface SearchResult {
  day: string;
  note: Note;
}