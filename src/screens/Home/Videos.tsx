import React from 'react';
import { StyleSheet, View } from 'react-native';
import StatusItem from '@/components/ui/StatusItem';
import { Colors } from '@/constants/Colors';
import { useGlobalContext } from '@/content/GlobalContent';

export default function Videos() {
	const { videoStatus } = useGlobalContext();

	return (
		<View style={styles.container}>
			<StatusItem status={videoStatus} statusType='video' />
		</View>
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
