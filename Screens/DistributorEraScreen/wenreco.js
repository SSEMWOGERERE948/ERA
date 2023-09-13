import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import Map from '../Map';

const wenreco = () => {
  const [wenrecoData, setwenrecoData] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    fetchwenrecoData();
  }, []);

  const fetchwenrecoData = async () => {
    try {
      const surchargeRef = collection(db, 'surchargeReports');
      const q = query(surchargeRef, where('selectedDistributor', '==', 'WENRECO'));
      const querySnapshot = await getDocs(q);
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      setwenrecoData(data);
    } catch (error) {
      console.error('Error fetching wenreco data:', error);
    }
  };

  const handleSaveLocation = (location) => {
    setSelectedLocation(location);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>WENRECO Data</Text>
      {selectedLocation && (
        <View style={styles.mapContainer}>
          <Map handleSaveLocation={handleSaveLocation} selectedLocation={selectedLocation} />
        </View>
      )}
      {wenrecoData.map((item) => (
        <View key={item.id} style={styles.dataItem}>
          <Text style={styles.dataText}>Surcharge Type: {item.surchargeType}</Text>
          <Text style={styles.dataText}>Start Time: {item.startTime}</Text>
          <Text style={styles.dataText}>Duration: {item.duration}</Text>
          <Text style={styles.dataText}>Reference Number: {item.referenceNumber}</Text>
          {item.location.name && <Text style={styles.dataText}>Location Name: {item.location.name}</Text>}
          {/* Add additional fields as needed */}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f2f2f2', // Light gray background
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#2196F3', // Blue color for the heading
  },
  mapContainer: {
    height: 200,
    marginBottom: 16,
    borderRadius: 8,
    overflow: 'hidden', // To clip the map container content
  },
  dataItem: {
    backgroundColor: '#fff', // White background for the data items (cards)
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Add shadow to simulate card-like appearance
  },
  dataText: {
    fontSize: 16,
    marginBottom: 4,
    color: '#333', // Dark gray text color
  },
  locationButton: {
    backgroundColor: '#2196F3',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  locationButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default wenreco;
