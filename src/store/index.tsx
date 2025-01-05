import { create } from 'zustand';

interface ImageStatus {
  id: string;
  url: string;
  status: 'saved' | 'unsaved';
}

interface ImageStatusStore {
  imagesStatus: ImageStatus[];
  addImageStatus: (imageStatus: ImageStatus) => void;
  removeImageStatus: (id: string) => void;
  toggleImageStatus: (id: string) => void;
}

const useImageStatusStore = create<ImageStatusStore>((set) => ({
  imagesStatus: [],
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

export default useImageStatusStore;
