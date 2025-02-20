import { LoadStatusFiles } from '@/utils/media-access';
import { LoadSavedFiles } from '@/utils/save-files';
import React, { createContext, useState, useEffect, useContext } from 'react';

interface ImageStatus {
	url: string;
	name: string;
}

interface StatusData {
	photoFiles: { uri: string; name: string }[];
	videoFiles: { uri: string; name: string }[];
}

interface GlobalContextProps {
	imageStatus: ImageStatus[];
	setImageStatus: (status: ImageStatus[]) => void;
	videoStatus: ImageStatus[];
	setVideoStatus: (status: ImageStatus[]) => void;
	savedImageStatus: ImageStatus[];
	setSavedImageStatus: (status: ImageStatus[]) => void;
	savedVideoStatus: ImageStatus[];
	setSavedVideoStatus: (status: ImageStatus[]) => void;
	isLoading: boolean;
	setIsLoading: (status: boolean) => void;
	isError: boolean;
	setIsError: (status: boolean) => void;
	isPermissionGranted: boolean;
	setIsPermissionGranted: (status: boolean) => void;
	fetchStatus?: () => void;
	fetchSavedStatus?: () => void;
}

const GlobalContext = createContext<GlobalContextProps>(
	{} as GlobalContextProps
);

export default function GlobalProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [imageStatus, setImageStatus] = useState<ImageStatus[]>([]);
	const [videoStatus, setVideoStatus] = useState<ImageStatus[]>([]);
	const [savedImageStatus, setSavedImageStatus] = useState<ImageStatus[]>([]);
	const [savedVideoStatus, setSavedVideoStatus] = useState<ImageStatus[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState(false);
	const [isPermissionGranted, setIsPermissionGranted] = useState(false);

	const fetchSavedStatus = async () => {
		try {
			const savedStatusData = await LoadSavedFiles();
			if (savedStatusData) {
				setSavedImageStatus(savedStatusData?.photoFiles);
				setSavedVideoStatus(savedStatusData?.videoFiles);
			}
		} catch (error) {
			console.error('Error loading saved status:', error);
			setIsError(true);
		}
	};

	async function fetchStatus() {
		try {
			setIsLoading(true);
			const statusData = await LoadStatusFiles();
			if (statusData) {
				setImageStatus(statusData?.photoFiles);
				setVideoStatus(statusData?.videoFiles);
			}
		} catch (error) {
			console.error('Error loading status files:', error);
			setIsError(true);
		} finally {
			setIsLoading(false);
		}
	}

	useEffect(() => {
		fetchSavedStatus();

		fetchStatus();
	}, []);

	return (
		<GlobalContext.Provider
			value={{
				imageStatus,
				setImageStatus,
				videoStatus,
				setVideoStatus,
				savedImageStatus,
				setSavedImageStatus,
				savedVideoStatus,
				setSavedVideoStatus,
				isLoading,
				setIsLoading,
				isError,
				setIsError,
				isPermissionGranted,
				setIsPermissionGranted,
				fetchStatus,
				fetchSavedStatus,
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
}

export const useGlobalContext = () => useContext(GlobalContext);
