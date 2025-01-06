import React from 'react';
import { TouchableOpacity } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Colors } from '@/constants/Colors';
import { useNavigation } from '@react-navigation/native';

type BackButtonProps = {
  onPress?: () => void;
};

export default function BackButton({ onPress }: BackButtonProps) {
  const navigation = useNavigation();
  const defaultOnPress = () => navigation.goBack();
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress || defaultOnPress}>
      <AntDesign name='arrowleft' size={24} color={Colors.white} />
    </TouchableOpacity>
  );
}
