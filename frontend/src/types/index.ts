export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  isActive: boolean;
  role: string;
  userProfile: UserProfile[]; // Array of UserProfile
}



export interface UserProfile {
  id: number;
  userId: number;
  firstName: string;
  lastName: string;
  phone: string;
  imageUrl: string;
  isActive: boolean;
}

export interface Ustad {
  id: string;
  name: string;
  expertise: string[]; // Array of expertise strings
  description: string;
  hourlyRate: number;
  availability: boolean;
  userId: number;
  user: User; // Associated user data
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
