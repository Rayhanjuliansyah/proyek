import React from 'react';
import { Ustad } from '../types';

interface UstadCardProps {
  ustad: Ustad; // Tipe data Ustad, sesuai dengan model backend
  onSelect: (ustad: Ustad) => void; // Fungsi callback untuk memilih ustad
}

export const UstadCard: React.FC<UstadCardProps> = ({ ustad, onSelect }) => {
  return (
    <div
      className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
      onClick={() => onSelect(ustad)} // Trigger saat kartu diklik
    >
      <div className="flex items-start space-x-4">
        {/* Tambahkan fallback jika `imageUrl` kosong */}
        <img
          src={ustad.user.userProfile?.[0]?.imageUrl || 'https://via.placeholder.com/96'} // Placeholder image jika `imageUrl` tidak tersedia
          alt={ustad.name}
          className="w-24 h-24 rounded-full object-cover"
        />
        <div className="flex-1">
          <h3 className="text-xl font-semibold">{ustad.name}</h3>
          <div className="mt-2">
            <p className="text-gray-600 font-medium">Expertise:</p>
            <div className="flex flex-wrap gap-2 mt-1">
              {ustad.expertise.map((skill) => (
                <span
                  key={skill}
                  className="px-2 py-1 text-sm bg-gray-100 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <p className="mt-2 text-gray-700">Phone: {ustad.user.userProfile?.[0]?.phone || 'N/A'}</p>
          <p className="mt-2 text-gray-800 font-semibold">
            ${ustad.hourlyRate}/hour
          </p>
          <p className="mt-2">
            Availability:{' '}
            <span
              className={
                ustad.availability
                  ? 'text-green-600 font-medium'
                  : 'text-red-600 font-medium'
              }
            >
              {ustad.availability ? 'Available' : 'Unavailable'}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};
