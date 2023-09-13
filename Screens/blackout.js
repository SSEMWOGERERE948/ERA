import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const blackout = ({ navigation }) => {
  const [startTime, setStartTime] = useState('');
  const [duration, setDuration] = useState('');
  const [referenceNumber, setReferenceNumber] = useState('');
  const [selectedDistributor, setSelectedDistributor] = useState('');
  const [location, setLocation] = useState(null);

  const handleSaveLocation = (selectedLocation) => {
    setLocation(selectedLocation);
  };

  const handleSubmit = () => {
    // Perform submission logic here
  };

  const handleLocationPress = () => {
    navigation.navigate('Map', { handleSaveLocation });
  };

  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>Report Blackout</Text>
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
              selectedDistributor === 'escom' && styles.radioSelected,
            ]}
            onPress={() => setSelectedDistributor('escom')}
          >
            {selectedDistributor === 'escom' && (
              <Icon name="check" size={16} color="#fff" />
            )}
          </TouchableOpacity>
          <Text style={styles.radioLabel}>Escom</Text>
        </View>
        {/* Add more distributors as needed */}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  headingContainer: {
    backgroundColor: 'red',
    padding: 8,
    borderRadius: 8,
    marginBottom: 24,
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

export default blackout;
