import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import StatusItem from '@/components/ui/StatusItem';
import { Colors } from '@/constants/Colors';
import { useGlobalContext } from '@/content/GlobalContent';

export default function Saved() {
	const { savedImageStatus } = useGlobalContext();

	return (
		<ScrollView style={styles.container}>
			<StatusItem status={savedImageStatus} statusType='image' />
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		height: '100%',
		width: '100%',
		paddingBottom: 100,
		marginTop: 2,
		backgroundColor: Colors.greenLight,
	},
});
