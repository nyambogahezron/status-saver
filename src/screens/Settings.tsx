import React, { useState } from 'react';
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Linking,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useGlobalContext } from '@/content/GlobalContent';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '.';
// import * as Application from 'expo-application';

export default function Settings() {
	// State to track selected folders
	const [statusFolderSelected, setStatusFolderSelected] = useState(false);
	const [saveFolderSelected, setSaveFolderSelected] = useState(false);

	const { isPermissionGranted } = useGlobalContext();
	const navigation = useNavigation<NavigationProp<RootStackParamList>>();
	React.useEffect(() => {
		if (isPermissionGranted) {
			navigation.navigate('Home');
		}
	}, [isPermissionGranted]);

	// Get app version dynamically
	// const appVersion = Application.nativeApplicationVersion || '1.0.0';
	const appVersion = '1.0.0';

	// Developer Website URL
	const developerWebsite = 'https://nyambogahezron.me';

	return (
		<View style={styles.container}>
			<Text style={styles.header}>Settings</Text>

			{/* Select Folder to Load Statuses */}
			<TouchableOpacity
				style={[styles.button, statusFolderSelected && styles.buttonSelected]}
				onPress={() => {}}
			>
				<MaterialIcons name='folder-open' size={28} color='#FFF' />
				<Text style={styles.buttonText}>Set Status Folder</Text>
				{statusFolderSelected && (
					<MaterialIcons name='check' size={24} color='white' />
				)}
			</TouchableOpacity>

			{/* Select Folder to Save Statuses */}
			<TouchableOpacity
				style={[styles.button, saveFolderSelected && styles.buttonSelected]}
				onPress={() => {}}
			>
				<MaterialIcons name='save' size={28} color='#FFF' />
				<Text style={styles.buttonText}>Set Save Folder</Text>
				{saveFolderSelected && (
					<MaterialIcons name='check' size={24} color='white' />
				)}
			</TouchableOpacity>

			{/* App Version */}
			<View style={styles.infoContainer}>
				<Text style={styles.infoText}>App Version: {appVersion}</Text>
			</View>

			{/* Developer Website */}
			<TouchableOpacity
				style={styles.websiteButton}
				onPress={() => Linking.openURL(developerWebsite)}
			>
				<Text style={styles.websiteText}>Visit Developer Website</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F8F9FA',
		padding: 20,
		justifyContent: 'center',
		alignItems: 'center',
	},
	header: {
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 20,
		color: '#333',
	},
	button: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#007AFF',
		padding: 15,
		width: '90%',
		borderRadius: 10,
		marginBottom: 15,
		justifyContent: 'center',
		shadowColor: '#000',
		shadowOpacity: 0.1,
		shadowRadius: 5,
		elevation: 3,
	},
	buttonSelected: {
		backgroundColor: '#28A745',
	},
	buttonText: {
		color: '#FFF',
		fontSize: 18,
		marginLeft: 10,
		fontWeight: 'bold',
	},
	infoContainer: {
		marginTop: 20,
		backgroundColor: '#EFEFEF',
		padding: 10,
		borderRadius: 10,
		width: '90%',
		alignItems: 'center',
	},
	infoText: {
		fontSize: 16,
		color: '#333',
		fontWeight: 'bold',
	},
	websiteButton: {
		marginTop: 20,
		backgroundColor: '#FF5733',
		padding: 15,
		borderRadius: 10,
		width: '90%',
		alignItems: 'center',
	},
	websiteText: {
		color: '#FFF',
		fontSize: 18,
		fontWeight: 'bold',
	},
});
