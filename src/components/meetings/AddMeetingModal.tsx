import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface AddMeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddMeeting: (meeting: {
    title: string;
    time: string;
    date: string;
    place: string;
    participants: string[];
    description?: string;
  }) => void;
}

export const AddMeetingModal: React.FC<AddMeetingModalProps> = ({
  isOpen,
  onClose,
  onAddMeeting,
}) => {
  const { isDarkMode } = useTheme();
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  const [place, setPlace] = useState('');
  const [participants, setParticipants] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && time && date && place && participants) {
      onAddMeeting({
        title,
        time,
        date,
        place,
        participants: participants.split(',').map(p => p.trim()),
        description: description || undefined,
      });
      onClose();
      resetForm();
    }
  };

  const resetForm = () => {
    setTitle('');
    setTime('');
    setDate('');
    setPlace('');
    setParticipants('');
    setDescription('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className={`${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      } rounded-lg w-full max-w-md`}>
        <div className={`p-4 border-b ${
          isDarkMode ? 'border-gray-700' : 'border-gray-200'
        } flex justify-between items-center`}>
          <h2 className={`text-lg font-semibold ${
            isDarkMode ? 'text-gray-100' : 'text-gray-900'
          }`}>Add New Meeting</h2>
          <button
            onClick={onClose}
            className={isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label htmlFor="title" className={`block text-sm font-medium ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            } mb-1`}>
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`w-full rounded-md ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-gray-200' 
                  : 'border-gray-300 text-gray-900'
              } focus:ring-2 focus:ring-purple-500`}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="time" className={`block text-sm font-medium ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              } mb-1`}>
                Time
              </label>
              <input
                type="time"
                id="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className={`w-full rounded-md ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-gray-200' 
                    : 'border-gray-300 text-gray-900'
                } focus:ring-2 focus:ring-purple-500`}
                required
              />
            </div>
            
            <div>
              <label htmlFor="date" className={`block text-sm font-medium ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              } mb-1`}>
                Date
              </label>
              <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className={`w-full rounded-md ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-gray-200' 
                    : 'border-gray-300 text-gray-900'
                } focus:ring-2 focus:ring-purple-500`}
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="place" className={`block text-sm font-medium ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            } mb-1`}>
              Place
            </label>
            <input
              type="text"
              id="place"
              value={place}
              onChange={(e) => setPlace(e.target.value)}
              className={`w-full rounded-md ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-gray-200' 
                  : 'border-gray-300 text-gray-900'
              } focus:ring-2 focus:ring-purple-500`}
              required
            />
          </div>

          <div>
            <label htmlFor="participants" className={`block text-sm font-medium ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            } mb-1`}>
              Participants (comma-separated)
            </label>
            <input
              type="text"
              id="participants"
              value={participants}
              onChange={(e) => setParticipants(e.target.value)}
              className={`w-full rounded-md ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-gray-200' 
                  : 'border-gray-300 text-gray-900'
              } focus:ring-2 focus:ring-purple-500`}
              required
            />
          </div>

          <div>
            <label htmlFor="description" className={`block text-sm font-medium ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            } mb-1`}>
              Description (optional)
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`w-full rounded-md ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-gray-200' 
                  : 'border-gray-300 text-gray-900'
              } focus:ring-2 focus:ring-purple-500`}
              rows={3}
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className={`px-4 py-2 rounded-md ${
                isDarkMode 
                  ? 'bg-purple-600 hover:bg-purple-700' 
                  : 'bg-purple-600 hover:bg-purple-700'
              } text-white transition-colors`}
            >
              Add Meeting
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};