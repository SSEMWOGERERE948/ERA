import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebase';
import { useNavigation, useRoute } from '@react-navigation/native';
import { sendPushNotification } from './notification';
import { ScrollView } from 'react-native';

const ReportSurcharge = () => {
  const [surchargeType, setSurchargeType] = useState('');
  const [startTime, setStartTime] = useState('');
  const [duration, setDuration] = useState('');
  const [referenceNumber, setReferenceNumber] = useState('');
  const [selectedDistributor, setSelectedDistributor] = useState('');
  const [location, setLocation] = useState(null);
  const [selectedLocationText, setSelectedLocationText] = useState('');
  const navigation = useNavigation();
  const route = useRoute();
  const { selectedLocation } = route.params || {};

  const handleSaveLocation = (selectedLocation) => {
    setLocation(selectedLocation);
    setSelectedLocationText(JSON.stringify(selectedLocation));
  };

  const handleSubmit = async () => {
    try {
      const surchargeRef = collection(db, 'surchargeReports');
      await addDoc(surchargeRef, {
        surchargeType,
        startTime,
        duration,
        referenceNumber,
        selectedDistributor,
        location,
      });
      console.log('Surcharge report submitted successfully!');

      // Send the push notification to the admin (surchargeEra.js)
      const adminDeviceToken = 'AAAAzSeQ710:APA91bH9U8qaQ5u2ZIufotNCsBE5S6aBZHDsToiFb_dyxSDNl5jDYBxqRdgbN9_TxuIGWeIr1y0FBzAuOW6XnO-737uDr8nz6rOtWlWOYluto-3MwUBQHgPg_BfznRvi6KvXy50nBw7a'; // Replace with the admin's device token
      await sendPushNotification(adminDeviceToken, {
        type: 'surcharge_report',
        reportData: {
          surchargeType,
          startTime,
          duration,
          referenceNumber,
          selectedDistributor,
          location,
        },
      });

      setSurchargeType('');
      setStartTime('');
      setDuration('');
      setReferenceNumber('');
      setSelectedDistributor('');
      setLocation(null);
      navigation.navigate('ReportSurcharge');
    } catch (error) {
      console.error('Error submitting surcharge report:', error);
      // Handle the error (e.g., show an error message to the user)
    }
  };

  const handleLocationPress = () => {
    navigation.navigate('Map', { handleSaveLocation });
  };


  return (
    <ScrollView style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>Report Surcharge</Text>
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Surcharge Type</Text>
        <View style={styles.radioContainer}>
          <TouchableOpacity
            style={[
              styles.radio,
              surchargeType === 'highVoltage' && styles.radioSelected,
            ]}
            onPress={() => setSurchargeType('highVoltage')}
          >
            {surchargeType === 'highVoltage' && (
              <Icon name="check" size={16} color="#fff" />
            )}
          </TouchableOpacity>
          <Text style={styles.radioLabel}>High Voltage</Text>
        </View>
        <View style={styles.radioContainer}>
          <TouchableOpacity
            style={[
              styles.radio,
              surchargeType === 'lowVoltage' && styles.radioSelected,
            ]}
            onPress={() => setSurchargeType('lowVoltage')}
          >
            {surchargeType === 'lowVoltage' && (
              <Icon name="check" size={16} color="#fff" />
            )}
          </TouchableOpacity>
          <Text style={styles.radioLabel}>Low Voltage</Text>
        </View>
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Start Time</Text>
        <TextInput
          style={styles.input}
          value={startTime}
          onChangeText={setStartTime}
          placeholder="Enter start time"
        />
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Duration</Text>
        <TextInput
          style={styles.input}
          value={duration}
          onChangeText={setDuration}
          placeholder="Enter duration"
        />
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Reference Number</Text>
        <TextInput
          style={styles.input}
          value={referenceNumber}
          onChangeText={setReferenceNumber}
          placeholder="Enter reference number"
        />
      </View>


      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Distributor</Text>
        <View style={styles.radioContainer}>
          <TouchableOpacity
            style={[
              styles.radio,
              selectedDistributor === 'umeme' && styles.radioSelected,
            ]}
            onPress={() => setSelectedDistributor('umeme')}
          >
            {selectedDistributor === 'umeme' && (
              <Icon name="check" size={16} color="#fff" />
            )}
          </TouchableOpacity>
          <Text style={styles.radioLabel}>Umeme</Text>
        </View>
        <View style={styles.radioContainer}>
          <TouchableOpacity
            style={[
              styles.radio,
              selectedDistributor === 'KIL' && styles.radioSelected,
            ]}
            onPress={() => setSelectedDistributor('KIL')}
          >
            {selectedDistributor === 'KIL' && (
              <Icon name="check" size={16} color="#fff" />
            )}
          </TouchableOpacity>
          <Text style={styles.radioLabel}>KIL</Text>
        </View>
        {/* Rest of the distributor radio buttons */}

        <View style={styles.radioContainer}>
          <TouchableOpacity
            style={[
              styles.radio,
              selectedDistributor === 'BKKIDC' && styles.radioSelected,
            ]}
            onPress={() => setSelectedDistributor('BKKIDC')}
          >
            {selectedDistributor === 'BKKIDC' && (
              <Icon name="check" size={16} color="#fff" />
            )}
          </TouchableOpacity>
          <Text style={styles.radioLabel}>BKKIDC</Text>
        </View>

        <View style={styles.radioContainer}>
          <TouchableOpacity
            style={[
              styles.radio,
              selectedDistributor === 'PACMECS' && styles.radioSelected,
            ]}
            onPress={() => setSelectedDistributor('PACMECS')}
          >
            {selectedDistributor === 'PACMECS' && (
              <Icon name="check" size={16} color="#fff" />
            )}
          </TouchableOpacity>
          <Text style={styles.radioLabel}>PACMECS</Text>
        </View>

        <View style={styles.radioContainer}>
          <TouchableOpacity
            style={[
              styles.radio,
              selectedDistributor === 'REDECO' && styles.radioSelected,
            ]}
            onPress={() => setSelectedDistributor('REDECO')}
          >
            {selectedDistributor === 'REDECO' && (
              <Icon name="check" size={16} color="#fff" />
            )}
          </TouchableOpacity>
          <Text style={styles.radioLabel}>REDECO</Text>
        </View>

        <View style={styles.radioContainer}>
          <TouchableOpacity
            style={[
              styles.radio,
              selectedDistributor === 'UEDCL' && styles.radioSelected,
            ]}
            onPress={() => setSelectedDistributor('UEDCL')}
          >
            {selectedDistributor === 'UEDCL' && (
              <Icon name="check" size={16} color="#fff" />
            )}
          </TouchableOpacity>
          <Text style={styles.radioLabel}>UEDCL</Text>
        </View>

        <View style={styles.radioContainer}>
          <TouchableOpacity
            style={[
              styles.radio,
              selectedDistributor === 'WENRECO' && styles.radioSelected,
            ]}
            onPress={() => setSelectedDistributor('WENRECO')}
          >
            {selectedDistributor === 'WENRECO' && (
              <Icon name="check" size={16} color="#fff" />
            )}
          </TouchableOpacity>
          <Text style={styles.radioLabel}>WENRECO</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.locationButton}
        onPress={handleLocationPress}
      >
        <Text style={styles.locationButtonText}>Select Location</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
      </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  headingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'red',
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  fieldContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  radio: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#2196F3',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  radioSelected: {
    backgroundColor: '#2196F3',
  },
  radioLabel: {
    fontSize: 16,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
  },
  distributorButton: {
    backgroundColor: '#2196F3',
    borderRadius: 10,
    paddingVertical: 12,
    marginBottom: 8,
    alignItems: 'center',
  },
  distributorButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  locationButton: {
    backgroundColor: '#2196F3',
    borderRadius: 10,
    paddingVertical: 12,
    marginBottom: 8,
    alignItems: 'center',
  },
  locationButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  submitButton: {
    backgroundColor: '#2196F3',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ReportSurcharge;
