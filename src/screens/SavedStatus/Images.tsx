import { View, Text, ScrollView, StyleSheet, Alert } from 'react-native';
import React from 'react';
import CustomButton from '@/components/ui/CustomButton';
import { Colors } from '@/constants/Colors';
import { StorageAccessFramework } from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import DocumentPicker from 'react-native-document-picker';

import StatusItem from '@/components/ui/StatusItem';
import { useImageStatusStore } from '@/store';

export default function Images() {
	const statusData = useImageStatusStore((state) => state.imagesStatus);
	const storeStatusData = useImageStatusStore((state) => state.addImageStatus);

	const [statusFiles, setStatusFiles] = React.useState<
		{ uri: string; name: string }[]
	>([]);
	const [photoFiles, setPhotoFiles] = React.useState<
		{ uri: string; name: string }[]
	>([]);

	const requestPermissions = async () => {
		const { status } = await MediaLibrary.requestPermissionsAsync();
		if (status !== 'granted') {
			Alert.alert(
				'Permission Denied',
				'You need to grant storage permission to access statuses.'
			);
		}
	};

	React.useEffect(() => {
		requestPermissions();
	}, []);

	const selectWhatsAppStatusFolder = async () => {
		try {
			const permissions =
				await StorageAccessFramework.requestDirectoryPermissionsAsync();
			if (permissions.granted) {
				const uri = permissions.directoryUri;
				const files = await StorageAccessFramework.readDirectoryAsync(uri);

				const statusFiles = files
					.map((fileUri) => ({
						uri: fileUri,
						name: fileUri.split('/').pop() || '',
					}))
					.filter((file) => file.name);
				setStatusFiles(statusFiles);

				const photoFiles = statusFiles.filter((file) =>
					file.name.match(/\.(jpg|jpeg|png)$/i)
				);
				setPhotoFiles(photoFiles);
				// storeStatusData(photoFiles);
			} else {
				console.log('User cancelled folder selection');
			}
		} catch (error) {
			if (DocumentPicker.isCancel(error)) {
				console.log('User cancelled folder selection');
			} else {
				console.error('Error selecting folder:', error);
			}
		}
	};

	return (
		<ScrollView style={styles.container}>
			<CustomButton
				title='Select WhatsApp Status Folder'
				onPress={selectWhatsAppStatusFolder}
				customStyle={{ marginTop: 15, width: '95%', alignSelf: 'center' }}
			/>
			<View style={{ marginTop: 15 }}>
				{photoFiles.length > 0 ? (
					<StatusItem status={photoFiles} />
				) : (
					<Text>No photo files found</Text>
				)}
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.white,
	},
});
