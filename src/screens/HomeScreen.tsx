import CustomButton from '@/components/ui/CustomButton';
import { Colors } from '@/constants/Colors';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

export default function HomeScreen() {
  const unsavedStatuses = Array(20).fill(null);
  const savedStatuses = Array(8).fill(null);
  return (
    <ScrollView style={styles.container}>
      {/* Unsaved Status Section */}
      <View style={styles.statusSection}>
        <Text
          style={styles.statusInfo}
        >{`You have ${unsavedStatuses.length} unsaved Status`}</Text>
        <Text style={styles.statusSubText}>
          If not saved, the status will automatically disappear after 24 hours
          and cannot be viewed again.
        </Text>
        <View style={styles.statusGrid}>
          {unsavedStatuses.slice(0, 6).map((_, index) => (
            <View key={index} style={styles.statusItem}>
              <Image
                source={{
                  uri: 'https://via.placeholder.com/100',
                }}
                style={styles.statusImage}
              />
            </View>
          ))}
        </View>
        <CustomButton title='Save All' onPress={() => {}} />
      </View>

      {/* Saved Status and Cleanup Section */}
      <View style={styles.actionSection}>
        <TouchableOpacity style={styles.actionItem}>
          <Text style={styles.actionTitle}>Status within 24 hours</Text>
          <View style={styles.savedIcons}>
            {savedStatuses.slice(0, 3).map((_, index) => (
              <View key={index} style={styles.savedIcon}></View>
            ))}
            <Text style={styles.savedCount}>+{savedStatuses.length - 3}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionItem}>
          <Text style={styles.actionTitle}>Clean up WhatsApp</Text>
          <Text style={styles.cleanupText}>Clean 228.3 MB</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionItem}>
          <Text style={styles.actionTitle}>WhatsApp files</Text>
          <Text style={styles.filesText}>560</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  statusSection: {
    padding: 16,
    backgroundColor: '#e8f5e9',
  },
  statusInfo: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  statusSubText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#555',
    marginVertical: 8,
  },
  statusGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginVertical: 16,
  },
  statusItem: {
    width: '32%',
    marginBottom: 8,
  },
  statusImage: {
    width: '100%',
    height: 100,
    borderRadius: 8,
  },

  actionSection: {
    padding: 16,
    backgroundColor: Colors.white,
  },
  actionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  actionTitle: {
    fontSize: 16,
    color: '#333',
  },
  cleanupText: {
    fontSize: 16,
    color: '#e53935',
  },
  filesText: {
    fontSize: 16,
    color: '#333',
  },
  savedIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  savedIcon: {
    width: 24,
    height: 24,
    backgroundColor: '#ddd',
    borderRadius: 12,
    marginHorizontal: 2,
  },
  savedCount: {
    marginLeft: 8,
    color: '#333',
    fontSize: 16,
  },
});
