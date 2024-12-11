export interface PlannerNote {
  id: string;
  content: string;
  time?: string;
  color: string;
}

export interface DayPlan {
  day: string;
  notes: PlannerNote[];
}

export type WeekPlan = DayPlan[];

export interface SearchResult {
  day: string;
  note: PlannerNote;
}