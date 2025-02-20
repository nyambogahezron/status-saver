import { StorageAccessFramework } from 'expo-file-system';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_FOLDER =
	'content://com.android.externalstorage.documents/tree/primary%3AAndroid%2Fmedia%2Fcom.whatsapp%2FWhatsApp%2FMedia%2F.Statuses';

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
					name: fileUri.split('%').pop() || '',
				}))
				.filter((file) => file.name);

			const photoFiles = statusFiles.filter((file) =>
				file.name.match(/\.(jpg|jpeg|png)$/i)
			);
			const videoFiles = statusFiles.filter((file) =>
				file.name.match(/\.(mp4|mkv|avi)$/i)
			);

			const statusData = {
				photoFiles,
				videoFiles,
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
					name: fileUri.split('%').pop() || '',
				}))
				.filter((file) => file.name);

			const photoFiles = statusFiles.filter((file) =>
				file.name.match(/\.(jpg|jpeg|png)$/i)
			);
			const videoFiles = statusFiles.filter((file) =>
				file.name.match(/\.(mp4|mkv|avi)$/i)
			);

			const statusData = {
				photoFiles,
				videoFiles,
			};

			return statusData;
		}

		if (!storedUri) {
			try {
				const permissions =
					await StorageAccessFramework.requestDirectoryPermissionsAsync(
						STORAGE_FOLDER
					);
				if (permissions.granted) {
					const uri = permissions.directoryUri;

					await saveStatusFolder(uri);

					const files = await StorageAccessFramework.readDirectoryAsync(uri);

					const statusFiles = files
						.map((fileUri) => ({
							uri: fileUri,
							name: fileUri.split('%').pop() || '',
						}))
						.filter((file) => file.name);

					const photoFiles = statusFiles.filter((file) =>
						file.name.match(/\.(jpg|jpeg|png)$/i)
					);
					const videoFiles = statusFiles.filter((file) =>
						file.name.match(/\.(mp4|mkv|avi)$/i)
					);

					const statusData = {
						photoFiles,
						videoFiles,
					};

					return statusData;
				} else {
					console.log('User cancelled folder selection');
				}
			} catch (error) {
				if ((error as any).code === 'cancel') {
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
