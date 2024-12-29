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
        console.log("API Response:", response.data); // Debug data API
        console.log("phone", response.data[0]); // Debug data API

        if (Array.isArray(response.data.data)) {
          setUstads(response.data.data);
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
            className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-semibold">{selectedUstad.name}</h3>
            <button
              onClick={closeModal}
              className="text-gray-500 hover:text-gray-700"
            >
              ✖
            </button>
            <p>Specialization: {selectedUstad.expertise}</p>
            <p>{selectedUstad.description}</p>
            <p>${selectedUstad.hourlyRate}/hour</p>
            <button
              onClick={() => {
                onBook(selectedUstad.id);
                closeModal();
              }}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Book
            </button>
            <button
              onClick={() => {
                onChat(selectedUstad.id);
                closeModal();
              }}
              className="bg-gray-300 text-black px-4 py-2 rounded-md"
            >
              Chat
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
