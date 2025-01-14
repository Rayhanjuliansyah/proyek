import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, DollarSign, User as UserIcon } from 'lucide-react';
import axiosInstance from '../api/axios';
import { Booking } from '../types';
import { jwtDecode } from 'jwt-decode';


export const BookingListPage: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedBookingId, setSelectedBookingId] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
   const token = localStorage.getItem('token'); // or wherever your token is stored
    if (!token) throw new Error('No token found');
    const decodedToken = jwtDecode<{ 
      id: number,
      role: string
    }>(token);
    const userIdLogin = decodedToken.id;
    const userRole = decodedToken.role

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/bookings');
      if (response.data && Array.isArray(response.data.data)) {
        let filteredBookings;

        if (userRole === 'admin') {
          // No filtering for admin, return all bookings
          filteredBookings = response.data.data;
        } else if (userRole === 'user') {
          // Filter for user based on userId
          filteredBookings = response.data.data.filter(
            (booking: Booking) => booking.userId === userIdLogin
          );
        } else if (userRole === 'ustad') {
          // Filter for ustad based on status and userId
          filteredBookings = response.data.data.filter(
            (booking: Booking) =>
              (booking.status === 'completed' || booking.status === 'rejected') &&
              booking.ustadId === userIdLogin
          );
        }

          setBookings(filteredBookings);
        
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
      {bookings.length === 0 ? ( // Jika data kosong
        <div className="text-gray-600 text-center">
          <p>No bookings found.</p>
        </div>
      ) : (
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
      )}
    </div>
  );
};

interface BookingCardProps {
  booking: Booking;
  isSelected: boolean;
  onClick: () => void;
}

const BookingCard: React.FC<BookingCardProps> = ({ booking, isSelected, onClick }) => {
  const [statusToUpdate, setStatusToUpdate] = useState<string>('');

  const handleUpdateStatus = async () => {
    if (!statusToUpdate) {
      alert('Please select a status to update.');
      return;
    }

    try {
      const response = await axiosInstance.put(`/bookings/${booking.id}`, { status: statusToUpdate });
      console.log('Update Response:', response.data);
      alert('Status updated successfully!');
    } catch (error: any) {
      console.error('Error updating status:', error);
      alert('Failed to update status');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
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

      {/* Tombol untuk Detail dan Dropdown Update Status */}
      <div className="mt-4 flex items-center space-x-4">
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          onClick={onClick}
        >
          Show Details
        </button>
        <div className="relative">
          <select
            className="bg-white border border-gray-300 rounded px-4 py-2 text-gray-700"
            value={statusToUpdate}
            onChange={(e) => setStatusToUpdate(e.target.value)}
          >
            <option value="" disabled>
              Update Status
            </option>
            <option value="accepted">Accept</option>
            <option value="rejected">Reject</option>
            <option value="completed">Complete</option>
          </select>
        </div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={handleUpdateStatus}
        >
          Confirm
        </button>
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



