import CustomButton from '@/components/ui/CustomButton';
import { Colors } from '@/constants/Colors';
import { useNavigation } from '@react-navigation/native';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import StatusItem from '@/components/ui/StatusItem';
import useImageStatusStore from '@/store';
import { Image } from 'expo-image';
import { blurHash } from '@/utils/blurHash';

const height = Dimensions.get('window').height;

export default function HomeScreen() {
  const navigation = useNavigation();

  const statusData = useImageStatusStore((state) => state.imagesStatus);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.statusSection}>
        {statusData && statusData.length > 0 ? (
          <>
            <Text
              style={styles.statusInfo}
            >{`You have ${statusData.length} unsaved Status`}</Text>
            <Text style={styles.statusSubText}>
              If not saved, the status will automatically disappear after 24
              hours and cannot be viewed again.
            </Text>
            <View>
              {statusData && statusData.length > 0 ? (
                <StatusItem status={statusData.slice(0, 6)} />
              ) : (
                <Entypo name='arrow-with-circle-left' size={24} color='black' />
              )}
            </View>
            <CustomButton
              title='Save All'
              onPress={() => {}}
              customStyle={{ marginTop: 15 }}
            />
          </>
        ) : (
          <View style={styles.emptyStatus}>
            <AntDesign name='checkcircleo' size={30} color='green' />
            <Text style={styles.emptyStatusText}>
              All status have been saved
            </Text>
            <Text style={styles.emptyStatusDesc}>
              View some status in WhatsApp and Come back
            </Text>

            <CustomButton
              title='Check Now'
              onPress={() => {}}
              customStyle={styles.emptyStatusButton}
            />
          </View>
        )}
      </View>

      {/* Saved Status and Cleanup Section */}
      <View style={styles.actionSection}>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.actionItem}
          // @ts-ignore

          onPress={() => navigation.navigate('Status')}
        >
          <Text style={styles.actionTitle}>Status within 24 hours</Text>
          <View style={styles.savedIconsCon}>
            {statusData.slice(0, 3).map((_, index) => (
              <View key={index} style={styles.savedIcon}>
                <Image
                  source={statusData[index].url}
                  style={styles.statusImage}
                  placeholder={blurHash}
                  contentFit='cover'
                  transition={1000}
                />
              </View>
            ))}
            <Text style={styles.savedCount}>+{statusData.length - 3}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.actionItem}
          // @ts-ignore

          onPress={() => navigation.navigate('CleanUp')}
        >
          <Text style={styles.actionTitle}>Clean up WhatsApp</Text>
          <Text style={styles.cleanupText}>Clean 228.3 MB</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.actionItem}
          // @ts-ignore
          onPress={() => navigation.navigate('FilesExplorer')}
        >
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
    backgroundColor: Colors.greenLight,
    paddingHorizontal: 10,
    paddingVertical: 30,
  },
  statusInfo: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Rb-Bold',
  },
  statusSubText: {
    textAlign: 'center',
    fontSize: 14,
    color: Colors.black3,
    marginVertical: 10,
    fontFamily: 'Rb-Regular',
  },

  statusImage: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
    backgroundColor: Colors.greenLight2,
  },
  emptyStatus: {
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
    minHeight: height * 0.55,
  },
  emptyStatusText: {
    fontSize: 25,
    fontWeight: 600,
    color: Colors.black1,
    marginBottom: 5,
  },
  emptyStatusDesc: {
    fontSize: 15,
    fontWeight: 500,
    color: Colors.black1,
    marginBottom: 5,
  },
  emptyStatusButton: {
    backgroundColor: Colors.green,
    color: Colors.white,
    width: '90%',
    alignSelf: 'center',
    borderRadius: 20,
    marginTop: 30,
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
    borderBottomColor: Colors.gray1,
  },
  actionTitle: {
    fontSize: 16,
    color: Colors.black2,
    fontFamily: 'Rb-Regular',
  },
  cleanupText: {
    fontSize: 16,
    color: Colors.red,
  },
  filesText: {
    fontSize: 16,
    color: Colors.black2,
  },
  savedIconsCon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  savedIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  savedIcon: {
    width: 24,
    height: 24,
    backgroundColor: Colors.gray1,
    borderRadius: 12,
    marginHorizontal: 2,
    marginLeft: -6,
  },
  savedCount: {
    marginLeft: 8,
    color: Colors.black2,
    fontSize: 16,
  },
});
