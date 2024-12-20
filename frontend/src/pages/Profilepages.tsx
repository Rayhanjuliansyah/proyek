import React from 'react';
import { User, Mail, Phone } from 'lucide-react';

export const ProfilePage: React.FC = () => {
  return (
    <div className="max-w-2xl">
      <h2 className="text-2xl font-semibold mb-6">My Profile</h2>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
            <User className="w-10 h-10 text-gray-500" />
          </div>
          <div>
            <h3 className="text-xl font-semibold">John Doe</h3>
            <p className="text-gray-600">Student</p>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <Mail className="w-5 h-5 text-gray-400" />
            <span>john.doe@example.com</span>
          </div>
          <div className="flex items-center space-x-3">
            <Phone className="w-5 h-5 text-gray-400" />
            <span>+1 234 567 890</span>
          </div>
        </div>
      </div>
    </div>
  );
};