import RNFS from 'react-native-fs';
import { PermissionsAndroid, Platform } from 'react-native';

async function requestStoragePermission() {
  if (Platform.OS === 'android') {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      {
        title: 'Storage Permission',
        message:
          'This app needs access to your storage to read WhatsApp statuses.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      }
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  }
  return true;
}

export async function loadStatusFiles() {
  const hasPermission = await requestStoragePermission();
  if (!hasPermission) {
    throw new Error('Storage permission denied');
  }

  const statusFolderPath =
    '/storage/emulated/0/Android/media/com.whatsapp/WhatsApp/Media/.Statuses';

  try {
    const files = await RNFS.readDir(statusFolderPath);
    return files
      .filter((file) => /\.(jpg|jpeg|png|mp4)$/i.test(file.name))
      .map((file) => file.path);
  } catch (err) {
    console.error('Error reading status folder:', err);
    throw err;
  }
}
