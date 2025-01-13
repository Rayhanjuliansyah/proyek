export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  isActive: boolean;
  role: string;
  userProfile: UserProfile[]; // Array of UserProfile
}

// interface User {
//   id: number;
//   name: string;
//   email: string;
//   role: string;
// }

// interface Ustad {
//   id: number;
//   name: string;
//   expertise: string[];
//   description: string;
//   hourlyRate: number;
//   availability: boolean;
// }

export interface Booking {
  id: number;
  userId: number;
  ustadId: number;
  bookingDate: string;
  eventDate: string;
  duration: string;
  location: string;
  price: number;
  status: 'pending' | 'completed' | 'accepted' | 'rejected';
  user: User;
  ustad: Ustad;
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




// export interface Booking {
//   id: string;
//   ustadId: string;
//   userId: string;
//   date: string;
//   status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
//   sessionType: 'online' | 'in-person';
// }

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
}
