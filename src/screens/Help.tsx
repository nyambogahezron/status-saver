import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

export default function Help() {
	return (
		<ScrollView contentContainerStyle={styles.container}>
			<Text style={styles.header}>How to Set Up Status Saver</Text>
			{[
				{
					icon: 'folder' as 'folder',
					text: 'Open the app and **go to Settings**.',
				},
				{
					icon: 'storage' as 'storage',
					text: 'Tap on **"Select Status Folder"** to choose where WhatsApp statuses are stored.',
				},
				{
					icon: 'folder-open' as 'folder-open',
					text: 'When prompted, select: **📂 `Android/media/com.whatsapp/WhatsApp/Media/.Statuses`**',
				},
				{
					icon: 'check-circle' as 'check-circle',
					text: 'Confirm access by tapping **"Allow"** when requested.',
				},
			].map((step, index) => (
				<View key={index} style={styles.stepContainer}>
					<MaterialIcons name={step.icon} size={28} color={Colors.green} />
					<View style={styles.textContainer}>
						<Text style={styles.stepNumber}>Step {index + 1}:</Text>
						<Text style={styles.stepText}>{step.text}</Text>
					</View>
				</View>
			))}

			{/* Section 2: Selecting Save Folder */}
			<Text style={styles.subHeader}>Selecting Folder to Save Statuses</Text>
			{[
				{
					icon: 'folder' as 'folder',
					text: 'Go to **Settings → Save Folder**.',
				},
				{
					icon: 'folder-open' as 'folder-open',
					text: 'Tap **"Choose Save Location"** and select a folder.',
				},
				{
					icon: 'check-circle' as 'check-circle',
					text: 'Confirm your selection by tapping **"Save"**.',
				},
			].map((step, index) => (
				<View key={index} style={styles.stepContainer}>
					<MaterialIcons name={step.icon} size={28} color={Colors.green} />
					<View style={styles.textContainer}>
						<Text style={styles.stepNumber}>Step {index + 1}:</Text>
						<Text style={styles.stepText}>{step.text}</Text>
					</View>
				</View>
			))}
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		padding: 10,
		backgroundColor: Colors.greenLight,
	},
	header: {
		fontSize: 22,
		fontWeight: 'bold',
		fontFamily: 'Rb-Bold',
		marginBottom: 10,
		textAlign: 'center',
		color: Colors.black2,
	},
	subHeader: {
		fontSize: 20,
		fontWeight: 'bold',
		marginTop: 20,
		marginBottom: 10,
		marginLeft: 10,
		color: Colors.blue,
	},
	stepContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: Colors.white,
		padding: 15,
		marginBottom: 10,
		borderRadius: 10,
		shadowColor: Colors.black,
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
		color: Colors.blue,
	},
	stepText: {
		fontSize: 16,
		color: Colors.black2,
	},
});
