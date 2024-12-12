import { WeekMeetings } from '../types/meeting';
import { DAYS_OF_WEEK } from './dateUtils';

export const generateInitialMeetings = (): WeekMeetings => {
  return DAYS_OF_WEEK.map((day) => ({
    day,
    meetings: [],
  }));
};

export const formatTime = (time: string): string => {
  return new Date(`1970-01-01T${time}`).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
};