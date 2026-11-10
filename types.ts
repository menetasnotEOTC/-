
export type Language = 'en' | 'am' | 'om' | 'ti' | 'so';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  sources?: { title: string; uri: string }[];
  isTranslated?: boolean;
  audioUrl?: string;
  audioLoading?: boolean;
}

export interface Scholar {
  name: Record<Language, string>;
  description: Record<Language, string>;
  era: string;
  image: string;
}

export interface SacredBook {
  title: Record<Language, string>;
  summary: Record<Language, string>;
  category: 'Canon' | 'Tradition' | 'Liturgical' | 'Church Fathers';
}

export interface UIContent {
  title: string;
  subtitle: string;
  chatPlaceholder: string;
  send: string;
  scholars: string;
  books: string;
  activeScholars: string;
  chat: string;
  learnMore: string;
  resetChat: string;
  switchLang: string;
  aiThinking: string;
  missionStatement: string;
  privacyPolicy: string;
  termsOfService: string;
  contactScholar: string;
  copyright: string;
  machineTranslated: string;
  calendar: string;
  majorObservances: string;
  spiritualGuidance: string;
  spiritualGuidanceDesc: string;
  feast: string;
  fast: string;
  listen: string;
  stop: string;
  voice: string;
  autoSpeak: string;
  speed: string;
  sourceLabel: string;
  generatingAudio: string;
}

