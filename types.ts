
export enum UserRole {
  PUBLIC = 'Public',
  MEMBER = 'Member',
  ADMIN = 'Admin'
}

export interface User {
  id: string;
  name: string;
  role: UserRole;
  avatar?: string;
}

export interface GalleryItem {
  id: string;
  url: string;
  title: string;
  eventId: string;
  uploadedBy: string;
  date: string;
  visibility: UserRole;
  status: 'Pending' | 'Approved' | 'Rejected';
}

export interface TriviaQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  category: string;
}

export interface ScriptureOfTheDay {
  id: string;
  verse: string;
  reference: string;
  version: 'NIV' | 'KJV';
  backgroundImage: string;
}

export interface AppState {
  user: User | null;
  score: number;
  lastTriviaPlayed: string | null; // ISO Date
}
