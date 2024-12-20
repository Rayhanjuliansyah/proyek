import React, { useState } from 'react';
import { UstadCard } from '../components/UstadCard';  // Import UstadCard
import { Ustad } from '../types';
import { ustads } from '../data/mockData'; 

interface HomePageProps {
  onBook: (ustadId: string) => void;
  onChat: (ustadId: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onBook, onChat }) => {
  const [selectedUstad, setSelectedUstad] = useState<null | Ustad>(null);

  return (
    <div className="space-y-6">
      <h2 className=" text-2xl font-semibold text-center">Available Ustads</h2>

      <div className='grid grid-cols-2 gap-6'>
          {/* Gunakan UstadCard untuk menampilkan setiap ustad */}
          {ustads.map((ustad) => (
            <UstadCard
              key={ustad.id}
              ustad={ustad}
              onSelect={setSelectedUstad} // Kirim fungsi untuk membuka modal
            />
          ))}
      </div>


      {/* Modal */}
      {selectedUstad && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          aria-labelledby="ustad-modal-title"
          role="dialog"
          onClick={() => setSelectedUstad(null)} // Klik di luar modal untuk menutup
        >
          <div
            className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full"
            onClick={(e) => e.stopPropagation()} // Agar klik di dalam modal tidak menutup modal
          >
            <div className="flex justify-between items-center">
              <h3 id="ustad-modal-title" className="text-xl font-semibold">
                {selectedUstad.name}
              </h3>
              <button
                onClick={() => setSelectedUstad(null)}
                className="text-gray-500 hover:text-gray-700"
                aria-label="Close modal"
              >
                ✖
              </button>
            </div>
            <p className="mt-4 text-gray-600">{selectedUstad.specialization}</p>
            <p className="mt-2">{selectedUstad.description}</p>
            <div className="mt-2">
              <p className="text-gray-600">Expertise:</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {selectedUstad.expertise.map((skill) => (
                  <span key={skill} className="px-2 py-1 text-sm bg-gray-100 rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <p className="mt-2 text-gray-800">${selectedUstad.hourlyRate}/hour</p>
            <div className="mt-6 flex space-x-4">
              <button
                onClick={() => {
                  onBook(selectedUstad.id);
                  setSelectedUstad(null);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Book
              </button>
              <button
                onClick={() => {
                  onChat(selectedUstad.id);
                  setSelectedUstad(null);
                }}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
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
