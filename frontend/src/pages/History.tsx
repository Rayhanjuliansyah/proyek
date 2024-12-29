import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Star } from 'lucide-react';
import axios from '../api/axios'; // Impor axios untuk melakukan permintaan ke backend

interface Session {
  id: string;
  ustadName: string;
  date: string;
  sessionType: 'online' | 'in-person';
  rating: number;
  price: number; // Tambahkan harga pada sesi
}

export const HistoryPage: React.FC = () => {
  const [history, setHistory] = useState<Session[]>([]); // State untuk menyimpan data dari API
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null); // State untuk menyimpan ID sesi yang dipilih
  const [loading, setLoading] = useState<boolean>(true); // State untuk menampilkan loading
  const [error, setError] = useState<string | null>(null); // State untuk menangani error

  // Fungsi untuk mengambil data dari API
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        const response = await axios.get<Session[]>('/history'); // Ganti '/history' dengan endpoint API backend Anda
        setHistory(response.data);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to fetch session history');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  // Fungsi untuk menangani klik pada sesi
  const handleSessionClick = (id: string) => {
    setSelectedSessionId((prevId) => (prevId === id ? null : id)); // Toggle detail sesi
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Session History</h2>
      <div className="space-y-4">
        {history.map((session) => (
          <div
            key={session.id}
            className="bg-white rounded-lg shadow p-6 cursor-pointer hover:bg-gray-50"
            onClick={() => handleSessionClick(session.id)} // Menangani klik
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

              {/* Menampilkan detail sesi jika sesi ini dipilih */}
              {selectedSessionId === session.id && (
                <div className="mt-4 p-4 border-t-2 border-gray-200">
                  <h4 className="text-md font-semibold">Session Details:</h4>
                  <p><strong>Session Type:</strong> {session.sessionType}</p>
                  <p><strong>Date:</strong> {new Date(session.date).toLocaleDateString()}</p>
                  <p><strong>Time:</strong> {new Date(session.date).toLocaleTimeString()}</p>
                  <p><strong>Price:</strong> ${session.price}</p> {/* Menambahkan harga */}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
