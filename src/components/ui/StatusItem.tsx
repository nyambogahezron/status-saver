import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';

export default function StatusItem({ item }: any) {
  return (
    <View key={item} style={styles.statusItem}>
      <Image
        source={{
          uri: 'https://via.placeholder.com/100',
        }}
        style={styles.statusImage}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  statusItem: {
    width: '30%',
    marginBottom: 10,
  },
  statusImage: {
    width: '100%',
    height: 100,
    borderRadius: 8,
  },
});
