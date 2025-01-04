import { StyleSheet, View } from 'react-native';
import React from 'react';

type StatusCardProps = {
  data: any[];
  renderItem: (item: any, index: number) => React.ReactNode;
};

export default function StatusListComponent({
  data,
  renderItem,
}: StatusCardProps) {
  return (
    <View style={styles.container}>
      {data && data.map((item: any, index: number) => renderItem(item, index))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 2,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    gap: 2,
  },
});
