// import { View, Button, Alert } from 'react-native';
// import * as FileSystem from 'expo-file-system';

// const App = () => {
//   const copyFile = async () => {
//     const sourcePath = ${FileSystem.documentDirectory}sourceFolder/myfile.txt; // Path to the source file
//     const destinationPath = ${FileSystem.documentDirectory}destinationFolder/myfile.txt; // Path to the destination file

//     try {
//       // Check if the source file exists
//       const fileInfo = await FileSystem.getInfoAsync(sourcePath);
//       if (!fileInfo.exists) {
//         Alert.alert('Error', 'Source file does not exist.');
//         return;
//       }

//       // Create the destination folder if it doesn't exist
//       const destinationFolder = ${FileSystem.documentDirectory}destinationFolder;
//       const folderInfo = await FileSystem.getInfoAsync(destinationFolder);
//       if (!folderInfo.exists) {
//         await FileSystem.makeDirectoryAsync(destinationFolder, { intermediates: true });
//       }

//       // Copy the file
//       await FileSystem.copyAsync({ from: sourcePath, to: destinationPath });
//       Alert.alert('Success', 'File copied successfully!');
//     } catch (error) {
//       Alert.alert('Error', Failed to copy file: ${error.message});
//     }
//   };

// };

// export default App;
