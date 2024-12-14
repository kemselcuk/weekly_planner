import React from 'react';
import { CheckCircle2, Circle, Timer } from 'lucide-react';

interface StatusSelectorProps {
  status: 'pending' | 'in-progress' | 'completed';
  onChange: (status: 'pending' | 'in-progress' | 'completed') => void;
  isDarkMode: boolean;
}

export const StatusSelector: React.FC<StatusSelectorProps> = ({
  status,
  onChange,
  isDarkMode,
}) => {
  const statuses = [
    {
      value: 'pending',
      icon: <Circle className="w-4 h-4" />,
      color: 'text-gray-400',
      bgColor: isDarkMode ? 'bg-gray-800' : 'bg-gray-100',
      activeBgColor: isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
    },
    {
      value: 'in-progress',
      icon: <Timer className="w-4 h-4" />,
      color: 'text-yellow-500',
      bgColor: isDarkMode ? 'bg-yellow-500/10' : 'bg-yellow-50',
      activeBgColor: isDarkMode ? 'bg-yellow-500/20' : 'bg-yellow-100'
    },
    {
      value: 'completed',
      icon: <CheckCircle2 className="w-4 h-4" />,
      color: 'text-green-500',
      bgColor: isDarkMode ? 'bg-green-500/10' : 'bg-green-50',
      activeBgColor: isDarkMode ? 'bg-green-500/20' : 'bg-green-100'
    }
  ] as const;

  return (
    <div className="flex gap-2">
      {statuses.map((statusOption) => (
        <button
          key={statusOption.value}
          type="button"
          onClick={() => onChange(statusOption.value)}
          className={`
            flex items-center gap-2 px-3 py-2 rounded-lg transition-all
            ${statusOption.color}
            ${status === statusOption.value ? statusOption.activeBgColor : statusOption.bgColor}
            hover:opacity-80
          `}
        >
          {statusOption.icon}
          <span className="capitalize text-sm font-medium">{statusOption.value}</span>
        </button>
      ))}
    </div>
  );
};