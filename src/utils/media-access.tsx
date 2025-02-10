// import { PermissionsAndroid, Platform } from 'react-native';
// import RNFS from 'react-native-fs';

// async function requestStoragePermission() {
//   if (Platform.OS === 'android') {
//     try {
//       const readGranted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
//         {
//           title: 'Storage Permission',
//           message:
//             'App needs access to your storage to read WhatsApp statuses.',
//           buttonNeutral: 'Ask Me Later',
//           buttonNegative: 'Cancel',
//           buttonPositive: 'OK',
//         }
//       );

//       const writeGranted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
//         {
//           title: 'Storage Permission',
//           message:
//             'App needs access to your storage to save WhatsApp statuses.',
//           buttonNeutral: 'Ask Me Later',
//           buttonNegative: 'Cancel',
//           buttonPositive: 'OK',
//         }
//       );

//       return (
//         readGranted === PermissionsAndroid.RESULTS.GRANTED &&
//         writeGranted === PermissionsAndroid.RESULTS.GRANTED
//       );
//     } catch (err) {
//       console.warn(err);
//       return false;
//     }
//   }
//   return true; // For iOS, permissions are handled differently.
// }

// export async function loadWhatsAppStatuses() {
//   const hasPermission = await requestStoragePermission();
//   if (!hasPermission) {
//     throw new Error('Storage permission denied');
//   }

//   // Path to WhatsApp statuses
//   const statusFolderPath =
//     '/storage/emulated/0/Android/media/com.whatsapp/WhatsApp/Media/.Statuses';
//   const newFolderPath = '/storage/emulated/0/WhatsAppStatuses';

//   try {
//     // Check if the new folder exists, if not create it
//     const newFolderExists = await RNFS.exists(newFolderPath);
//     if (!newFolderExists) {
//       try {
//         await RNFS.mkdir(newFolderPath);
//       } catch (mkdirError) {
//         console.error('Error creating new folder:', mkdirError);
//         throw new Error('Directory could not be created');
//       }
//     }

//     // Read the directory
//     const files = await RNFS.readDir(statusFolderPath);

//     // Move and rename files
//     const movedFiles = await Promise.all(
//       files.map(async (file) => {
//         const newFilePath = `${newFolderPath}/${file.name}`;
//         await RNFS.moveFile(file.path, newFilePath);
//         return newFilePath;
//       })
//     );

//     return movedFiles;
//   } catch (error) {
//     console.error('Error processing WhatsApp status folder:', error);
//     throw error;
//   }
// }

// async function getStatusFiles() {
//   const statusFolderPath = '/storage/emulated/0/Statuses';

//   try {
//     // Check if the folder exists
//     const folderExists = await RNFS.exists(statusFolderPath);
//     console.log('dev Folder exists:', folderExists);

//     if (folderExists) {
//       const files = await RNFS.readDir(statusFolderPath);
//       console.log('Files in folder:', files);

//       // Filter for files only (ignore directories)
//       const statusFiles = files;
//       console.log('dev:', statusFiles);

//       return statusFiles.map((file) => file.path); // Return paths of the files
//     } else {
//       console.log('dev Folder does not exist');
//       return [];
//     }
//   } catch (error) {
//     console.error('Error reading WhatsApp status folder:', error);
//     return [];
//   }
// }

// // getStatusFiles();
