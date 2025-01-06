import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Modal,
  TouchableOpacity,
  Share,
  FlatList,
  Text,
  Pressable,
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

const { height, width } = Dimensions.get('window');

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

export default function StatusItem({ status }: any) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const handleImagePress = (index: number) => {
    setSelectedIndex(index);
    setCurrentIndex(index);
    setModalVisible(true);
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

  const renderStatusItem = (status: any, index: number) => {
    const isVideo = status.type === 'video';
    return (
      <View key={index} style={styles.statusItem}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => handleImagePress(index)}
          style={styles.statusItem}
        >
          <Image
            style={styles.statusImage}
            source={status.url}
            placeholder={{ blurHash }}
            contentFit='cover'
            transition={1000}
          />
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
      <StatusListComponent data={status} renderItem={renderStatusItem} />
      {selectedIndex !== null && (
        <Modal
          visible={modalVisible}
          transparent={true}
          onRequestClose={() => setModalVisible(false)}
          presentationStyle='overFullScreen'
        >
          <View style={styles.fullScreenContainer}>
            <View style={styles.header}>
              <BackButton onPress={() => setModalVisible(false)} />
              <View style={styles.imageCounter}>
                <Text style={styles.counterText}>
                  {currentIndex + 1} / {status.length}
                </Text>
              </View>
              <MaterialIcons name='save-alt' size={24} color='white' />
              <TouchableOpacity
                style={styles.shareButton}
                onPress={handleShare}
              >
                <Ionicons name='share-social' size={24} color='white' />
              </TouchableOpacity>
            </View>
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
                ) : (
                  <Image
                    style={styles.fullScreenImage}
                    source={item.url}
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
    width: width * 0.3,
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
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    paddingVertical: 10,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  fullScreenImage: {
    width: width,
    height: height - 20,
  },
  backButton: {
    position: 'relative',
    zIndex: 1,
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
});
