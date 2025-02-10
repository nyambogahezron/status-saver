import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import StatusItem from '@/components/ui/StatusItem';
import { Colors } from '@/constants/Colors';
import { useStatusDataStore } from '@/store';

export default function Videos() {
	const statusData = useStatusDataStore((state) => state.statusData);

	return (
		<ScrollView style={styles.container}>
			<StatusItem status={statusData.videoFiles} statusType='video' />
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
