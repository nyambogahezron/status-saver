import RNFS from 'react-native-fs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Toast } from '@/lib/Toaster';
import { PermissionsAndroid, Platform, Linking } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';

const STORAGE_FOLDER_KEY = 'statusFolderUri';
const STORAGE_KEY = 'WHATSAPP_STATUS_STORE';

// Possible WhatsApp status paths
const WHATSAPP_STATUS_PATHS = [
	'/storage/emulated/0/Android/media/com.whatsapp/WhatsApp/Media/.Statuses',
];

export const WHATSAPP_STATUS_PATH = WHATSAPP_STATUS_PATHS[0];
const SAVE_STORAGE_FOLDER = '/storage/emulated/0/WhatsApp';

interface StatusFile {
	uri: string;
	name: string;
}

interface StatusData {
	photoFiles: StatusFile[];
	videoFiles: StatusFile[];
}

/**
 * @description Open folder picker to select WhatsApp status folder
 */
export async function selectWhatsAppStatusFolder() {
	try {
		if (Platform.OS === 'android') {
			// Open folder picker
			const result = await DocumentPicker.getDocumentAsync({
				type: '*/*',
				copyToCacheDirectory: false,
			});
			console.log('Selected folder:', result);

			if (result && result.assets && result.assets[0]) {
				// Get the parent directory of the selected file
				const selectedPath = result.assets[0].uri;
				const folderPath = selectedPath.substring(
					0,
					selectedPath.lastIndexOf('/')
				);

				// Store the selected folder path
				await AsyncStorage.setItem(STORAGE_FOLDER_KEY, folderPath);
				Toast('WhatsApp status folder selected successfully!');
				return true;
			}
		}
		return false;
	} catch (error) {
		console.error('Error selecting folder:', error);
		Toast('Failed to select WhatsApp status folder');
		return false;
	}
}

/**
 * @description Try to find WhatsApp status folder automatically
 */
async function findWhatsAppStatusFolder() {
	console.log('Trying to find WhatsApp status folder automatically...');
	for (const path of WHATSAPP_STATUS_PATHS) {
		try {
			console.log(`Checking path: ${path}`);
			const exists = await RNFS.exists(path);
			if (exists) {
				console.log(`Found WhatsApp status folder: ${path}`);
				await AsyncStorage.setItem(STORAGE_FOLDER_KEY, path);
				return path;
			}
		} catch (error) {
			console.error(`Error checking path ${path}:`, error);
		}
	}
	console.log('Could not find WhatsApp status folder automatically');
	return null;
}

/**
 * @description Request necessary permissions for accessing storage
 */
async function requestStoragePermission() {
	try {
		if (Platform.OS === 'android') {
			if (Platform.Version >= 30) {
				// For Android 11 and above, we need to use SAF
				const storedPath = await AsyncStorage.getItem(STORAGE_FOLDER_KEY);
				if (!storedPath) {
					// Try to find the WhatsApp status folder automatically
					const foundPath = await findWhatsAppStatusFolder();
					if (!foundPath) {
						Toast('Please select the WhatsApp status folder');
						return false;
					}
				}
				return true;
			} else {
				// For Android 10 and below
				const granted = await PermissionsAndroid.request(
					PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
					{
						title: 'Storage Permission',
						message:
							'App needs access to your storage to read WhatsApp statuses',
						buttonNeutral: 'Ask Me Later',
						buttonNegative: 'Cancel',
						buttonPositive: 'OK',
					}
				);
				return granted === PermissionsAndroid.RESULTS.GRANTED;
			}
		}
		return true;
	} catch (err) {
		console.error('Error requesting storage permission:', err);
		return false;
	}
}

/**
 * @description Load files from a directory
 */
async function loadFilesFromDirectory(
	directoryPath: string
): Promise<StatusData> {
	try {
		console.log(`Loading files from: ${directoryPath}`);
		const exists = await RNFS.exists(directoryPath);
		if (!exists) {
			console.log(`Directory does not exist: ${directoryPath}`);
			return { photoFiles: [], videoFiles: [] };
		}

		// First try to read the directory
		let files = await RNFS.readDir(directoryPath);
		console.log(`Found ${files.length} files in directory:`, files);

		// Filter files that are actual files (not directories) and have valid names
		const statusFiles = files
			.filter((file) => file.isFile())
			.map((file) => {
				// Convert file path to proper URI format
				const uri =
					Platform.OS === 'android' ? `file://${file.path}` : file.path;

				return {
					uri,
					name: file.name,
				};
			})
			.filter((file) => file.name && !file.name.startsWith('.')); // Exclude hidden files

		console.log('Filtered status files:', statusFiles);

		// Filter photos and videos
		const photoFiles = statusFiles.filter((file) =>
			file.name.toLowerCase().match(/\.(jpg|jpeg|png)$/)
		);

		const videoFiles = statusFiles.filter((file) =>
			file.name.toLowerCase().match(/\.(mp4|mkv|avi)$/)
		);

		console.log('Found photos:', photoFiles.length);
		console.log('Found videos:', videoFiles.length);

		return { photoFiles, videoFiles };
	} catch (error) {
		console.error(`Error loading files from ${directoryPath}:`, error);
		return { photoFiles: [], videoFiles: [] };
	}
}

/**
 * @description Try all possible WhatsApp status paths
 */
async function tryAllWhatsAppStatusPaths(): Promise<StatusData> {
	for (const path of WHATSAPP_STATUS_PATHS) {
		try {
			console.log(`Trying path: ${path}`);
			const statusData = await loadFilesFromDirectory(path);
			if (
				statusData.photoFiles.length > 0 ||
				statusData.videoFiles.length > 0
			) {
				console.log(`Found files in ${path}`);
				await AsyncStorage.setItem(STORAGE_FOLDER_KEY, path);
				return statusData;
			}
		} catch (error) {
			console.error(`Error checking path ${path}:`, error);
		}
	}
	return { photoFiles: [], videoFiles: [] };
}

/**
 * @description Loads the status files
 * @returns Status files
 */
export async function LoadStatusFiles(): Promise<StatusData> {
	try {
		console.log('Starting LoadStatusFiles...');

		// Request permissions first
		const hasPermission = await requestStoragePermission();
		console.log('Permission check result:', hasPermission);

		if (!hasPermission) {
			Toast('Storage permission is required to access WhatsApp statuses');
			return { photoFiles: [], videoFiles: [] };
		}

		// Get the stored folder path
		const storedPath = await AsyncStorage.getItem(STORAGE_FOLDER_KEY);

		if (storedPath) {
			console.log('Using stored folder path:', storedPath);
			// Load files from the stored folder
			const statusData = await loadFilesFromDirectory(storedPath);

			// If files found, return them
			if (
				statusData.photoFiles.length > 0 ||
				statusData.videoFiles.length > 0
			) {
				console.log(`Found files in stored path: ${storedPath}`);
				return statusData;
			}

			console.log(
				'No files found in stored path, trying all possible paths...'
			);
		} else {
			console.log('No stored path, trying all possible paths...');
		}

		// Try all possible WhatsApp status paths
		const allPathsData = await tryAllWhatsAppStatusPaths();
		if (
			allPathsData.photoFiles.length > 0 ||
			allPathsData.videoFiles.length > 0
		) {
			return allPathsData;
		}

		// If still no files found, try the WhatsApp directory as a last resort
		console.log(
			'No files found in any status paths, trying WhatsApp directory...'
		);
		const whatsappData = await loadFilesFromDirectory(SAVE_STORAGE_FOLDER);
		if (
			whatsappData.photoFiles.length > 0 ||
			whatsappData.videoFiles.length > 0
		) {
			console.log('Found files in WhatsApp directory');
			// Don't store this as the status folder, as it's just a fallback
			return whatsappData;
		}

		Toast('No status files found. Please check if WhatsApp has any statuses.');
		return { photoFiles: [], videoFiles: [] };
	} catch (error) {
		console.error('Error loading WhatsApp status folder:', error);
		Toast('Failed to load WhatsApp statuses');
		return { photoFiles: [], videoFiles: [] };
	}
}

/**
 * @description Saves a file to the storage
 * @param URI The URI of the file to save
 * @returns boolean indicating success
 */
export async function SaveFile(URI: string): Promise<boolean> {
	try {
		const fileName = URI.split('/').pop();
		if (!fileName) {
			Toast('Invalid file name');
			return false;
		}

		const destinationPath = `${SAVE_STORAGE_FOLDER}/${fileName}`;
		await RNFS.copyFile(URI, destinationPath);
		Toast('File saved successfully!');
		return true;
	} catch (error) {
		console.error('Error saving file:', error);
		Toast('Failed to save file');
		return false;
	}
}

/**
 * @description Selects the folder to save files
 * @returns
 */
export async function SelectSavedFolder() {
	try {
		// Check if save folder exists, if not create it
		const exists = await RNFS.exists(SAVE_STORAGE_FOLDER);
		if (!exists) {
			await RNFS.mkdir(SAVE_STORAGE_FOLDER);
		}

		await AsyncStorage.setItem(STORAGE_KEY, SAVE_STORAGE_FOLDER);
		Toast('Save folder selected successfully!');
		return true;
	} catch (error) {
		console.error('SelectFolder Error:', error);
		Toast('Failed to create save folder');
		return false;
	}
}

/**
 * @description Get the saved files from the device storage
 */
export async function LoadSavedFiles() {
	try {
		const storedPath = await AsyncStorage.getItem(STORAGE_KEY);
		const folderPath = storedPath || SAVE_STORAGE_FOLDER;

		if (folderPath) {
			const files = await RNFS.readDir(folderPath);
			console.log(files);
			const data = await filterFiles(files.map((f) => f.path));
			return data;
		} else {
			console.error('Error: No save folder found');
			return { photoFiles: [], videoFiles: [] };
		}
	} catch (error) {
		console.error('GetSavedFiles Error:', error);
		return { photoFiles: [], videoFiles: [] };
	}
}

/**
 * @description Filter the files into photos and videos
 */
async function filterFiles(files: string[]) {
	const statusFiles = files
		.map((filePath) => ({
			uri: filePath,
			name: filePath.split('/').pop() || '',
		}))
		.filter((file) => file.name);

	const photoFiles = statusFiles.filter((file) =>
		file.name.match(/\.(jpg|jpeg|png)$/i)
	);

	const videoFiles = statusFiles.filter((file) =>
		file.name.match(/\.(mp4|mkv|avi)$/i)
	);

	return {
		photoFiles,
		videoFiles,
	};
}
