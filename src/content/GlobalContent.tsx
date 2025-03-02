import { LoadSavedFiles, LoadStatusFiles, SaveFile } from '@/utils/file-api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useState, useEffect, useContext } from 'react';

interface ImageStatus {
	url: string;
	name: string;
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
	SaveFileToStorage: (URI: string) => void;
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

	async function checkForPermissions() {
		const isStatusFolder = await AsyncStorage.getItem('WHATSAPP_STATUS_STORE');

		const statusFolderUri = await AsyncStorage.getItem('statusFolderUri');

		if (isStatusFolder && statusFolderUri) {
			setIsPermissionGranted(true);
		}
	}

	checkForPermissions();

	/**
	 * @description Fetches the saved status
	 * @returns
	 */

	const fetchSavedStatus = async () => {
		try {
			const savedStatusData = await LoadSavedFiles();
			if (savedStatusData) {
				if (
					'photoFiles' in savedStatusData &&
					'videoFiles' in savedStatusData
				) {
					setSavedImageStatus(
						savedStatusData.photoFiles.map((file) => ({
							url: file.uri,
							name: file.name,
						}))
					);
					setSavedVideoStatus(
						savedStatusData.videoFiles.map((file) => ({
							url: file.uri,
							name: file.name,
						}))
					);
				}
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
			if (
				statusData &&
				'photoFiles' in statusData &&
				'videoFiles' in statusData
			) {
				setImageStatus(
					statusData.photoFiles.map((file) => ({
						url: file.uri,
						name: file.name,
					}))
				);
				setVideoStatus(
					statusData.videoFiles.map((file) => ({
						url: file.uri,
						name: file.name,
					}))
				);
			}
		} catch (error) {
			console.error('Error loading status files:', error);
			setIsError(true);
		} finally {
			setIsLoading(false);
		}
	}

	/**
	 * @description Saves the file to storage
	 * @returns
	 */

	async function SaveFileToStorage(URI: string) {
		if (!URI) {
			console.error('Error: No file URI found');
			return;
		}

		const save = await SaveFile(URI);

		if (save) {
			const newItem = {
				url: URI,
				name: URI.split('/').pop() || 'unknown',
			};

			setSavedImageStatus([...savedImageStatus, newItem]);
		}
	}

	useEffect(() => {
		fetchSavedStatus();

		fetchStatus();
	}, [isPermissionGranted]);

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
				SaveFileToStorage,
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
}

export const useGlobalContext = () => useContext(GlobalContext);
