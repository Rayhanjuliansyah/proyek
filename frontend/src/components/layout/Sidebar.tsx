import React, { useState } from 'react';
import { Home, User, Settings, Calendar, History, Music, Users } from 'lucide-react'; // Tambahkan ikon "Users" atau ikon lain yang relevan

interface NavItem {
  label: string;
  icon: React.ReactNode;
  path: string;
}

interface SidebarProps {
  currentPage: string;
  onNavigate: (path: string) => void;
}

const navItems: NavItem[] = [
  { label: 'Home', icon: <Home className="w-5 h-5" />, path: 'home' },
  { label: 'Profile', icon: <User className="w-5 h-5" />, path: 'profile' },
  { label: 'Booking List', icon: <Calendar className="w-5 h-5" />, path: 'bookings' },
  { label: 'History', icon: <History className="w-5 h-5" />, path: 'history' },
  { label: 'Settings', icon: <Settings className="w-5 h-5" />, path: 'settings' },
  { label: 'Ustad', icon: <Users className="w-5 h-5" />, path: 'ustad' }, // Tambahkan menu Ustad di sini
];

export const Sidebar: React.FC<SidebarProps> = ({ currentPage, onNavigate }) => {
  return (
    <div className="w-64 bg-white h-screen fixed left-0 top-0 shadow-sm">
      <div className="p-4 border-b">
        <div className="flex items-center space-x-2">
          <Music className="w-8 h-8 text-blue-600" />
          <h1 className="text-xl font-bold">Ustad Booking</h1>
        </div>
      </div>
      <nav className="p-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <button
                onClick={() => onNavigate(item.path)}
                className={`w-full flex items-center space-x-3 px-4 py-2 rounded-md transition-colors ${
                  currentPage === item.path
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};
