import React, { useState } from 'react';
import { MainLayout } from './components/layout/MainLayout';
import { HomePage } from './pages/HomePages';
import { ProfilePage } from './pages/Profilepages';
import { BookingListPage } from './pages/BookingListPages';
import { HistoryPage } from './pages/History';
import { SettingsPage } from './pages/Setting';
import { ChatWindow } from './components/ChatWindow';
import { BookingForm } from './components/BookingForm';
import { Message } from './types';
import { UstadPage } from './pages/Ustad';

function App() {
  const [selectedUstadId, setSelectedUstadId] = useState<string | null>(null);
  const [showBooking, setShowBooking] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentPage, setCurrentPage] = useState('home');

  const handleBook = (ustadId: string) => {
    setSelectedUstadId(ustadId);
    setShowBooking(true);
  };

  const handleChat = (ustadId: string) => {
    setSelectedUstadId(ustadId);
    setShowChat(true);
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
    setShowBooking(false);
  };

  const handleNavigate = (path: string) => {
    setCurrentPage(path);
    // Close chat and booking windows when navigating
    setShowChat(false);
    setShowBooking(false);
  };

  const renderPage = () => {
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
      default:
        return <HomePage onBook={handleBook} onChat={handleChat} />;
    }
  };

  return (
    <MainLayout currentPage={currentPage} onNavigate={handleNavigate}>
      <div className="flex gap-8">
        <div className="flex-1">
          {renderPage()}
        </div>
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

      {showBooking && (
        <BookingForm
          ustadId={selectedUstadId!}
          onSubmit={handleBookingSubmit}
          onClose={() => setShowBooking(false)}
        />
      )}
    </MainLayout>
  );
}

export default App;