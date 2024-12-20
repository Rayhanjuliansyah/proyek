import React, { useState } from 'react';
import { Calendar } from 'lucide-react';

interface BookingFormProps {
  ustadId: string;
  onSubmit: (booking: {
    date: string;
    sessionType: 'online' | 'in-person';
  }) => void;
  onClose: () => void;
}

export const BookingForm: React.FC<BookingFormProps> = ({
  onSubmit,
  onClose,
}) => {
  const [date, setDate] = useState('');
  const [sessionType, setSessionType] = useState<'online' | 'in-person'>('online');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ date, sessionType });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Book a Session</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Select Date and Time
            </label>
            <div className="mt-1 relative">
              <input
                type="datetime-local"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="block w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              />
              <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Session Type
            </label>
            <select
              value={sessionType}
              onChange={(e) => setSessionType(e.target.value as 'online' | 'in-person')}
              className="mt-1 block w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="online">Online</option>
              <option value="in-person">In-Person</option>
            </select>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Confirm Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};