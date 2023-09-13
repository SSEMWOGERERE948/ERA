import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native';
import { collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import Map from '../Map';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons'; // Import the MaterialIcons from Expo
import { ScrollView } from 'react-native';


const UmemeD = () => {
  const [umemeData, setUmemeData] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [resolveDate, setResolveDate] = useState('');
  const [resolveTime, setResolveTime] = useState('');

  const navigation = useNavigation();

  useEffect(() => {
    fetchUmemeData();
  }, []);

  const fetchUmemeData = async () => {
    try {
      const surchargeRef = collection(db, 'surchargeReports');
      const q = query(surchargeRef, where('selectedDistributor', '==', 'umeme'));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setUmemeData(data);
    } catch (error) {
      console.error('Error fetching Umeme data:', error);
    }
  };

  const handleSaveLocation = (location) => {
    setSelectedLocation(location);
  };

  const handleReply = async (id, replyDate, isReferenceCorrect) => {
    try {
      const surchargeDocRef = doc(db, 'surchargeReports', id);
      const updateData = {
        replyDate,
        status: isReferenceCorrect ? 'Pending' : 'Incorrect',
      };
      await updateDoc(surchargeDocRef, updateData);
      // If the reference is incorrect, reset the reply date to null
      if (!isReferenceCorrect) {
        await updateDoc(surchargeDocRef, { replyDate: null });
      }
      // Clear the resolve date and time after handling the reply
      setResolveDate('');
      setResolveTime('');
    } catch (error) {
      console.error('Error updating surcharge report:', error);
    }
  };

  const handleResolveDateChange = (text) => {
    setResolveDate(text);
  };

  const handleResolveTimeChange = (text) => {
    setResolveTime(text);
  };

  const handleDataItemClick = (item) => {
    // Implement your navigation logic here to navigate to another page
    // For example:
    navigation.navigate('ResolveIssueScreen', { item });
  };

 
const renderItem = ({ item }) => {
  return (
    <TouchableOpacity onPress={() => handleDataItemClick(item)}>
        <ScrollView style={styles.dataItem}>
        <Text style={styles.dataText}>Surcharge Type: {item.surchargeType}</Text>
        <Text style={styles.dataText}>Start Time: {item.startTime}</Text>
        <Text style={styles.dataText}>Duration: {item.duration}</Text>
        <Text style={styles.dataText}>Reference Number: {item.referenceNumber}</Text>
        {item.location && <Text style={styles.dataText}>Location Name: {item.location.name}</Text>}
        {item.replyDate && <Text style={styles.dataText}>Reply Date: {item.replyDate}</Text>}

        {/* Display the status based on the item status */}
        {item.status === 'Success' && (
          <View style={styles.statusContainer}>
            <MaterialIcons name="check-circle" size={24} color="#2196F3" />
            <Text style={styles.statusText}>Resolved</Text>
          </View>
        )}
        {item.status === 'Pending' && <Text style={styles.statusText}>Pending</Text>}
        {/* ... Additional JSX code based on the selected reference */}
        </ScrollView>
    </TouchableOpacity>
  );
};

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Umeme Data</Text>
      {selectedLocation && (
        <View style={styles.mapContainer}>
          <Map handleSaveLocation={handleSaveLocation} selectedLocation={selectedLocation} />
        </View>
      )}
      <FlatList
        data={umemeData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.flatListContainer}
      />
    </ScrollView>
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
  resolveInput: {
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    padding: 10,
    marginTop: 8,
  },
  resolveButton: {
    backgroundColor: '#2196F3',
    borderRadius: 10,
    paddingVertical: 12,
    marginTop: 8,
    alignItems: 'center',
  },
  resolveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  flatListContainer: {
    paddingBottom: 16,
  },
});

export default UmemeD;