import React from 'react';
import { Ustad } from '../types';

interface UstadCardProps {
  ustad: Ustad;
  onSelect: (ustad: Ustad) => void;
}

export const UstadCard: React.FC<UstadCardProps> = ({ ustad, onSelect }) => {
  return (
    <div
      className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
      onClick={() => onSelect(ustad)} 
    >
      <div className="flex items-start space-x-4">
        <img
          src={ustad.imageUrl}
          alt={ustad.name}
          className="w-24 h-24 rounded-full object-cover"
        />
        <div className="flex-1">
          <h3 className="text-xl font-semibold">{ustad.name}</h3>
          {/* <div className="flex items-center mt-1">
            <span className="text-yellow-400">⭐</span>
            <span className="ml-1">{ustad.rating}</span>
          </div> */}
          <div className="mt-2">
            {/* <p className="text-gray-600">Expertise:</p> */}
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
          <p className='mt-2'>{ustad.phone}</p>
          {/* <p className="mt-2 text-gray-800">${ustad.hourlyRate}/hour</p> */}
        </div>
      </div>
    </div>
  );
};
