import React from 'react';
import { Calendar, Clock, Star } from 'lucide-react';

const mockHistory = [
  {
    id: '1',
    ustadName: 'Ustad A',
    date: '2024-02-15T14:00:00',
    sessionType: 'online',
    rating: 5,
  },
  {
    id: '2',
    ustadName: 'Ustad B',
    date: '2024-02-10T16:00:00',
    sessionType: 'in-person',
    rating: 4,
  },
];

export const HistoryPage: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Session History</h2>
      <div className="space-y-4">
        {mockHistory.map((session) => (
          <div
            key={session.id}
            className="bg-white rounded-lg shadow p-6"
          >
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">{session.ustadName}</h3>
              <div className="flex items-center space-x-2 text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>{new Date(session.date).toLocaleDateString()}</span>
                <Clock className="w-4 h-4 ml-2" />
                <span>{new Date(session.date).toLocaleTimeString()}</span>
              </div>
              <div className="flex items-center space-x-1">
                {Array.from({ length: session.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-current"
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};