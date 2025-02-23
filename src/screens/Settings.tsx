import React, { useState } from 'react';
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Linking,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
// import * as Application from 'expo-application';

export default function Settings() {
	// State to track selected folders
	const [statusFolderSelected, setStatusFolderSelected] = useState(false);
	const [saveFolderSelected, setSaveFolderSelected] = useState(false);

	// Get app version dynamically
	// const appVersion = Application.nativeApplicationVersion || '1.0.0';
	const appVersion = '1.0.0';

	// Developer Website URL
	const developerWebsite = 'https://nyambogahezron.me';

	return (
		<View style={styles.container}>
			<View style={{ marginTop: 50, width: '100%', alignItems: 'center' }}>
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
			</View>

			{/* App Version */}
			<View style={styles.infoContainer}>
				<Text style={styles.infoText}>App Version: {appVersion}</Text>
				{/* Developer Website */}
				<TouchableOpacity
					style={styles.websiteButton}
					onPress={() => Linking.openURL(developerWebsite)}
				>
					<Text style={styles.websiteText}>View Developer</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		position: 'relative',
		backgroundColor: Colors.greenLight,
		alignItems: 'center',
	},

	button: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: Colors.blue,
		padding: 15,
		width: '90%',
		borderRadius: 10,
		marginBottom: 15,
		justifyContent: 'center',
		shadowColor: Colors.black,
		shadowOpacity: 0.1,
		shadowRadius: 5,
		elevation: 3,
	},
	buttonSelected: {
		backgroundColor: Colors.green,
	},
	buttonText: {
		color: Colors.white,
		fontSize: 18,
		marginLeft: 10,
		fontWeight: 'bold',
	},
	infoContainer: {
		position: 'absolute',
		bottom: 0,
		width: '100%',
		alignItems: 'center',
		paddingVertical: 10,
		paddingHorizontal: 20,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	infoText: {
		fontSize: 12,
		color: Colors.blue,
		fontWeight: 'bold',
	},
	websiteButton: {
		alignItems: 'center',
	},
	websiteText: {
		color: Colors.blue,
		fontSize: 12,
		fontWeight: 'bold',
	},
});
