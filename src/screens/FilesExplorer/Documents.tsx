import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';

const documents = [
  {
    name: 'Internship_2025_Cohort.pdf',
    size: '271.9 KB',
    date: 'Dec 12',
    type: 'pdf',
  },
  { name: 'DOC-20241207-WA0000', size: '128.5 KB', date: 'Dec 7', type: 'doc' },
  { name: 'DOC-20241201-WA0000', size: '66.9 KB', date: 'Dec 1', type: 'doc' },
  { name: 'DOC-20241125-WA0000', size: '44.6 KB', date: 'Nov 25', type: 'doc' },
  { name: 'DOC-20241012-WA0000', size: '1.3 MB', date: 'Oct 12', type: 'doc' },
  {
    name: 'HezronNyamboga-EnterpriseNetwo-certificate.pdf',
    size: '22.1 KB',
    date: 'Aug 28',
    type: 'pdf',
  },
  {
    name: 'HezronNyamboga-EnterpriseNetwo-letter.pdf',
    size: '81.0 KB',
    date: 'Aug 28',
    type: 'pdf',
  },
  { name: 'DOC-20240715-WA0001', size: '18.8 KB', date: 'Jul 15', type: 'doc' },
  {
    name: 'HezronNyamboga-SwitchingRoutin-letter.pdf',
    size: '80.9 KB',
    date: 'May 6',
    type: 'pdf',
  },
];

const DocumentItem = ({ item }: any) => (
  <View style={styles.itemContainer}>
    {/* File Icon */}
    <View
      style={[
        styles.icon,
        item.type === 'pdf' ? styles.pdfIcon : styles.docIcon,
      ]}
    />
    {/* File Details */}
    <View style={styles.fileDetails}>
      <Text style={styles.fileName} numberOfLines={1}>
        {item.name}
      </Text>
      <Text style={styles.fileInfo}>
        {item.size} • {item.date}
      </Text>
    </View>
    {/* Vertical Ellipsis */}
    <TouchableOpacity>
      <Text style={styles.ellipsis}>⋮</Text>
    </TouchableOpacity>
  </View>
);

export default function Documents() {
  return (
    <View style={styles.container}>
      {/* Documents List */}
      <FlatList
        data={documents}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <DocumentItem item={item} />}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },

  list: {
    paddingHorizontal: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: 16,
  },
  pdfIcon: {
    backgroundColor: '#e74c3c',
  },
  docIcon: {
    backgroundColor: '#3498db',
  },
  fileDetails: {
    flex: 1,
  },
  fileName: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 4,
  },
  fileInfo: {
    color: '#aaa',
    fontSize: 12,
  },
  ellipsis: {
    color: '#fff',
    fontSize: 18,
  },
});
