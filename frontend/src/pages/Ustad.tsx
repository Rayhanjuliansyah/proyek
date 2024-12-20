import React, { useState } from 'react';
import  { 
          User, 
          // Phone, 
          // BookOpen, 
          Edit3, 
          Trash2 
        } from 'lucide-react';

export const UstadPage: React.FC = () => {
  const [ustads, setUstads] = useState([
    { id: 1, name: 'Ustad A', specialization: 'Tafsir', phone: '08123456789' },
    { id: 2, name: 'Ustad B', specialization: 'Fiqh', phone: '08234567890' },
  ]);

  // Function to delete a Ustad
  const handleDelete = (id: number) => {
    setUstads((prev) => prev.filter((ustad) => ustad.id !== id));
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Daftar Ustad</h2>
      <div className="bg-white rounded-lg shadow">
        {ustads.map((ustad) => (
          <div key={ustad.id} className="p-6 border-b last:border-b-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <User className="w-5 h-5 text-gray-400" />
                <div>
                  <h3 className="font-medium">{ustad.name}</h3>
                  <p className="text-sm text-gray-500">
                    {ustad.specialization} - {ustad.phone}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button className="text-blue-600 hover:text-blue-700">
                  <Edit3 className="w-5 h-5" />
                </button>
                <button
                  className="text-red-600 hover:text-red-700"
                  onClick={() => handleDelete(ustad.id)}
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Add New Ustad Form */}
      <div className="bg-white rounded-lg shadow mt-6 p-6">
        <h3 className="font-medium mb-4">Tambah Ustad Baru</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const newUstad = {
              id: Date.now(),
              name: formData.get('name') as string,
              specialization: formData.get('specialization') as string,
              phone: formData.get('phone') as string,
            };
            setUstads((prev) => [...prev, newUstad]);
            e.currentTarget.reset();
          }}
        >
          <div className="flex space-x-4 mb-4">
            <input
              type="text"
              name="name"
              placeholder="Nama"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
            <input
              type="text"
              name="specialization"
              placeholder="Spesialisasi"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
            <input
              type="text"
              name="phone"
              placeholder="Telepon"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Tambah
          </button>
        </form>
      </div>
    </div>
  );
};
