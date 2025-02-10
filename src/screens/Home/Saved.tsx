import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import StatusItem from '@/components/ui/StatusItem';
import { Colors } from '@/constants/Colors';
import { useStatusDataStore } from '@/store';

export default function Saved() {
	const statusData = useStatusDataStore((state) => state.statusData);

	return (
		<ScrollView style={styles.container}>
			<StatusItem status={statusData.photoFiles} statusType='image' />
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
