import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function Help() {
	return (
		<ScrollView contentContainerStyle={styles.container}>
			<Text style={styles.header}>How to Set Up Status Saver</Text>

			{/* Section 1: Selecting WhatsApp Status Folder */}
			<Text style={styles.subHeader}>📍 Selecting WhatsApp Status Folder</Text>

			{/* Step 1 */}
			<View style={styles.stepContainer}>
				<MaterialIcons name='folder' size={28} color='#007AFF' />
				<View style={styles.textContainer}>
					<Text style={styles.stepNumber}>Step 1:</Text>
					<Text style={styles.stepText}>
						Open the app and **go to Settings**.
					</Text>
				</View>
			</View>

			{/* Step 2 */}
			<View style={styles.stepContainer}>
				<MaterialIcons name='storage' size={28} color='#007AFF' />
				<View style={styles.textContainer}>
					<Text style={styles.stepNumber}>Step 2:</Text>
					<Text style={styles.stepText}>
						Tap on **"Select Status Folder"** to choose where WhatsApp statuses
						are stored.
					</Text>
				</View>
			</View>

			{/* Step 3 */}
			<View style={styles.stepContainer}>
				<MaterialIcons name='folder-open' size={28} color='#007AFF' />
				<View style={styles.textContainer}>
					<Text style={styles.stepNumber}>Step 3:</Text>
					<Text style={styles.stepText}>
						When prompted, select: **📂
						`Android/media/com.whatsapp/WhatsApp/Media/.Statuses`**
					</Text>
				</View>
			</View>

			{/* Step 4 */}
			<View style={styles.stepContainer}>
				<MaterialIcons name='check-circle' size={28} color='#007AFF' />
				<View style={styles.textContainer}>
					<Text style={styles.stepNumber}>Step 4:</Text>
					<Text style={styles.stepText}>
						Confirm access by tapping **"Allow"** when requested.
					</Text>
				</View>
			</View>

			{/* Section 2: Selecting Save Folder */}
			<Text style={styles.subHeader}>💾 Selecting Folder to Save Statuses</Text>

			{/* Step 1 */}
			<View style={styles.stepContainer}>
				<MaterialIcons name='settings' size={28} color='#007AFF' />
				<View style={styles.textContainer}>
					<Text style={styles.stepNumber}>Step 1:</Text>
					<Text style={styles.stepText}>Go to **Settings → Save Folder**.</Text>
				</View>
			</View>

			{/* Step 2 */}
			<View style={styles.stepContainer}>
				<MaterialIcons name='folder' size={28} color='#007AFF' />
				<View style={styles.textContainer}>
					<Text style={styles.stepNumber}>Step 2:</Text>
					<Text style={styles.stepText}>
						Tap **"Choose Save Location"** and select a folder.
					</Text>
				</View>
			</View>

			{/* Step 3 */}
			<View style={styles.stepContainer}>
				<MaterialIcons name='save' size={28} color='#007AFF' />
				<View style={styles.textContainer}>
					<Text style={styles.stepNumber}>Step 3:</Text>
					<Text style={styles.stepText}>
						Confirm your selection by tapping **"Save"**.
					</Text>
				</View>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		padding: 20,
		backgroundColor: '#F8F9FA',
	},
	header: {
		fontSize: 22,
		fontWeight: 'bold',
		marginBottom: 20,
		textAlign: 'center',
		color: '#333',
	},
	subHeader: {
		fontSize: 20,
		fontWeight: 'bold',
		marginTop: 20,
		marginBottom: 10,
		color: '#007AFF',
	},
	stepContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#FFF',
		padding: 15,
		marginBottom: 10,
		borderRadius: 10,
		shadowColor: '#000',
		shadowOpacity: 0.1,
		shadowRadius: 5,
		elevation: 3,
	},
	textContainer: {
		marginLeft: 15,
		flex: 1,
	},
	stepNumber: {
		fontSize: 18,
		fontWeight: 'bold',
		color: '#007AFF',
	},
	stepText: {
		fontSize: 16,
		color: '#555',
	},
});
