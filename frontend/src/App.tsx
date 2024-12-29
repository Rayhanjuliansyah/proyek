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
import { UstadPage } from './pages/Ustad'; // Impor tanpa kurung kurawal (karena ekspor default)

function App() {
  const [selectedUstadId, setSelectedUstadId] = useState<string | null>(null);
  const [showBooking, setShowBooking] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentPage, setCurrentPage] = useState('home');

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
    // Close chat and booking windows when navigating to a new page
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
        return <UstadPage />; // Render UstadPage when currentPage is 'ustad'
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

        {/* Render Chat Window if showChat is true */}
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

      {/* Render Booking Form if showBooking is true */}
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
