import { StyleSheet, ScrollView } from 'react-native';
import React from 'react';

import StatusItem from '@/components/ui/StatusItem';
import { Colors } from '@/constants/Colors';
import { useImageStatusStore } from '@/store';

export default function HomeScreen() {
  const statusData = useImageStatusStore((state) => state.imagesStatus);
  return (
    <ScrollView style={styles.container}>
      <StatusItem status={statusData} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
    paddingHorizontal: 5,
    paddingTop: 4,
    paddingBottom: 100,
    backgroundColor: Colors.greenLight,
  },
});
