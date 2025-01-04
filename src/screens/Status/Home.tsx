import { StyleSheet, ScrollView } from 'react-native';
import React from 'react';

import StatusItem from '@/components/ui/StatusItem';
import { Colors } from '@/constants/Colors';

export default function HomeScreen() {
  const unsavedStatuses = Array(30).fill(null);
  return (
    <ScrollView style={styles.container}>
      <StatusItem status={unsavedStatuses} />
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
