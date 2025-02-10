import { LoadStatusFiles } from '@/utils/media-access';
import { create } from 'zustand';

export interface FileStatus {
	uri: string;
	name: string;
}

interface StatusData {
	photoFiles: FileStatus[];
	videoFiles: FileStatus[];
	audioFiles: FileStatus[];
}

interface StatusDataStore {
	statusData: StatusData;
}

export const useStatusDataStore = create<StatusDataStore>((set) => {
	LoadStatusFiles().then((statusData) => {
		if (Array.isArray(statusData)) {
			set({
				statusData: {
					photoFiles: [],
					videoFiles: [],
					audioFiles: [],
				},
			});
		} else {
			set({ statusData });
		}
	});
	return {
		statusData: { photoFiles: [], videoFiles: [], audioFiles: [] },
	};
});
