import React from 'react';
import {
	View,
	Text,
	ScrollView,
	StyleSheet,
	TouchableOpacity,
	Linking,
	useColorScheme,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function UserAgreementScreen() {
	const developerEmail = 'mailto:support@nyambogahezron.me';
	const websiteUrl = 'https://nyambogahezron.me';

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<Text style={styles.header}>📜 User Agreement & Privacy Policy</Text>

			{/* Introduction */}
			<View style={styles.section}>
				<Text style={styles.sectionTitle}>🔹 1. Introduction</Text>
				<Text style={styles.text}>
					By using **WhatsApp Status Saver**, you agree to the terms outlined
					below. This app respects your privacy and ensures secure data
					handling.
				</Text>
			</View>

			{/* Permissions */}
			<View style={styles.section}>
				<Text style={styles.sectionTitle}>🔒 2. Permissions & Data Access</Text>
				<Text style={styles.text}>
					To function properly, this app requires the following permissions:
				</Text>
				<Text style={styles.listItem}>
					✅ **Storage** – To save statuses on your device.
				</Text>
				<Text style={styles.listItem}>
					✅ **Media Library** – To view and manage saved statuses.
				</Text>
			</View>

			{/* Data Privacy */}
			<View style={styles.section}>
				<Text style={styles.sectionTitle}>🔹 3. Data Collection & Usage</Text>
				<Text style={styles.text}>
					We prioritize your privacy. **This app does NOT collect, track, or
					share your data.** All statuses are stored **locally** on your device
					and never uploaded to external servers.
				</Text>
			</View>

			{/* Third-Party Services */}
			<View style={styles.section}>
				<Text style={styles.sectionTitle}>🔹 4. Third-Party Services</Text>
				<Text style={styles.text}>
					This app relies on third-party libraries like **Expo & React Native**
					for functionality. However, **we do not share your data** with third
					parties.
				</Text>
			</View>

			{/* Usage Guidelines */}
			<View style={styles.section}>
				<Text style={styles.sectionTitle}>⚠️ 5. Usage Restrictions</Text>
				<Text style={styles.text}>To maintain ethical use, you must NOT:</Text>
				<Text style={styles.listItem}>
					❌ Use this app for unauthorized content sharing.
				</Text>
				<Text style={styles.listItem}>
					❌ Violate WhatsApp's terms of service.
				</Text>
				<Text style={styles.listItem}>
					❌ Engage in illegal activities using this app.
				</Text>
			</View>

			{/* Disclaimer */}
			<View style={styles.section}>
				<Text style={styles.sectionTitle}>📢 6. Disclaimer & Liability</Text>
				<Text style={styles.text}>
					- **This app is NOT affiliated with WhatsApp Inc.**{'\n'}- The
					developer is **not responsible** for misuse of this application.
				</Text>
			</View>

			{/* Policy Updates */}
			<View style={styles.section}>
				<Text style={styles.sectionTitle}>🔄 7. Policy Updates</Text>
				<Text style={styles.text}>
					We may update this policy periodically. By continuing to use the app,
					you agree to any modifications.
				</Text>
			</View>

			{/* Contact Information */}
			<View style={styles.section}>
				<Text style={styles.sectionTitle}>📧 8. Contact & Support</Text>
				<Text style={styles.text}>
					For questions or support, contact us via:{' '}
				</Text>
				<TouchableOpacity onPress={() => Linking.openURL(developerEmail)}>
					<Text style={styles.linkText}>support@nyambogahezron.me</Text>
				</TouchableOpacity>
				<Text style={styles.text}>Or visit our website:</Text>
				<TouchableOpacity onPress={() => Linking.openURL(websiteUrl)}>
					<Text style={styles.linkText}>{websiteUrl}</Text>
				</TouchableOpacity>
			</View>

			{/* Back Button */}
			<TouchableOpacity style={styles.backButton} onPress={() => {}}>
				<Ionicons name='arrow-back' size={20} color='#FFF' />
				<Text style={styles.backButtonText}>Go Back</Text>
			</TouchableOpacity>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		padding: 20,
		backgroundColor: '#FFF',
	},
	header: {
		fontSize: 24,
		fontWeight: 'bold',
		textAlign: 'center',
		color: '#333',
		marginBottom: 20,
	},
	section: {
		marginBottom: 20,
		padding: 15,
		borderRadius: 10,
		backgroundColor: '#F8F8F8',
	},
	sectionTitle: {
		fontSize: 18,
		fontWeight: 'bold',
		color: '#007AFF',
	},
	text: {
		fontSize: 16,
		color: '#555',
		marginTop: 5,
		lineHeight: 22,
	},
	listItem: {
		fontSize: 16,
		color: '#333',
		marginLeft: 10,
		marginTop: 5,
	},
	linkText: {
		color: '#007AFF',
		fontWeight: 'bold',
		marginTop: 5,
	},
	backButton: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#007AFF',
		padding: 15,
		borderRadius: 10,
		marginTop: 20,
	},
	backButtonText: {
		color: '#FFF',
		fontSize: 18,
		fontWeight: 'bold',
		marginLeft: 10,
	},
});
