import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';

const STORAGE_KEY = 'WHATSAPP_STATUS_STORE'; // Key to store the folder URI

export async function SaveFile(URI: string) {
	console.log('URI:', URI);

	try {
		// Check if a saved path already exists
		let parentUri = await AsyncStorage.getItem(STORAGE_KEY);

		if (!parentUri) {
			// Request directory access only if not stored before
			const permissions =
				await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
			if (!permissions.granted) {
				console.error('Error: Permission to access storage is not granted');
				return;
			}

			// Save selected directory URI for future use
			parentUri = permissions.directoryUri;
			await AsyncStorage.setItem(STORAGE_KEY, parentUri);
		}

		console.log('Saving file to folder:', parentUri);

		// Extract filename from URI
		const fileName = URI.split('/').pop();
		if (!fileName) {
			console.error('Error: Invalid file name');
			return;
		}

		try {
			// Create a new file inside the stored folder
			const newFileUri =
				await FileSystem.StorageAccessFramework.createFileAsync(
					parentUri,
					fileName,
					'image/*' // Change to 'video/*' for videos
				);
			console.log('New file created at:', newFileUri);

			// Read original file as Base64
			const fileData = await FileSystem.readAsStringAsync(URI, {
				encoding: FileSystem.EncodingType.Base64,
			});

			// Write Base64 data to the new file
			await FileSystem.writeAsStringAsync(newFileUri, fileData, {
				encoding: FileSystem.EncodingType.Base64,
			});

			console.log('File saved successfully.');
		} catch (error) {
			console.error('Error copying file:', error);
		}
	} catch (error) {
		console.error('Error:', error);
	}
}
