import { Colors } from '@/constants/Colors';
import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '@/screens';

export default function CustomHeader() {
	const navigation = useNavigation<NavigationProp<RootStackParamList>>();
	const [dropdownVisible, setDropdownVisible] = useState(false);

	const toggleDropdown = () => {
		setDropdownVisible(!dropdownVisible);
	};

	return (
		<View style={styles.header}>
			<TouchableOpacity onPress={() => navigation.goBack()}>
				<Entypo
					name='chevron-left'
					size={20}
					color='white'
					style={styles.icon}
				/>
			</TouchableOpacity>
			<Text style={styles.headerText}>Status Saver</Text>
			<TouchableOpacity onPress={toggleDropdown}>
				<Entypo
					name={dropdownVisible ? 'cross' : 'dots-three-vertical'}
					size={20}
					color='black'
					style={styles.icon}
				/>
			</TouchableOpacity>
			{dropdownVisible && (
				<View style={styles.dropdownMenu}>
					<TouchableOpacity
						onPress={() => navigation.navigate('Help')}
						style={styles.menuItem}
					>
						<Text style={styles.menuText}>Help</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => navigation.navigate('Settings')}
						style={styles.menuItem}
					>
						<Text style={styles.menuText}>Settings</Text>
					</TouchableOpacity>
				</View>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	header: {
		backgroundColor: Colors.primaryColor,
		paddingVertical: 10,
		paddingHorizontal: 20,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	headerText: {
		color: 'white',
		fontSize: 22,
		lineHeight: 30,
		fontWeight: '600',
		fontFamily: 'Rb-Bold',
	},
	icon: {
		color: 'white',
		fontSize: 20,
		right: -5,
	},
	dropdownMenu: {
		position: 'absolute',
		width: 120,
		top: 40,
		right: 20,
		backgroundColor: 'white',
		borderRadius: 5,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.8,
		shadowRadius: 2,
		elevation: 5,
		zIndex: 1,
	},
	menuItem: {
		padding: 10,
		borderBottomWidth: 1,
		borderBottomColor: '#ccc',
	},
	menuText: {
		color: Colors.black2,
		fontFamily: 'Rb-Regular',
	},
});
