import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

export default function CleanUpScreen() {
  const filesData = [
    { name: 'Videos', size: '12.2 MB', iconColor: '#8e44ad' },
    { name: 'Images', size: '64.3 MB', iconColor: '#3498db' },
    { name: 'Documents', size: '2.6 MB', iconColor: '#e67e22' },
    { name: 'Stickers', size: '2.8 MB', iconColor: '#f1c40f' },
    { name: 'Database', size: '175.7 MB', iconColor: '#2ecc71' },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Text style={styles.backArrow}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>Clean up WhatsApp</Text>
      </View>

      {/* Space Used Section */}
      <View style={styles.spaceUsedSection}>
        <Text style={styles.spaceUsedText}>260.0 MB</Text>
        <Text style={styles.spaceUsedLabel}>Space used</Text>
      </View>

      {/* Videos Section */}
      <View style={styles.videosSection}>
        <Text style={styles.sectionTitle}>
          Videos more than 1 month ago (2)
        </Text>
        <View style={styles.videoThumbnails}>
          <Image
            source={{ uri: 'https://via.placeholder.com/100' }}
            style={styles.videoThumbnail}
          />
          <Image
            source={{ uri: 'https://via.placeholder.com/100' }}
            style={styles.videoThumbnail}
          />
        </View>
        <TouchableOpacity style={styles.cleanButton}>
          <Text style={styles.cleanButtonText}>Clean up 6.3 MB</Text>
        </TouchableOpacity>
      </View>

      {/* WhatsApp Files Section */}
      <View style={styles.filesSection}>
        {filesData.map((file, index) => (
          <TouchableOpacity key={index} style={styles.fileItem}>
            <View
              style={[styles.fileIcon, { backgroundColor: file.iconColor }]}
            ></View>
            <Text style={styles.fileName}>{file.name}</Text>
            <Text style={styles.fileSize}>{file.size}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#2c9c45',
  },
  backArrow: {
    color: '#fff',
    fontSize: 24,
    marginRight: 16,
  },
  headerText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  spaceUsedSection: {
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#2c9c45',
  },
  spaceUsedText: {
    color: '#fff',
    fontSize: 40,
    fontWeight: 'bold',
  },
  spaceUsedLabel: {
    color: '#fff',
    fontSize: 16,
    marginTop: 4,
  },
  videosSection: {
    padding: 16,
    backgroundColor: '#f0f4f7',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  videoThumbnails: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  videoThumbnail: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 8,
  },
  cleanButton: {
    backgroundColor: '#2c9c45',
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  cleanButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  filesSection: {
    padding: 16,
  },
  fileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  fileIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: 16,
  },
  fileName: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  fileSize: {
    fontSize: 16,
    color: '#333',
  },
});
