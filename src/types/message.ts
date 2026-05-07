export interface Message {
  id: string;
  content: string;
  direction: 'incoming' | 'outgoing';
  timestamp: number; // Unix ms
}
