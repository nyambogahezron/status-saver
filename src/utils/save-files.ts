import { Toast } from '@/lib/Toaster';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';

const STORAGE_KEY = 'WHATSAPP_STATUS_STORE'; // Key to store folder URI
const STORAGE_FOLDER =
	'content://com.android.externalstorage.documents/tree/primary%3AWhatsApp';

export async function SelectSavedFolder() {
	try {
		const permissions =
			await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
		if (!permissions.granted) {
			console.error('Permission to access storage is not granted');
			Toast('Permission to access storage is not granted');
			return;
		}

		const parentUri = permissions.directoryUri;
		await AsyncStorage.setItem(STORAGE_KEY, parentUri);

		Toast('Folder selected successfully!');
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
					STORAGE_FOLDER
				);
			if (!permissions.granted) {
				console.error('Permission to access storage is not granted');
				Toast('Permission to access storage is not granted');
				return;
			}

			const parentUri = permissions.directoryUri;
			await AsyncStorage.setItem(STORAGE_KEY, parentUri);

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
			const permissions =
				await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync(
					STORAGE_FOLDER
				);
			if (!permissions.granted) {
				console.error('Permission to access storage is not granted');
				Toast('Permission to access storage is not granted');
				return;
			}

			parentUri = permissions.directoryUri;
			await AsyncStorage.setItem(STORAGE_KEY, parentUri);
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
	try {
		// Retrieve stored parent URI
		const parentUri = await AsyncStorage.getItem(STORAGE_KEY);
		console.log('📁 Stored Parent URI:', parentUri);

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
