import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import StatusListComponent from './StatusListComponent';

export default function StatusItem({ status }: any) {
  return (
    <StatusListComponent
      data={status}
      renderItem={(status, index) => (
        <View key={index} style={styles.statusItem}>
          <Image
            source={{
              uri: 'https://via.placeholder.com/100',
            }}
            style={styles.statusImage}
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
    width: '32.3%',
    marginBottom: 4,
  },
  statusImage: {
    width: '100%',
    height: 100,
    borderRadius: 2,
  },
});
