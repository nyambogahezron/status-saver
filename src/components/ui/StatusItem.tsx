import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import StatusListComponent from './StatusListComponent';
import { Image } from 'expo-image';
import { blurHash } from '@/utils/blurHash';
import { Colors } from '@/constants/Colors';

const { height, width } = Dimensions.get('window');

export default function StatusItem({ status }: any) {
  return (
    <StatusListComponent
      data={status}
      renderItem={(status, index) => (
        <View key={index} style={styles.statusItem}>
          <Image
            style={styles.statusImage}
            source={status.url}
            placeholder={{ blurHash }}
            contentFit='contain'
            transition={1000}
          />
        </View>
      )}
    />
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
});
