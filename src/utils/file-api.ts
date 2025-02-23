import { StorageAccessFramework } from 'expo-file-system';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Toast } from '@/lib/Toaster';
import * as FileSystem from 'expo-file-system';

const STORAGE_FOLDER =
	'content://com.android.externalstorage.documents/tree/primary%3AAndroid%2Fmedia%2Fcom.whatsapp%2FWhatsApp%2FMedia%2F.Statuses';

const STORAGE_KEY = 'WHATSAPP_STATUS_STORE'; // Key to store folder URI
const SAVE_STORAGE_FOLDER =
	'content://com.android.externalstorage.documents/tree/primary%3AWhatsApp';

/**
 * @description Selects the WhatsApp status folder
 * @returns Status files
 */
export async function selectWhatsAppStatusFolder() {
	try {
		const permissions =
			await StorageAccessFramework.requestDirectoryPermissionsAsync(
				STORAGE_FOLDER
			);

		if (permissions.granted) {
			const uri = permissions.directoryUri;
			try {
				await AsyncStorage.setItem('statusFolderUri', uri);
			} catch (error) {
				console.error('Error saving folder:', error);
			}
			return true;
		} else {
			console.log('User cancelled folder selection');
			return false;
		}
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
		} else {
			console.log('No folder selected');
			Toast('No folder selected');
		}

		return [];
	} catch (error) {
		console.error('Error loading stored folder:', error);
	}
}

/**
 *  @description Selects the folder to save files
 * @returns
 */

export async function SelectSavedFolder() {
	try {
		const permissions =
			await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync(
				SAVE_STORAGE_FOLDER
			);
		if (!permissions.granted) {
			console.error('Permission to access storage is not granted');
			Toast('Permission to access storage is not granted');
			return;
		}

		const parentUri = permissions.directoryUri;
		await AsyncStorage.setItem(STORAGE_KEY, parentUri);

		Toast('Folder selected successfully!');
		return true;
	} catch (error) {
		console.error('SelectFolder Error:', error);
	}
}

/**
 * @description Get the saves files from the device storage
 * @example GetSavedFiles() => ['file1.jpg', 'file2.mp4']
 */

export async function LoadSavedFiles() {
	try {
		// Retrieve stored parent URI
		const parentUri = await AsyncStorage.getItem(STORAGE_KEY);

		if (parentUri) {
			// Read the contents of the folder
			const files = await FileSystem.StorageAccessFramework.readDirectoryAsync(
				parentUri
			);
			const data = await filterFiles(files);
			return data;
		} else {
			const permissions =
				await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync(
					SAVE_STORAGE_FOLDER
				);
			if (!permissions.granted) {
				console.error('Permission to access storage is not granted');
				Toast('Permission to access storage is not granted');
				return;
			}

			const parentUri = permissions.directoryUri;

			const files = await FileSystem.StorageAccessFramework.readDirectoryAsync(
				parentUri
			);

			const data = await filterFiles(files);
			return data;
		}
	} catch (error) {
		console.error('GetSavedFiles Error:', error);
		return [];
	}
}

/**
 * @description Save a file to the selected folder in the device storage
 * @param {string} URI - The URI of the file to save of the form content://... or file://...
 * @example SaveFile('content://...') => void
 */

export async function SaveFile(URI: string) {
	if (!URI) {
		console.error('Error: No file URI found');
		return;
	}

	try {
		// Retrieve stored parent URI
		let parentUri = await AsyncStorage.getItem(STORAGE_KEY);

		// If the folder is not stored, request permission
		if (!parentUri) {
			console.error('Error: No parent URI found');
			return;
		}

		// Extract the last part of the URI, which will be the file name
		const fileName = URI?.split('%').pop();

		if (!fileName) {
			console.error('Error: No valid file name found');
			return;
		}

		// Check if file already exists in the folder
		const folderContents =
			await FileSystem.StorageAccessFramework.readDirectoryAsync(parentUri);
		const existingFile = folderContents.find((file) => file.includes(fileName));

		if (existingFile) {
			Toast('File already exists!');
			return;
		}

		// Create a new file in the selected folder with the extracted file name
		const newFileUri = await FileSystem.StorageAccessFramework.createFileAsync(
			parentUri,
			fileName, // Use the clean filename here
			'image/*'
		);

		// Read original file as Base64
		const fileData = await FileSystem.readAsStringAsync(URI, {
			encoding: FileSystem.EncodingType.Base64,
		});

		// Write Base64 data to the new file
		await FileSystem.writeAsStringAsync(newFileUri, fileData, {
			encoding: FileSystem.EncodingType.Base64,
		});

		Toast('File saved successfully!');

		const item = {
			uri: newFileUri,
			name: fileName,
		};
		return item;
	} catch (error) {
		console.error('SaveFile Error:', error);
	}
}

/**
 * @description Delete a file from the device storage
 * @param {string} URI - The URI of the file to delete
 *
 */

export async function DeleteFile(URI: string) {
	if (!URI) {
		Toast('Error: No file URI found');
		return;
	}
	try {
		// Retrieve stored parent URI
		const parentUri = await AsyncStorage.getItem(STORAGE_KEY);

		if (!parentUri) {
			console.error('Error: No parent URI found');
			return;
		}

		// Extract the last part of the URI, which will be the file name
		const fileName = URI.split('/').pop();

		if (!fileName) {
			console.error('Error: No valid file name found');
			return;
		}

		// Check if file exists in the folder
		const folderContents =
			await FileSystem.StorageAccessFramework.readDirectoryAsync(parentUri);
		const existingFile = folderContents.find((file) => file.includes(fileName));

		if (!existingFile) {
			Toast('File not found!');
			return;
		}

		// Delete the file
		await FileSystem.StorageAccessFramework.deleteAsync(URI);
		Toast('File deleted successfully!');
		const item = {
			uri: URI,
			name: fileName,
		};
		return item;
	} catch (error) {
		console.error('DeleteFile Error:', error);
	}
}

/**
 * @description Filter the files into photos and videos
 * @param {string[]} files - Array of file URIs
 */

async function filterFiles(files: string[]) {
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
