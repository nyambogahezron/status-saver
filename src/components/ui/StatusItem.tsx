import React, { useState, useEffect } from 'react';
import {
	View,
	StyleSheet,
	Dimensions,
	Modal,
	TouchableOpacity,
	Share,
	Text,
	Pressable,
	Alert,
	FlatList,
} from 'react-native';
import StatusListComponent from './StatusListComponent';
import { Image } from 'expo-image';
import { blurHash } from '@/utils/blurHash';
import { Colors } from '@/constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import BackButton from '../navigation/BackButton';
import { useVideoPlayer, VideoView } from 'expo-video';
import { useEvent } from 'expo';
import { Audio } from 'expo-av';
import { SaveFile } from '@/utils/save-files';

const { height, width } = Dimensions.get('window');

type StatusItemProps = {
	status: any;
	statusType: 'image' | 'video' | 'audio';
};

const VideoItem = ({ url }: { url: string }) => {
	const player = useVideoPlayer(url, (player) => {
		player.loop = true;
		player.play();
	});
	const { isPlaying } = useEvent(player, 'playingChange', {
		isPlaying: player.playing,
	});

	return (
		<View style={styles.videoContainer}>
			<VideoView
				style={styles.fullScreenImage}
				player={player}
				allowsFullscreen
				allowsPictureInPicture
			/>
			<View style={styles.controlsContainer}>
				<Pressable
					onPress={() => {
						if (isPlaying) {
							player.pause();
						} else {
							player.play();
						}
					}}
				>
					<Text style={styles.controlText}>{isPlaying ? 'Pause' : 'Play'}</Text>
				</Pressable>
			</View>
		</View>
	);
};

const AudioItem = ({ url }: { url: string }) => {
	const [sound, setSound] = useState<Audio.Sound | null>(null);
	const [isPlaying, setIsPlaying] = useState(false);

	const playSound = async () => {
		const { sound } = await Audio.Sound.createAsync({ uri: url });
		setSound(sound);
		await sound.playAsync();
		setIsPlaying(true);
	};

	const pauseSound = async () => {
		if (sound) {
			await sound.pauseAsync();
			setIsPlaying(false);
		}
	};

	useEffect(() => {
		return sound
			? () => {
					sound.unloadAsync();
			  }
			: undefined;
	}, [sound]);

	return (
		<View style={styles.audioContainer}>
			<Pressable
				onPress={() => {
					if (isPlaying) {
						pauseSound();
					} else {
						playSound();
					}
				}}
			>
				<Ionicons
					name={isPlaying ? 'pause-circle' : 'play-circle'}
					size={45}
					color='white'
					style={styles.playIcon}
				/>
			</Pressable>
		</View>
	);
};

export default function StatusItem({
	status,
	statusType,
}: StatusItemProps): JSX.Element {
	const [modalVisible, setModalVisible] = useState(false);
	const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
	const [currentIndex, setCurrentIndex] = useState<number>(0);

	const handleImagePress = (index: number) => {
		setSelectedIndex(index);
		setCurrentIndex(index);
		setModalVisible(true);
	};

	const handleOnStatusSave = async () => {
		if (selectedIndex !== null) {
			await SaveFile(status[selectedIndex].uri);
		}
	};

	const handleShare = async () => {
		if (selectedIndex !== null) {
			try {
				await Share.share({
					message: 'Check out this status!',
					url: status[selectedIndex].url,
				});
			} catch (error) {
				console.error('Error sharing the image:', error);
			}
		}
	};

	const handleViewableItemsChanged = ({ viewableItems }: any) => {
		if (viewableItems.length > 0) {
			setCurrentIndex(viewableItems[0].index);
		}
	};

	const renderStatusItem = (
		status: any,
		index: number,
		statusType: 'image' | 'video' | 'audio'
	) => {
		const isVideo = statusType === 'video';
		const isAudio = statusType === 'audio';
		return (
			<View key={index} style={styles.statusItem}>
				<TouchableOpacity
					activeOpacity={0.7}
					onPress={() => handleImagePress(index)}
					style={styles.statusItem}
				>
					{isAudio ? (
						<View style={styles.statusImage}>
							<Ionicons
								name='musical-notes'
								size={45}
								color='white'
								style={styles.playIcon}
							/>
						</View>
					) : (
						<Image
							style={styles.statusImage}
							source={status.uri}
							placeholder={{ blurHash }}
							contentFit='cover'
							transition={1000}
						/>
					)}
					{isVideo && (
						<Ionicons
							name='play-circle'
							size={45}
							color='white'
							style={styles.playIcon}
						/>
					)}
				</TouchableOpacity>
			</View>
		);
	};

	return (
		<>
			<StatusListComponent
				data={status}
				renderItem={renderStatusItem}
				statusType={statusType}
			/>

			{/* full screen status preview modal */}
			{selectedIndex !== null && (
				<Modal
					visible={modalVisible}
					transparent={true}
					onRequestClose={() => setModalVisible(false)}
					presentationStyle='overFullScreen'
					statusBarTranslucent={true}
				>
					<View style={styles.fullScreenContainer}>
						<View style={styles.header}>
							<BackButton onPress={() => setModalVisible(false)} />
							<View style={styles.imageCounter}>
								<Text style={styles.counterText}>
									{currentIndex + 1} / {status.length}
								</Text>
							</View>
							<TouchableOpacity onPress={handleOnStatusSave}>
								<MaterialIcons name='save-alt' size={24} color='white' />
							</TouchableOpacity>
							<TouchableOpacity
								style={styles.shareButton}
								onPress={handleShare}
							>
								<Ionicons name='share-social' size={24} color='white' />
							</TouchableOpacity>
						</View>
						<View>
							{modalVisible && (
								<FlatList
									data={status}
									horizontal
									pagingEnabled
									initialScrollIndex={selectedIndex}
									getItemLayout={(data, index) => ({
										length: width,
										offset: width * index,
										index,
									})}
									onViewableItemsChanged={handleViewableItemsChanged}
									viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
									renderItem={({ item }) =>
										item.type === 'video' ? (
											<VideoItem url={item.url} />
										) : item.type === 'audio' ? (
											<AudioItem url={item.url} />
										) : (
											<Image
												style={styles.fullScreenImage}
												source={item.uri}
												contentFit='contain'
												transition={1000}
											/>
										)
									}
									showsHorizontalScrollIndicator={true}
									scrollIndicatorInsets={{
										top: 10,
										left: 10,
										bottom: 10,
										right: 10,
									}}
									indicatorStyle='white'
								/>
							)}
						</View>
					</View>
				</Modal>
			)}
		</>
	);
}

const styles = StyleSheet.create({
	statusItem: {
		display: 'flex',
		alignContent: 'center',
		justifyContent: 'center',
		width: width * 0.325,
		height: height * 0.15,
		marginBottom: 4,
	},
	statusImage: {
		flex: 1,
		backgroundColor: Colors.greenLight2,
		width: '100%',
		height: 'auto',
	},
	fullScreenContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: Colors.black,
		paddingVertical: 10,
	},
	header: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '100%',
		paddingVertical: 10,
		paddingHorizontal: 15,
		backgroundColor: Colors.black,
		marginTop: 100,
	},
	fullScreenImage: {
		width: width,
		height: height - 20,
	},

	shareButton: {
		zIndex: 1,
	},
	imageCounter: {
		position: 'relative',
		alignSelf: 'center',
		zIndex: 1,
	},
	counterText: {
		color: 'white',
		fontSize: 16,
	},
	playIcon: {
		position: 'absolute',
		alignSelf: 'center',
		top: '50%',
		marginTop: -25,
	},
	videoContainer: {
		width: width,
		height: height - 20,
	},
	controlsContainer: {
		position: 'absolute',
		bottom: 10,
		left: 10,
	},
	controlText: {
		color: 'white',
		fontSize: 16,
	},
	audioContainer: {
		width: width,
		height: height - 20,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
