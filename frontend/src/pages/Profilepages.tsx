import React, { useEffect, useState } from 'react';
import { Mail, Phone, Edit } from 'lucide-react';
import { jwtDecode } from 'jwt-decode';
import axiosInstance from '../api/axios';
import { UserProfile } from '../types';

interface UserData {
  id: number;
  name: string;
  email: string;
  role: string;
  userProfile: UserProfile[];
}

export const ProfilePage: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const { id }: { id: number } = jwtDecode(token);
      fetchUserData(id);
    }
  }, []);

  const fetchUserData = async (id: number) => {
    try {
      const response = await axiosInstance.get(`/users/${id}`);
      setUserData(response.data.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!userData) return;
    const { name, value } = e.target;
    setUserData((prev) =>
      prev ? { ...prev, [name]: value } : prev
    );
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    setIsEditing(false);
    console.log('User data saved:', userData);
  };

  if (!userData) {
    return <p>Loading user data...</p>;
  }

  const profile = userData.userProfile[0];

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">My Profile</h2>
      <div className="bg-white rounded-lg shadow-lg p-8">
        {/* Profile Header */}
        <div className="flex items-center space-x-6 mb-8">
          <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
            <img
              src={profile.imageUrl}
              alt="User Avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="text-2xl font-semibold">
              {profile.firstName + ' ' + profile.lastName}
            </h3>
            <p className="text-gray-600">{userData.role}</p>
          </div>
          <button
            onClick={handleEditToggle}
            className="text-blue-500 hover:underline ml-4 flex items-center space-x-2"
          >
            <Edit className="w-5 h-5 inline" />
            <span>{isEditing ? 'Cancel' : 'Edit'}</span>
          </button>
        </div>

        {/* Profile Details */}
        <div className="space-y-6">
          <div className="flex items-center space-x-3">
            <Mail className="w-5 h-5 text-gray-400" />
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                className="text-gray-700 bg-gray-100 border rounded-lg px-4 py-2 w-full"
              />
            ) : (
              <span className="text-lg">{userData.email}</span>
            )}
          </div>

          <div className="flex items-center space-x-3">
            <Phone className="w-5 h-5 text-gray-400" />
            {isEditing ? (
              <input
                type="text"
                name="phone"
                value={profile.phone}
                onChange={handleChange}
                className="text-gray-700 bg-gray-100 border rounded-lg px-4 py-2 w-full"
              />
            ) : (
              <span className="text-lg">{profile.phone}</span>
            )}
          </div>
        </div>

        {/* Save Button */}
        {isEditing && (
          <div className="mt-8 text-right">
            <button
              onClick={handleSave}
              className="bg-blue-500 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-600"
            >
              Save Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
