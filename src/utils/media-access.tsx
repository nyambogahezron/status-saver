import { StorageAccessFramework } from 'expo-file-system';
import DocumentPicker from 'react-native-document-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as MediaLibrary from 'expo-media-library';
import { Alert } from 'react-native';

/**
 * @description Selects the WhatsApp status folder
 * @returns Status files
 */
export async function selectWhatsAppStatusFolder() {
	try {
		const storedUri = await AsyncStorage.getItem('statusFolderUri');
		if (storedUri) {
			const files = await StorageAccessFramework.readDirectoryAsync(storedUri);

			const statusFiles = files
				.map((fileUri) => ({
					uri: fileUri,
					name: fileUri.split('/').pop() || '',
				}))
				.filter((file) => file.name);

			const photoFiles = statusFiles.filter((file) =>
				file.name.match(/\.(jpg|jpeg|png)$/i)
			);
			const videoFiles = statusFiles.filter((file) =>
				file.name.match(/\.(mp4|mkv|avi)$/i)
			);
			const audioFiles = statusFiles.filter((file) =>
				file.name.match(/\.(mp3|wav|m4a)$/i)
			);

			const statusData = {
				photoFiles,
				videoFiles,
				audioFiles,
			};

			return statusData;
		}

		return null;
	} catch (error) {
		console.error('Error loading stored folder:', error);
	}
}

/**
 * @description Loads the status files
 * @returns Status files
 */

export async function LoadStatusFiles() {
	try {
		const storedUri = await AsyncStorage.getItem('statusFolderUri');
		if (storedUri) {
			const files = await StorageAccessFramework.readDirectoryAsync(storedUri);

			const statusFiles = files
				.map((fileUri) => ({
					uri: fileUri,
					name: fileUri.split('/').pop() || '',
				}))
				.filter((file) => file.name);

			const photoFiles = statusFiles.filter((file) =>
				file.name.match(/\.(jpg|jpeg|png)$/i)
			);
			const videoFiles = statusFiles.filter((file) =>
				file.name.match(/\.(mp4|mkv|avi)$/i)
			);
			const audioFiles = statusFiles.filter((file) =>
				file.name.match(/\.(mp3|wav|m4a)$/i)
			);

			const statusData = {
				photoFiles,
				videoFiles,
				audioFiles,
			};

			return statusData;
		}

		if (!storedUri) {
			try {
				const permissions =
					await StorageAccessFramework.requestDirectoryPermissionsAsync();
				if (permissions.granted) {
					const uri = permissions.directoryUri;

					await saveStatusFolder(uri);

					const files = await StorageAccessFramework.readDirectoryAsync(uri);

					const statusFiles = files
						.map((fileUri) => ({
							uri: fileUri,
							name: fileUri.split('/').pop() || '',
						}))
						.filter((file) => file.name);

					const photoFiles = statusFiles.filter((file) =>
						file.name.match(/\.(jpg|jpeg|png)$/i)
					);
					const videoFiles = statusFiles.filter((file) =>
						file.name.match(/\.(mp4|mkv|avi)$/i)
					);
					const audioFiles = statusFiles.filter((file) =>
						file.name.match(/\.(mp3|wav|m4a)$/i)
					);

					const statusData = {
						photoFiles,
						videoFiles,
						audioFiles,
					};

					return statusData;
				} else {
					console.log('User cancelled folder selection');
				}
			} catch (error) {
				if (DocumentPicker.isCancel(error)) {
					console.log('User cancelled folder selection');
				} else {
					console.error('Error selecting folder:', error);
				}
			}
		}

		return [];
	} catch (error) {
		console.error('Error loading stored folder:', error);
	}
}

/**
 * @description Saves the status folder
 * @param uri - Folder URI
 * @returns void
 */

export async function saveStatusFolder(uri: string) {
	try {
		await AsyncStorage.setItem('statusFolderUri', uri);
	} catch (error) {
		console.error('Error saving folder:', error);
	}
}

/**
 * @description Save statues to the gallery
 * @param uri - File URI
 * @returns void
 */
export async function saveStatusToGallery(uri: string) {
	try {
		if (uri) {
			const { status } = await MediaLibrary.requestPermissionsAsync();

			console.log('Status:', status);
			console.log('URI:', uri);

			if (status === 'granted') {
				try {
					const asset = await MediaLibrary.createAssetAsync(uri);
					await MediaLibrary.createAlbumAsync('WhatsApp Statuses', asset);
					console.log('File saved successfully:', uri);
					Alert.alert('Status saved to gallery');
				} catch (error) {
					console.error('Error saving the file:', error);
				}
			} else {
				console.error(
					'Error: Permission to access media library is not granted'
				);
			}
		} else {
			console.error('Error: URI is null or undefined');
		}
	} catch (error) {
		console.error('Error saving the file:', error);
	}
}
