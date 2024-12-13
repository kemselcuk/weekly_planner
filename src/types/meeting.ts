export interface Meeting {
  id: string;
  title: string;
  time: string;
  date: string;
  place: string;
  participants: string[];
  description?: string;
}
