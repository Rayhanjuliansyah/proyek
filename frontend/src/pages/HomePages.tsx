import React, { useEffect, useState } from "react";
import { UstadCard } from "../components/UstadCard";
import { Ustad } from "../types";
import axiosInstance from "../api/axios";

interface HomePageProps {
  onBook: (ustadId: string) => void;
  onChat: (ustadId: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onBook, onChat }) => {
  const [ustads, setUstads] = useState<Ustad[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedUstad, setSelectedUstad] = useState<null | Ustad>(null);

  useEffect(() => {
    const fetchUstads = async () => {
      try {
        const response = await axiosInstance.get("/ustads");

        if (Array.isArray(response.data.data)) {
          const filteredUstads = response.data.data.filter(
            (ustad : Ustad) => ustad.availability === true            
          )
          setUstads(filteredUstads);
        } else {
          console.error("Data is not an array:", response.data);
          setError("Invalid data format received.");
        }
      } catch (err: any) {
        console.error("Error fetching ustads:", err);
        setError(err.message || "Something went wrong.");
      } finally {
        setLoading(false); // Pastikan loading selesai
      }
    };

    fetchUstads();
  }, []);

  const closeModal = () => setSelectedUstad(null);

  if (loading) return <div>Loading ustads...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-center">Available Ustads</h2>

      <div className="grid grid-cols-2 gap-6">
        {ustads.map((ustad) => (
          <UstadCard key={ustad.id} ustad={ustad} onSelect={setSelectedUstad} />
        ))}
      </div>

      {selectedUstad && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Tombol Close */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              ✖
            </button>

            {/* Gambar Ustad */}
              <img
                src={selectedUstad.user.userProfile?.[0]?.imageUrl || 'https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg'}
                alt={selectedUstad.name}
                className="w-32 h-32 mx-auto rounded-full mb-4 object-cover"
              />
            

            {/* Nama Ustad */}
            <h3 className="text-2xl font-semibold text-center mb-2">
              {selectedUstad.name}
            </h3>

            {/* Deskripsi */}
            <p className="text-gray-700 text-center mb-4">
              Specialization: <span className="font-medium">{selectedUstad.expertise.map((expertise) => expertise).join(', ')}</span>
            </p>
            <p className="text-gray-600 text-center mb-4">{selectedUstad.description}</p>

            {/* Tarif */}
            <p className="text-lg font-semibold text-center text-blue-600 mb-6">
              ${selectedUstad.hourlyRate}/hour
            </p>

            {/* Tombol Aksi */}
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => {
                  onBook(selectedUstad.id);
                  closeModal();
                }}
                className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
              >
                Book
              </button>
              <button
                onClick={() => {
                  onChat(selectedUstad.id);
                  closeModal();
                }}
                className="bg-gray-300 text-black px-6 py-2 rounded-md hover:bg-gray-400"
              >
                Chat
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
