import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Constants from 'expo-constants';
import { useNavigation } from '@react-navigation/native';

const Map = ({ route }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [apiKey, setApiKey] = useState(null);

  useEffect(() => {
    // Get the API key from Expo environment variables
    setApiKey(Constants?.manifest?.android?.config?.googleMaps?.apiKey || 'AIzaSyBZmokI5GnHkd2rZIev1a9XY4E6KmcgKNs');
  }, []);

  const navigation = useNavigation();
  const { handleSaveLocation } = route.params || {};

  const handleMapPress = (event) => {
    const { coordinate } = event.nativeEvent;
    setSelectedLocation({ ...coordinate, name: null }); // Clear the location name
  };

  const handleDropdownPress = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleDropdownItemPress = (location) => {
    setSelectedLocation(location);
    setDropdownOpen(false);
  };

  const handleSavePress = () => {
    // Pass the location name to the handleSaveLocation function
    handleSaveLocation(selectedLocation);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.dropdownButton} onPress={handleDropdownPress}>
        <Text style={styles.dropdownButtonText}>
          {selectedLocation ? 'Selected Location' : 'Select Location'}
        </Text>
      </TouchableOpacity>

      {dropdownOpen && (
        <View style={styles.dropdown}>
          <TouchableOpacity
            style={styles.dropdownItem}
            onPress={() => handleDropdownItemPress({ latitude: 37.78825, longitude: -122.4324, name: 'Location 1' })}
          >
            <Text style={styles.dropdownItemText}>Location 1</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dropdownItem}
            onPress={() => handleDropdownItemPress({ latitude: 37.7749, longitude: -122.4194, name: 'Location 2' })}
          >
            <Text style={styles.dropdownItemText}>Location 2</Text>
          </TouchableOpacity>
          {/* Add more dropdown items as needed */}
        </View>
      )}

      {apiKey && selectedLocation && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: selectedLocation.latitude,
            longitude: selectedLocation.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          onPress={handleMapPress}
          provider={MapView.PROVIDER_GOOGLE}
          showsUserLocation={true}
          apiKey={apiKey}
        >
          <Marker coordinate={selectedLocation} />
        </MapView>
      )}

      {selectedLocation && (
        <TouchableOpacity style={styles.saveButton} onPress={handleSavePress}>
          <Text style={styles.saveButtonText}>Save Location</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dropdownButton: {
    backgroundColor: '#2196F3',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: 'center',
  },
  dropdownButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dropdown: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 16,
  },
  dropdownItem: {
    padding: 12,
  },
  dropdownItemText: {
    fontSize: 16,
  },
  map: {
    flex: 1,
  },
  saveButton: {
    backgroundColor: '#2196F3',
    padding: 12,
    borderRadius: 8,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Map;
