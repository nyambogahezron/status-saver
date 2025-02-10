import {
	View,
	Text,
	ScrollView,
	StyleSheet,
	Alert,
	TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import CustomButton from '@/components/ui/CustomButton';
import { Colors } from '@/constants/Colors';
import { StorageAccessFramework } from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import DocumentPicker from 'react-native-document-picker';
import StatusItem from '@/components/ui/StatusItem';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen() {
	const [photoFiles, setPhotoFiles] = React.useState<
		{ uri: string; name: string }[]
	>([]);
	const [videoFiles, setVideoFiles] = React.useState<
		{ uri: string; name: string }[]
	>([]);
	const [audioFiles, setAudioFiles] = React.useState<
		{ uri: string; name: string }[]
	>([]);
	const [activeTab, setActiveTab] = useState('Images');

	const requestPermissions = async () => {
		const { status } = await MediaLibrary.requestPermissionsAsync();
		if (status !== 'granted') {
			Alert.alert(
				'Permission Denied',
				'You need to grant storage permission to access statuses.'
			);
		}
	};

	const loadStoredFolder = async () => {
		try {
			const storedUri = await AsyncStorage.getItem('statusFolderUri');
			if (storedUri) {
				const files = await StorageAccessFramework.readDirectoryAsync(
					storedUri
				);

				const statusFiles = files
					.map((fileUri) => ({
						uri: fileUri,
						name: fileUri.split('/').pop() || '',
					}))
					.filter((file) => file.name);

				const photoFiles = statusFiles.filter((file) =>
					file.name.match(/\.(jpg|jpeg|png)$/i)
				);
				const videoFiles = statusFiles.filter((file) =>
					file.name.match(/\.(mp4|mkv|avi)$/i)
				);
				const audioFiles = statusFiles.filter((file) =>
					file.name.match(/\.(mp3|wav|m4a)$/i)
				);
				setPhotoFiles(photoFiles);
				setVideoFiles(videoFiles);
				setAudioFiles(audioFiles);
			}
		} catch (error) {
			console.error('Error loading stored folder:', error);
		}
	};

	React.useEffect(() => {
		requestPermissions();
		loadStoredFolder();
	}, []);

	const selectWhatsAppStatusFolder = async () => {
		try {
			const permissions =
				await StorageAccessFramework.requestDirectoryPermissionsAsync();
			if (permissions.granted) {
				const uri = permissions.directoryUri;
				await AsyncStorage.setItem('statusFolderUri', uri);
				const files = await StorageAccessFramework.readDirectoryAsync(uri);

				const statusFiles = files
					.map((fileUri) => ({
						uri: fileUri,
						name: fileUri.split('/').pop() || '',
					}))
					.filter((file) => file.name);

				const photoFiles = statusFiles.filter((file) =>
					file.name.match(/\.(jpg|jpeg|png)$/i)
				);
				const videoFiles = statusFiles.filter((file) =>
					file.name.match(/\.(mp4|mkv|avi)$/i)
				);
				const audioFiles = statusFiles.filter((file) =>
					file.name.match(/\.(mp3|wav|m4a)$/i)
				);
				setPhotoFiles(photoFiles);
				setVideoFiles(videoFiles);
				setAudioFiles(audioFiles);
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
			<View style={styles.tabContainer}>
				<TouchableOpacity
					onPress={() => setActiveTab('Images')}
					style={[styles.tab, activeTab === 'Images' && styles.activeTab]}
				>
					<Text style={styles.tabText}>Images</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => setActiveTab('Videos')}
					style={[styles.tab, activeTab === 'Videos' && styles.activeTab]}
				>
					<Text style={styles.tabText}>Videos</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => setActiveTab('Audio')}
					style={[styles.tab, activeTab === 'Audio' && styles.activeTab]}
				>
					<Text style={styles.tabText}>Audio</Text>
				</TouchableOpacity>
			</View>
			<View style={{ marginTop: 15 }}>
				{activeTab === 'Images' &&
					(photoFiles.length > 0 ? (
						<StatusItem status={photoFiles} />
					) : (
						<Text>No photo files found</Text>
					))}
				{activeTab === 'Videos' &&
					(videoFiles.length > 0 ? (
						<StatusItem status={videoFiles} />
					) : (
						<Text>No video files found</Text>
					))}
				{activeTab === 'Audio' &&
					(audioFiles.length > 0 ? (
						<StatusItem status={audioFiles} />
					) : (
						<Text>No audio files found</Text>
					))}
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.white,
	},
	tabContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginTop: 15,
	},
	tab: {
		padding: 10,
		borderBottomWidth: 2,
		borderBottomColor: 'transparent',
	},
	activeTab: {
		borderBottomColor: Colors.primaryColor,
	},
	tabText: {
		fontSize: 16,
		color: Colors.primaryColor,
	},
});
