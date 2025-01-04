import React from 'react';
import { TouchableOpacity } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Colors } from '@/constants/Colors';
import { useNavigation } from '@react-navigation/native';

export default function BackButton() {
  const navigation = useNavigation();
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.goBack()}>
      <AntDesign name='arrowleft' size={24} color={Colors.white} />
    </TouchableOpacity>
  );
}
