
import { UserRole, TriviaQuestion, ScriptureOfTheDay, GalleryItem } from './types';

export const COLORS = {
  NAVY: '#0A1E3B',
  GOLD: '#C5A06D',
  IVORY: '#F5F2EC',
  WHITE: '#FFFFFF',
};

export const MOCK_USER = {
  id: 'u1',
  name: 'Kofi Mensah',
  role: UserRole.MEMBER,
  avatar: 'https://picsum.photos/seed/kofi/200/200',
};

export const MOCK_TRIVIA: TriviaQuestion[] = [
  {
    id: 't1',
    question: 'What is the primary role of an usher in TCBC?',
    options: [
      'Singing in the choir',
      'Maintaining order and hospitality',
      'Leading the sermon',
      'Managing the church finances'
    ],
    correctIndex: 1,
    category: 'Ushering Etiquette'
  },
  {
    id: 't2',
    question: 'In biblical protocol, which posture represents reverence?',
    options: [
      'Sitting with legs crossed',
      'Sleeping',
      'Standing or Kneeling',
      'Walking around'
    ],
    correctIndex: 2,
    category: 'Biblical Protocol'
  }
];

export const MOCK_SCRIPTURE: ScriptureOfTheDay = {
  id: 's1',
  verse: 'For I know the plans I have for you, declares the LORD, plans for welfare and not for evil, to give you a future and a hope.',
  reference: 'Jeremiah 29:11',
  version: 'NIV',
  backgroundImage: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?q=80&w=1000'
};

export const MOCK_GALLERY: GalleryItem[] = [
  {
    id: 'g1',
    url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800',
    title: 'Youth Sunday 2024',
    eventId: 'evt-101',
    uploadedBy: 'u1',
    date: '2024-03-15',
    visibility: UserRole.MEMBER,
    status: 'Approved'
  },
  {
    id: 'g2',
    url: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=800',
    title: 'Convention Protocol',
    eventId: 'evt-202',
    uploadedBy: 'admin',
    date: '2024-02-10',
    visibility: UserRole.PUBLIC,
    status: 'Approved'
  }
];

export const LOGO_URL = 'https://storage.googleapis.com/msgsndr/vN8M5PqG8N1S8n0x6V6e/media/65e9b7d5e9b7d5e9b7d5e9b7'; // Note: Replace with actual logo from user if accessible, or generic high-res logo
export const SPLASH_LOGO = 'https://raw.githubusercontent.com/lucide-react/lucide/main/icons/shield-check.svg';
