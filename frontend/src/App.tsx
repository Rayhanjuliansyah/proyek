import React, { useState } from 'react';
import { MainLayout } from './components/layout/MainLayout';
import { LoginPage } from './pages/LoginPages';
import { HomePage } from './pages/HomePages';
import { ProfilePage } from './pages/Profilepages';
import { BookingListPage } from './pages/BookingListPages';
import { HistoryPage } from './pages/History';
import { SettingsPage } from './pages/Setting';
import { ChatWindow } from './components/ChatWindow';
import { BookingForm } from './components/BookingForm';
import { Message } from './types';
import { UstadPage } from './pages/Ustad';
import axiosInstance from './api/axios';

function App() {
  const [selectedUstadId, setSelectedUstadId] = useState<string | null>(null);
  const [showBooking, setShowBooking] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentPage, setCurrentPage] = useState('home');
  const [user, setUser] = useState<{
    name: string;
    email: string;
    role: 'user' | 'admin' | 'ustad' | null;
  } | null>(null);

  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await axiosInstance.post('/login', {
        email,
        password,
      });

      if (response.status === 200) {
        const { name, email, role } = response.data.data;
        setUser({ name, email, role });
        localStorage.setItem('token', response.data.data.token);
        setCurrentPage('home');
      }

      // console.log('Login response:', response);
      
      if (response.data.data.role === 'ustad') {
        setCurrentPage('bookings');
      }

      if (response.data.data.role === 'admin') {
        setCurrentPage('ustad');
      }

    } catch (error) {
      console.error('Login failed:', error);
      alert('Terjadi kesalahan saat login. Coba lagi.');
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('token');
    setCurrentPage('login'); // Redirect ke login setelah logout
  };

  const handleBook = (ustadId: string) => {
    setSelectedUstadId(ustadId);
    setShowBooking(true);
    setShowChat(false); // Close chat window when opening booking form
  };

  const handleChat = (ustadId: string) => {
    setSelectedUstadId(ustadId);
    setShowChat(true);
    setShowBooking(false); // Close booking window when opening chat
  };

  const handleSendMessage = (content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: 'user',
      receiverId: selectedUstadId!,
      content,
      timestamp: new Date().toISOString(),
    };
    setMessages([...messages, newMessage]);
  };

  const handleBookingSubmit = (booking: { date: string; sessionType: 'online' | 'in-person' }) => {
    console.log('Booking submitted:', { ustadId: selectedUstadId, ...booking });
    setShowBooking(false); // Close the booking form after submission
    setCurrentPage('bookings'); // Optionally navigate to booking list after submitting
  };

  const handleNavigate = (path: string) => {
    setCurrentPage(path);
    setShowChat(false);
    setShowBooking(false);
  };

  if (!user) {
    return <LoginPage onLogin={handleLogin} />;
  }

  const renderPage = () => {
    // if (user.role === 'admin' && currentPage === 'ustad') {
    //   return <UstadPage />;
    // }

    switch (currentPage) {
      case 'home':
        return <HomePage onBook={handleBook} onChat={handleChat} />;
      case 'profile':
        return <ProfilePage />;
      case 'bookings':
        return <BookingListPage />;
      case 'history':
        return <HistoryPage />;
      case 'settings':
        return <SettingsPage />;
      case 'ustad':
        return <UstadPage />;
      case 'logout':
        handleLogout();
        return <LoginPage onLogin={handleLogin} />;
      default:
        return <HomePage onBook={handleBook} onChat={handleChat} />;
    }
  };

  return (
    <MainLayout currentPage={currentPage} onNavigate={handleNavigate} userRole={user?.role}>
      <div className="flex gap-8">
        <div className="flex-1">{renderPage()}</div>

        {showChat && selectedUstadId && (
          <div className="w-96">
            <ChatWindow
              messages={messages}
              onSendMessage={handleSendMessage}
              ustadName="Selected Ustad"
            />
          </div>
        )}
      </div>

      {showBooking && selectedUstadId && (
        <BookingForm
          ustadId={selectedUstadId}
          onSubmit={handleBookingSubmit}
          onClose={() => setShowBooking(false)}
        />
      )}
    </MainLayout>
  );
}

export default App;