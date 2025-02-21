import React from 'react';
import {
	StyleSheet,
	Text,
	View,
	FlatList,
	ActivityIndicator,
	Dimensions,
} from 'react-native';
import { Colors } from '@/constants/Colors';
import { useGlobalContext } from '@/content/GlobalContent';

const width = Dimensions.get('window').width;

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
	const { fetchSavedStatus, fetchStatus } = useGlobalContext();
	const [isLoading, setIsLoading] = React.useState(false);

	async function onRefresh() {
		setIsLoading(true);
		if (statusType === 'image' || statusType === 'video') {
			fetchStatus?.();
		} else {
			fetchSavedStatus?.();
		}
		setIsLoading(false);
	}

	return (
		<View>
			{isLoading ? (
				<View style={styles.loader}>
					<ActivityIndicator
						size={50}
						color={Colors.greenLight2}
						style={styles.loadingIndicator}
					/>
				</View>
			) : (
				<FlatList
					style={{
						width: width,
					}}
					onRefresh={onRefresh}
					refreshing={false}
					contentContainerStyle={{
						marginTop: 2,
						backgroundColor: Colors.greenLight,
						alignContent: 'center',
						justifyContent: 'flex-start',
					}}
					data={data}
					renderItem={({ item, index }) => renderItem(item, index, statusType)}
					numColumns={3}
					ListEmptyComponent={
						<View style={styles.emptyContainer}>
							<Text style={styles.emptyText}>
								No {statusType === 'image' ? 'images' : statusType} found!
							</Text>
						</View>
					}
				/>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
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
	loader: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: '50%',
	},
	loadingIndicator: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
