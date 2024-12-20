import React from 'react';
import { Calendar, Clock, Video, User } from 'lucide-react';

const mockBookings = [
  {
    id: '1',
    ustadName: 'Ustad Ahmad Khan',
    date: '2024-03-20T14:00:00',
    sessionType: 'online',
    status: 'confirmed',
  },
  {
    id: '2',
    ustadName: 'Ustad Mohammed Ali',
    date: '2024-03-22T16:00:00',
    sessionType: 'in-person',
    status: 'pending',
  },
];

export const BookingListPage: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">My Bookings</h2>
      <div className="space-y-4">
        {mockBookings.map((booking) => (
          <div
            key={booking.id}
            className="bg-white rounded-lg shadow p-6"
          >
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <User className="w-5 h-5 text-gray-400" />
                  <h3 className="text-lg font-semibold">{booking.ustadName}</h3>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(booking.date).toLocaleDateString()}</span>
                  <Clock className="w-4 h-4 ml-2" />
                  <span>{new Date(booking.date).toLocaleTimeString()}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Video className="w-4 h-4" />
                  <span className="capitalize">{booking.sessionType}</span>
                </div>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  booking.status === 'confirmed'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}
              >
                {booking.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};