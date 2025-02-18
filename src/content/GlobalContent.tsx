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
			if (
				savedStatusData &&
				'photoFiles' in savedStatusData &&
				'videoFiles' in savedStatusData
			) {
				const { photoFiles, videoFiles } = savedStatusData as StatusData;
				setSavedImageStatus(
					photoFiles.map((file) => ({ url: file.uri, name: file.name }))
				);
				setSavedVideoStatus(
					videoFiles.map((file) => ({ url: file.uri, name: file.name }))
				);
			}
		} catch (error) {
			console.error('Error loading saved status:', error);
			setIsError(true);
		}
	};

	const fetchStatus = async () => {
		try {
			setIsLoading(true);
			const statusData = LoadStatusFiles();
			if (
				statusData &&
				'photoFiles' in statusData &&
				'videoFiles' in statusData
			) {
				const { photoFiles, videoFiles } = statusData as StatusData;

				const newImageStatus = photoFiles.map((file) => ({
					url: file.uri,
					name: file.name,
				}));

				const newVideoStatus = videoFiles.map((file) => ({
					url: file.uri,
					name: file.name,
				}));

				setImageStatus(newImageStatus);
				setVideoStatus(newVideoStatus);
				console.log('newImageStatus', newImageStatus);
				console.log('newVideoStatus', newVideoStatus);
			}
		} catch (error) {
			console.error('Error loading status files:', error);
			setIsError(true);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchSavedStatus();

		fetchStatus();
	}, []);

	useEffect(() => {
		fetchStatus();
	}, [savedImageStatus, savedVideoStatus]);

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
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
}

export const useGlobalContext = () => useContext(GlobalContext);
