import { Colors } from '@/constants/Colors';
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';

export default function CustomHeader() {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>Status Saver</Text>
      <Entypo
        name='dots-three-vertical'
        size={20}
        color='black'
        style={styles.icon}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.primaryColor,
    paddingVertical: 10,
    paddingHorizontal: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  icon: {
    color: 'white',
    fontSize: 20,
    right: -5,
  },
});
