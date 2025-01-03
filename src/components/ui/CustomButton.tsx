import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { Colors } from '@/constants/Colors';

type CustomButtonProps = {
  title: string;
  customStyle?: object;
  customTextStyle?: object;
  onPress: () => void;
  opacity?: number;
};

export default function CustomButton({
  title,
  customStyle,
  customTextStyle,
  onPress,
  opacity = 0.8,
}: CustomButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.button, customStyle]}
      onPress={onPress}
      activeOpacity={opacity}
    >
      <Text style={[styles.text, customTextStyle]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primaryColor,
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  text: {
    color: 'white',
    textAlign: 'center',
  },
});
