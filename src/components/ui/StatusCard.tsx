import { View } from 'react-native';
import React from 'react';

type StatusCardProps = {
  data: any;
  renderItem: (item: any) => JSX.Element;
};

export default function StatusCard({ data, renderItem }: StatusCardProps) {
  return <View>{data.map((item: any) => renderItem(item))}</View>;
}
