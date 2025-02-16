import { Alert } from 'react-native';
import { StorageAccessFramework } from 'expo-file-system';

/**
 * @description Creates a folder and copies a file to that folder
 * @param folderName - Name of the new folder
 * @param fileUri - URI of the file to copy
 * @returns void
 */
export async function createFolderAndCopyFile(fileUri: string) {
	const folderName = 'WhatsApp Status saver';
	console.log('fileUri:', fileUri);

	try {
		const permissions =
			await StorageAccessFramework.requestDirectoryPermissionsAsync();
		if (!permissions.granted) {
			console.error('Error: Permission to access storage is not granted');
			return;
		}

		const parentUri = permissions.directoryUri;
		const newFolderUri = `${parentUri}/${folderName}`.replace(/\/$/, ''); // Ensure no trailing slash

		// Create the new folder if it doesn't exist
		try {
			const folderExists = await StorageAccessFramework.readDirectoryAsync(
				parentUri
			);
			if (!folderExists.includes(newFolderUri)) {
				await StorageAccessFramework.makeDirectoryAsync(parentUri, folderName);
				console.log('Folder created successfully:', newFolderUri);
			} else {
				console.log('Folder already exists:', newFolderUri);
			}
		} catch (error) {
			console.error('Error creating or checking folder:', error);
			Alert.alert('Error creating or checking folder');
			return;
		}

		// Copy the file to the new folder
		const fileName = fileUri.split('/').pop();
		const newFileUri = `${newFolderUri}/${fileName}`;
		try {
			await StorageAccessFramework.copyAsync({
				from: fileUri,
				to: newFileUri,
			});
			console.log('File copied successfully to:', newFileUri);
			Alert.alert('File copied to new folder');
		} catch (error) {
			if ((error as any).code === 'E_FILE_NOT_FOUND') {
				console.error('Error: File not found:', error);
				Alert.alert('Error: File not found');
			} else {
				console.error('Error copying file:', error);
				Alert.alert('Error copying file');
			}
		}
	} catch (error) {
		console.error('Error creating folder or copying file:', error);
		Alert.alert('Error creating folder or copying file');
	}
}
