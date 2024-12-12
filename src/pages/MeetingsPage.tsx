import React, { useState } from 'react';
import { Meeting } from '../types/meeting';
import { MeetingCard } from '../components/meetings/MeetingCard';
import { AddMeetingModal } from '../components/meetings/AddMeetingModal';
import { useTheme } from '../context/ThemeContext';

export const MeetingsPage: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [isAddMeetingOpen, setIsAddMeetingOpen] = useState(false);

  const handleAddMeeting = (meetingData: {
    title: string;
    time: string;
    date: string;
    place: string;
    participants: string[];
    description?: string;
  }) => {
    setMeetings(current => [
      ...current,
      {
        id: crypto.randomUUID(),
        ...meetingData,
      },
    ]);
  };

  const handleDeleteMeeting = (meetingId: string) => {
    setMeetings(current => current.filter(meeting => meeting.id !== meetingId));
  };

  // Sort meetings by date and time
  const sortedMeetings = [...meetings].sort((a, b) => {
    const dateA = new Date(`${a.date} ${a.time}`);
    const dateB = new Date(`${b.date} ${b.time}`);
    return dateA.getTime() - dateB.getTime();
  });

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24">
      <div className="flex justify-between items-center mb-8">
        <h1 className={`text-2xl font-bold ${
          isDarkMode ? 'text-gray-100' : 'text-gray-900'
        }`}>
          Scheduled Meetings
        </h1>
        <button
          onClick={() => setIsAddMeetingOpen(true)}
          className={`px-4 py-2 rounded-md ${
            isDarkMode 
              ? 'bg-purple-600 hover:bg-purple-700' 
              : 'bg-purple-600 hover:bg-purple-700'
          } text-white transition-colors`}
        >
          New Meeting
        </button>
      </div>

      {sortedMeetings.length > 0 ? (
        <div className="space-y-4">
          {sortedMeetings.map((meeting) => (
            <MeetingCard
              key={meeting.id}
              meeting={meeting}
              onDelete={handleDeleteMeeting}
            />
          ))}
        </div>
      ) : (
        <div className={`text-center py-12 ${
          isDarkMode ? 'text-gray-400' : 'text-gray-500'
        }`}>
          <p className="text-lg">No meetings scheduled yet</p>
          <p className="mt-2">Click the "New Meeting" button to add your first meeting</p>
        </div>
      )}

      <AddMeetingModal
        isOpen={isAddMeetingOpen}
        onClose={() => setIsAddMeetingOpen(false)}
        onAddMeeting={handleAddMeeting}
      />
    </div>
  );
};

export default MeetingsPage;