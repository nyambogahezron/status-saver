import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';

export async function SaveFile(URI: string) {
	const folderName = 'WhatsAppStatusSaver';
	const downloadsDir = FileSystem.documentDirectory + folderName + '/';

	console.log('Saving file to folder:', downloadsDir);

	try {
		// Request permission to access media library
		const { status } = await MediaLibrary.requestPermissionsAsync();
		if (status !== 'granted') {
			console.error('Permission to access media library not granted.');
			return;
		}

		// Ensure the folder exists in external storage
		await FileSystem.makeDirectoryAsync(downloadsDir, { intermediates: true });

		// Extract the file name
		const fileName = URI.split('/').pop();
		const newFileUri = downloadsDir + fileName;

		// Copy the file to the external directory
		await FileSystem.copyAsync({ from: URI, to: newFileUri });
		console.log('File copied successfully to:', newFileUri);

		// Save to the gallery
		const asset = await MediaLibrary.createAssetAsync(newFileUri);
		await MediaLibrary.createAlbumAsync(folderName, asset, false);
		console.log('File saved to gallery:', asset.uri);
	} catch (error) {
		console.error('Error saving file:', error);
	}
}
