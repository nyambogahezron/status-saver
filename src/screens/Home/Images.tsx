import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import StatusItem from '@/components/ui/StatusItem';
import { Colors } from '@/constants/Colors';
import { useGlobalContext } from '@/content/GlobalContent';

export default function Images() {
	const { imageStatus } = useGlobalContext();
	// console.log('imageStatus from global', imageStatus);

	return (
		<ScrollView style={styles.container}>
			<StatusItem status={imageStatus} statusType='image' />
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
