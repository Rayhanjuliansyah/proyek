export interface Ustad {
  id: string;
  name: string;
  phone: string;
  specialization: string;
  description: string;
  expertise: string[];
  rating: number;
  imageUrl: string;
  hourlyRate: number;
  availability?: boolean; // Opsional
}


export interface Booking {
  id: string;
  ustadId: string;
  userId: string;
  date: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  sessionType: 'online' | 'in-person';
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
}