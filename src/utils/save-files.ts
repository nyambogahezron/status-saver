import { Toast } from '@/lib/Toaster';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';

const STORAGE_KEY = 'WHATSAPP_STATUS_STORE'; // Key to store folder URI

/**
 * @description Save a file to the selected folder in the device storage
 * @param {string} URI - The URI of the file to save of the form content://... or file://...
 * @example SaveFile('content://...') => void
 */

export async function SaveFile(URI: string) {
	try {
		// Retrieve stored parent URI
		let parentUri = await AsyncStorage.getItem(STORAGE_KEY);

		// If the folder is not stored, request permission
		if (!parentUri) {
			const permissions =
				await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
			if (!permissions.granted) {
				console.error('Permission to access storage is not granted');
				Toast('Permission to access storage is not granted');
				return;
			}

			parentUri = permissions.directoryUri;
			await AsyncStorage.setItem(STORAGE_KEY, parentUri);
		}

		// Extract the last part of the URI, which will be the file name
		const fileName = URI.split('%').pop();

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
 * @description Save many files to the selected folder in the device storage
 * @param {string[]} URIs - The URIs of the files to save
 */

export async function SaveManyFiles(URIs: string[]) {
	try {
		// Retrieve stored parent URI
		let parentUri = await AsyncStorage.getItem(STORAGE_KEY);

		// If the folder is not stored, request permission
		if (!parentUri) {
			const permissions =
				await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
			if (!permissions.granted) {
				console.error('Permission to access storage is not granted');
				Toast('Permission to access storage is not granted');
				return;
			}

			parentUri = permissions.directoryUri;
			await AsyncStorage.setItem(STORAGE_KEY, parentUri);
		}

		for (const URI of URIs) {
			// Extract the last part of the URI, which will be the file name
			const fileName = URI.split('%').pop();

			if (!fileName) {
				console.error('Error: No valid file name found');
				return;
			}

			// Check if file already exists in the folder
			const folderContents =
				await FileSystem.StorageAccessFramework.readDirectoryAsync(parentUri);
			const existingFile = folderContents.find((file) =>
				file.includes(fileName)
			);

			if (existingFile) {
				Toast('File already exists!');
				return;
			}

			// Create a new file in the selected folder with the extracted file name
			const newFileUri =
				await FileSystem.StorageAccessFramework.createFileAsync(
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
		}

		Toast('Files saved successfully!');
	} catch (error) {
		console.error('SaveManyFiles Error:', error);
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

		if (!parentUri) {
			console.error('Error: No parent URI found');
			return [];
		}

		// Read the contents of the folder
		const files = await FileSystem.StorageAccessFramework.readDirectoryAsync(
			parentUri
		);

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
	} catch (error) {
		console.error('GetSavedFiles Error:', error);
		return [];
	}
}

/**
 * @description Delete a file from the device storage
 * @param {string} URI - The URI of the file to delete
 *
 */

export async function DeleteOneFile(URI: string) {
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
 * @description Delete all files from the device storage
 *
 */

export async function DeleteAllFiles() {
	try {
		// Retrieve stored parent URI
		const parentUri = await AsyncStorage.getItem(STORAGE_KEY);
		console.log('📁 Stored Parent URI:', parentUri);

		if (!parentUri) {
			console.error('Error: No parent URI found');
			return;
		}

		// Read the contents of the folder
		const folderContents =
			await FileSystem.StorageAccessFramework.readDirectoryAsync(parentUri);

		// Delete each file in the folder
		for (const file of folderContents) {
			await FileSystem.StorageAccessFramework.deleteAsync(file);
		}

		Toast('All files deleted successfully!');
	} catch (error) {
		console.error('DeleteAllFiles Error:', error);
	}
}
