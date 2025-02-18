import { StyleSheet, Text, View, Flatlist } from 'react-native';
import React from 'react';

import { Colors } from '@/constants/Colors';

type StatusCardProps = {
	data: any[];
	statusType: 'image' | 'video' | 'audio';
	renderItem: (
		item: any,
		index: number,
		statusType: 'image' | 'video' | 'audio'
	) => React.ReactElement | null;
};

export default function StatusListComponent({
	data,
	renderItem,
	statusType,
}: StatusCardProps) {
	return (
		<View style={styles.container}>
			<FileList
				data={data}
				renderItem={({ item, index }) => renderItem(item, index, statusType)}
				estimatedItemSize={100}
				numColumns={3}
				ListEmptyComponent={
					<View style={styles.emptyContainer}>
						<Text style={styles.emptyText}>
							No {statusType === 'image' ? 'images' : statusType} found!
						</Text>
					</View>
				}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: '100%',
		padding: 2,
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignContent: 'center',
		justifyContent: 'flex-start',
		gap: 2,
	},
	emptyContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'center',
	},
	emptyText: {
		marginTop: '50%',
		fontSize: 20,
		color: Colors.black3,
		fontFamily: 'Rb-Bold',
	},
});
