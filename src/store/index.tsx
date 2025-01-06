import { ImageStatus } from '@/types';
import { generateImageStatusData } from '@/utils/generate-dummy-data';
import { create } from 'zustand';

interface ImageStatusStore {
  imagesStatus: ImageStatus[];
  addImageStatus: (imageStatus: ImageStatus) => void;
  removeImageStatus: (id: string) => void;
  toggleImageStatus: (id: string) => void;
}

export const useImageStatusStore = create<ImageStatusStore>((set) => ({
  imagesStatus: generateImageStatusData(50),
  addImageStatus: (imageStatus) =>
    set((state) => ({
      imagesStatus: [...state.imagesStatus, imageStatus],
    })),
  removeImageStatus: (id) =>
    set((state) => ({
      imagesStatus: state.imagesStatus.filter((image) => image.id !== id),
    })),
  toggleImageStatus: (id) =>
    set((state) => ({
      imagesStatus: state.imagesStatus.map((image) =>
        image.id === id
          ? { ...image, status: image.status === 'saved' ? 'unsaved' : 'saved' }
          : image
      ),
    })),
}));
