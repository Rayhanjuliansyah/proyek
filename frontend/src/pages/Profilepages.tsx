import React, { useState } from 'react';
import { User, Mail, Phone, Edit, Calendar } from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: 'John Doe',
    role: 'Student',
    email: 'john.doe@example.com',
    phone: '+1 234 567 890',
    birthDate: '1990-01-01',
    address: '123 Main St, City, Country',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    setIsEditing(false);
    // Save logic here (e.g., API call)
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6">My Profile</h2>
      <div className="bg-white rounded-lg shadow p-6">
        {/* Profile Header */}
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center">
            <User className="w-20 h-20 text-gray-500" />
          </div>
          <div>
            <h3 className="text-xl font-semibold">{formData.name}</h3>
            <p className="text-gray-600">{formData.role}</p>
          </div>
          <button
            onClick={handleEditToggle}
            className="text-blue-500 hover:underline ml-4"
          >
            <Edit className="w-5 h-5 inline" /> {isEditing ? 'Cancel' : 'Edit'}
          </button>
        </div>

        {/* Profile Details */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <Mail className="w-5 h-5 text-gray-400" />
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="text-gray-700 bg-gray-100 border rounded-lg px-3 py-2"
              />
            ) : (
              <span>{formData.email}</span>
            )}
          </div>

          <div className="flex items-center space-x-3">
            <Phone className="w-5 h-5 text-gray-400" />
            {isEditing ? (
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="text-gray-700 bg-gray-100 border rounded-lg px-3 py-2"
              />
            ) : (
              <span>{formData.phone}</span>
            )}
          </div>

          <div className="flex items-center space-x-3">
            <Calendar className="w-5 h-5 text-gray-400" />
            {isEditing ? (
              <input
                type="date"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleChange}
                className="text-gray-700 bg-gray-100 border rounded-lg px-3 py-2"
              />
            ) : (
              <span>{new Date(formData.birthDate).toLocaleDateString()}</span>
            )}
          </div>

          <div className="flex items-center space-x-3">
            <span className="font-semibold">Address:</span>
            {isEditing ? (
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="text-gray-700 bg-gray-100 border rounded-lg px-3 py-2"
              />
            ) : (
              <span>{formData.address}</span>
            )}
          </div>
        </div>

        {/* Save Button */}
        {isEditing && (
          <div className="mt-6 text-right">
            <button
              onClick={handleSave}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg"
            >
              Save Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
