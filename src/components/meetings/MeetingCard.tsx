import React from 'react';
import { Users, MapPin, Clock } from 'lucide-react';
import { Meeting } from '../../types/meeting';
import { useTheme } from '../../context/ThemeContext';
import { formatTime } from '../../utils/meetingUtils';

interface MeetingCardProps {
  meeting: Meeting;
  onDelete: (id: string) => void;
}

export const MeetingCard: React.FC<MeetingCardProps> = ({ meeting, onDelete }) => {
  const { isDarkMode } = useTheme();

  return (
    <div className={`${
      isDarkMode ? 'bg-gray-800' : 'bg-white'
    } rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow`}>
      <div className="flex justify-between items-start">
        <h3 className={`text-lg font-semibold ${
          isDarkMode ? 'text-gray-100' : 'text-gray-900'
        }`}>
          {meeting.title}
        </h3>
        <button
          onClick={() => {
            console.log(`Deleting meeting with id: ${meeting.id}`);
            onDelete(meeting.id);
          }}
          className="text-gray-400 hover:text-gray-300"
        >
          ×
        </button>
      </div>
      
      <div className="mt-4 space-y-2">
        <div className="flex items-center space-x-2">
          <Clock className={`w-4 h-4 ${
            isDarkMode ? 'text-purple-400' : 'text-purple-600'
          }`} />
          <span className={`text-sm ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {formatTime(meeting.time)} - {meeting.date}
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          <MapPin className={`w-4 h-4 ${
            isDarkMode ? 'text-purple-400' : 'text-purple-600'
          }`} />
          <span className={`text-sm ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {meeting.place}
          </span>
        </div>
        
        <div className="flex items-start space-x-2">
          <Users className={`w-4 h-4 mt-1 ${
            isDarkMode ? 'text-purple-400' : 'text-purple-600'
          }`} />
          <div className="flex flex-wrap gap-1">
            {meeting.participants.map((participant, index) => (
              <span
                key={index}
                className={`text-xs px-2 py-1 rounded-full ${
                  isDarkMode 
                    ? 'bg-gray-700 text-gray-300' 
                    : 'bg-purple-50 text-purple-700'
                }`}
              >
                {participant}
              </span>
            ))}
          </div>
        </div>
        
        {meeting.description && (
          <p className={`text-sm mt-2 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {meeting.description}
          </p>
        )}
      </div>
    </div>
  );
};