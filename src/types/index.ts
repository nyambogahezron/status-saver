export interface ImageStatus {
  id: string;
  url: string;
  status: 'saved' | 'unsaved';
  type: 'image' | 'video' | 'audio';
}