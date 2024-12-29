import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, DollarSign, User as UserIcon } from 'lucide-react';
import axiosInstance from '../api/axios';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface Ustad {
  id: number;
  name: string;
  expertise: string[];
  description: string;
  hourlyRate: number;
  availability: boolean;
}

interface Booking {
  id: number;
  userId: number;
  ustadId: number;
  bookingDate: string;
  eventDate: string;
  duration: string;
  location: string;
  price: number;
  status: 'pending' | 'completed' | 'accepted' | 'rejected';
  user: User;
  ustad: Ustad;
}

export const BookingListPage: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedBookingId, setSelectedBookingId] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/bookings');
      console.log('API Response:', response.data);

      if (response.data && Array.isArray(response.data.data)) {
        setBookings(response.data.data);
      } else {
        throw new Error('Unexpected response format from API');
      }
    } catch (err: any) {
      console.error('Error fetching bookings:', err);
      setError(err?.response?.data?.message || 'Failed to fetch bookings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleBookingClick = (id: number) => {
    setSelectedBookingId((prevId) => (prevId === id ? null : id));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-600">Error: {error}</div>;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">My Bookings</h2>
      <div className="space-y-4">
        {bookings.map((booking) => (
          <BookingCard
            key={booking.id}
            booking={booking}
            isSelected={selectedBookingId === booking.id}
            onClick={() => handleBookingClick(booking.id)}
          />
        ))}
      </div>
    </div>
  );
};

interface BookingCardProps {
  booking: Booking;
  isSelected: boolean;
  onClick: () => void;
}

const BookingCard: React.FC<BookingCardProps> = ({ booking, isSelected, onClick }) => {
  return (
    <div
      className="bg-white rounded-lg shadow p-6 cursor-pointer hover:bg-gray-50"
      onClick={onClick}
    >
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <UserIcon className="w-5 h-5 text-gray-400" />
            <h3 className="text-lg font-semibold">Ustad: {booking.ustad.name}</h3>
          </div>
          <div className="flex items-center space-x-2 text-gray-600">
            <Calendar className="w-4 h-4" />
            <span>{new Date(booking.eventDate).toLocaleDateString()}</span>
            <Clock className="w-4 h-4 ml-2" />
            <span>{new Date(booking.eventDate).toLocaleTimeString()}</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600">
            <MapPin className="w-4 h-4" />
            <span>{booking.location}</span>
          </div>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-sm ${
            booking.status === 'completed'
              ? 'bg-green-100 text-green-800'
              : booking.status === 'accepted'
              ? 'bg-blue-100 text-blue-800'
              : booking.status === 'rejected'
              ? 'bg-red-100 text-red-800'
              : 'bg-yellow-100 text-yellow-800'
          }`}
        >
          {booking.status}
        </span>
      </div>

      {isSelected && (
        <div className="mt-4 p-4 border-t-2 border-gray-200">
          <h4 className="text-md font-semibold">Booking Details:</h4>
          <p>
            <strong>Booking Date:</strong>{' '}
            {new Date(booking.bookingDate).toLocaleDateString()}
          </p>
          <p>
            <strong>Event Date:</strong>{' '}
            {new Date(booking.eventDate).toLocaleDateString()}
          </p>
          <p>
            <strong>Event Time:</strong>{' '}
            {new Date(booking.eventDate).toLocaleTimeString()}
          </p>
          <p>
            <strong>Duration:</strong> {booking.duration} hour(s)
          </p>
          <p>
            <strong>Location:</strong> {booking.location}
          </p>
          <div className="mt-2">
            <h5 className="font-semibold">Ustad Details:</h5>
            <p>
              <strong>Name:</strong> {booking.ustad.name}
            </p>
            <p>
              <strong>Expertise:</strong> {booking.ustad.expertise.join(', ')}
            </p>
            {/* <p>{booking.ustad.description}</p> */}
          </div>
          <div className="flex items-center space-x-2 text-gray-600 mt-2">
            <DollarSign className="w-5 h-5 text-gray-400" />
            <span>
              <strong>Price:</strong> ${booking.price}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
