import { LoadSavedFiles, LoadStatusFiles, SaveFile } from '@/utils/file-api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useState, useEffect, useContext } from 'react';
import { WHATSAPP_STATUS_PATH } from '@/utils/file-api';

interface ImageStatus {
	uri: string;
	name: string;
	type?: 'image' | 'video' | 'audio';
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
		try {
			const isStatusFolder = await AsyncStorage.getItem(
				'WHATSAPP_STATUS_STORE'
			);
			const statusFolderUri = await AsyncStorage.getItem('statusFolderUri');

			if (isStatusFolder && statusFolderUri) {
				setIsPermissionGranted(true);
				// Load files immediately if permissions are granted
				await fetchStatus();
				await fetchSavedStatus();
			} else {
				// If no permissions, try to get them
				const hasPermission = await LoadStatusFiles();
				if (
					hasPermission.photoFiles.length > 0 ||
					hasPermission.videoFiles.length > 0
				) {
					setIsPermissionGranted(true);
					await AsyncStorage.setItem('WHATSAPP_STATUS_STORE', 'true');
					await AsyncStorage.setItem('statusFolderUri', WHATSAPP_STATUS_PATH);
				}
			}
		} catch (error) {
			console.error('Error checking permissions:', error);
			setIsError(true);
		}
	}

	useEffect(() => {
		checkForPermissions();
	}, []);

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
							uri: file.uri,
							name: file.name,
							type: 'image' as const,
						}))
					);
					setSavedVideoStatus(
						savedStatusData.videoFiles.map((file) => ({
							uri: file.uri,
							name: file.name,
							type: 'video' as const,
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
			console.log('Starting to fetch status files...');
			const statusData = await LoadStatusFiles();
			console.log('Received status data:', statusData);

			if (
				statusData &&
				'photoFiles' in statusData &&
				'videoFiles' in statusData
			) {
				const newImageStatus = statusData.photoFiles.map((file) => ({
					uri: file.uri,
					name: file.name,
					type: 'image' as const,
				}));
				console.log('Setting image status:', newImageStatus.length);
				setImageStatus(newImageStatus);

				const newVideoStatus = statusData.videoFiles.map((file) => ({
					uri: file.uri,
					name: file.name,
					type: 'video' as const,
				}));
				console.log('Setting video status:', newVideoStatus.length);
				setVideoStatus(newVideoStatus);
			} else {
				console.log('Status data structure is invalid:', statusData);
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
				uri: URI,
				name: URI.split('/').pop() || 'unknown',
				type: 'image' as const,
			};

			setSavedImageStatus([...savedImageStatus, newItem]);
		}
	}

	useEffect(() => {
		if (isPermissionGranted) {
			fetchSavedStatus();
		}
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
