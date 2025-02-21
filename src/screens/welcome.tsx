import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '.';
import { Colors } from '@/constants/Colors';
import { selectWhatsAppStatusFolder } from '@/utils/media-access';
import { useGlobalContext } from '@/content/GlobalContent';
import { SelectSavedFolder } from '@/utils/save-files';

export default function WelcomeScreen() {
	const navigation = useNavigation<NavigationProp<RootStackParamList>>();
	const { setIsPermissionGranted, isPermissionGranted } = useGlobalContext();
	const [statusFolderSelected, setStatusFolderSelected] = React.useState(false);
	const [saveFolderSelected, setSaveFolderSelected] = React.useState(false);

	console.log(isPermissionGranted);

	React.useEffect(() => {
		if (isPermissionGranted) {
			navigation.navigate('Home');
		}
	}, [isPermissionGranted]);

	const handleStatusFolderSelection = async () => {
		const isFolderSelected = await selectWhatsAppStatusFolder();
		if (isFolderSelected) {
			setStatusFolderSelected(true);
		}
	};

	const handleSaveFolderSelection = async () => {
		const isFolderSelected = await SelectSavedFolder();
		if (isFolderSelected) {
			setSaveFolderSelected(true);
		}
	};

	// Check if both folders are selected
	const allFoldersSelected = statusFolderSelected && saveFolderSelected;

	if (allFoldersSelected) {
		setIsPermissionGranted(true);
	}

	return (
		<View style={styles.container}>
			<Text style={styles.header}>Welcome to Status Saver</Text>
			<Text style={styles.subHeader}>
				Choose folders to load and save WhatsApp statuses. NOTE : Folder are
				pre-select for you, for better experience.
			</Text>

			{/* Select Folder to Load Statuses */}
			<TouchableOpacity
				style={[styles.button, statusFolderSelected && styles.buttonSelected]}
				onPress={() => handleStatusFolderSelection()}
			>
				<View style={{ flexDirection: 'row', alignItems: 'center' }}>
					<MaterialIcons name='folder-open' size={28} color={Colors.white} />
					<Text style={styles.buttonText}>Select Status Folder</Text>
				</View>
				{statusFolderSelected && (
					<MaterialIcons name='check' size={24} color={Colors.white} />
				)}
			</TouchableOpacity>

			{/* Select Folder to Save Statuses */}
			<TouchableOpacity
				style={[styles.button, saveFolderSelected && styles.buttonSelected]}
				onPress={() => handleSaveFolderSelection()}
			>
				<View style={{ flexDirection: 'row', alignItems: 'center' }}>
					<MaterialIcons name='save' size={28} color={Colors.white} />
					<Text style={styles.buttonText}>Select Save Folder</Text>
				</View>
				{saveFolderSelected && (
					<MaterialIcons name='check' size={24} color={Colors.white} />
				)}
			</TouchableOpacity>

			{/* Continue Button - Only visible when both folders are selected */}
			{allFoldersSelected && (
				<TouchableOpacity
					style={styles.continueButton}
					onPress={() => navigation.navigate('Home')}
				>
					<Text style={styles.continueText}>Continue to Home</Text>
				</TouchableOpacity>
			)}
			{/* UserAgreement */}
			<TouchableOpacity
				style={styles.agreement}
				onPress={() => navigation.navigate('UserAgreement')}
			>
				<Text style={styles.agreementText}>By continuing you agree to our</Text>
				<Text
					style={[
						styles.agreementText,
						{
							color: Colors.green,
							textDecorationStyle: 'solid',
							textDecorationLine: 'underline',
						},
					]}
				>
					User Agreement
				</Text>
			</TouchableOpacity>

			{/* Help Page Link */}
			<TouchableOpacity
				style={styles.helpButton}
				onPress={() => navigation.navigate('Help')}
			>
				<Text style={styles.helpText}>Need Help?</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.greenLight,
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 15,
	},
	header: {
		fontSize: 24,
		fontWeight: 'bold',
		fontFamily: 'Rb-Bold',
		marginBottom: 30,
		color: Colors.black2,
	},
	subHeader: {
		fontSize: 16,
		lineHeight: 22,
		color: Colors.black3,
		fontWeight: 'bold',
		fontFamily: 'Rb-Medium',
		marginBottom: 30,
		textAlign: 'center',
	},
	button: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: Colors.primaryColor,
		padding: 13,
		width: '90%',
		borderRadius: 10,
		marginBottom: 15,
		justifyContent: 'space-around',
		shadowColor: Colors.green,
		shadowOpacity: 0.1,
		shadowRadius: 5,
		elevation: 3,
	},
	buttonSelected: {
		backgroundColor: Colors.green,
	},
	buttonText: {
		color: '#FFF',
		fontSize: 18,
		marginLeft: 10,
		fontWeight: 'bold',
	},
	helpButton: {
		marginTop: 20,
	},
	helpText: {
		fontSize: 16,
		color: Colors.blue,
		fontWeight: 'bold',
	},
	continueButton: {
		marginTop: 20,
		backgroundColor: Colors.green,
		padding: 15,
		borderRadius: 10,
		width: '90%',
		alignItems: 'center',
	},
	continueText: {
		color: '#FFF',
		fontSize: 18,
		fontWeight: 'bold',
	},
	agreement: {
		marginTop: 20,
		flexDirection: 'row',
		gap: 5,
		justifyContent: 'center',
		alignItems: 'center',
	},
	agreementText: { color: '#007AFF', fontSize: 14, fontWeight: 'bold' },
});
