import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import Entypo from '@expo/vector-icons/Entypo';
import { Colors } from '@/constants/Colors';
import BackButton from './navigation/BackButton';

export default function StatusHeader() {
  return (
    <View style={styles.header}>
      <BackButton />
      <Text style={styles.headerText}>WhatsApp Status</Text>

      <View style={styles.headerIcons}>
        <Feather name='search' size={20} color={Colors.white} />
        <Entypo name='dots-three-vertical' size={20} color={Colors.white} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 50,
    backgroundColor: Colors.primaryColor,
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Rb-Bold',
    color: Colors.white,
  },
  headerIcons: {
    display: 'flex',
    flexDirection: 'row',
    right: 10,
    gap: 8,
  },
});
