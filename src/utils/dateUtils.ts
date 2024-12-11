export const DAYS_OF_WEEK = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

export const generateInitialWeekPlan = (): WeekPlan => {
  return DAYS_OF_WEEK.map((day) => ({
    day,
    notes: [],
  }));
};