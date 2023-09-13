import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity,Alert } from 'react-native';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { ScrollView } from 'react-native';

const ResolveIssueScreen = ({ route, navigation }) => {
  const { item } = route.params;
  const [isReferenceCorrect, setIsReferenceCorrect] = useState(item.referenceCorrect);
  const [resolutionIssue, setResolutionIssue] = useState('');
  const [resolveDate, setResolveDate] = useState('');
  const [resolveTime, setResolveTime] = useState('');

  const handleResolveIssue = async () => {
    try {
      const surchargeDocRef = doc(db, 'surchargeReports', item.id); // Specify the reference to the document
      await updateDoc(surchargeDocRef, {
        referenceCorrect: isReferenceCorrect,
        resolutionIssue,
        resolveDate,
        resolveTime,
        status: 'Pending', // Set the status to 'Pending' initially
        replyDate: null, // Reset reply date if the status changes
      });
  
      // Now update the status to 'Success'
      await updateDoc(surchargeDocRef, {
        status: 'Success',
      });
  
      // Create a custom message for the push notification
      const pushNotificationMessage = `Issue resolved:\nReference ${
        isReferenceCorrect ? 'Correct' : 'Incorrect'
      }\nIssue: ${resolutionIssue}\nResolved at: ${resolveDate} ${resolveTime}`;
  
      // Send push notification to the user
      const userDeviceToken = 'AAAAzSeQ710:APA91bH9U8qaQ5u2ZIufotNCsBE5S6aBZHDsToiFb_dyxSDNl5jDYBxqRdgbN9_TxuIGWeIr1y0FBzAuOW6XnO-737uDr8nz6rOtWlWOYluto-3MwUBQHgPg_BfznRvi6KvXy50nBw7a'; // Replace with the user's device token
      const notificationData = {
        title: 'Issue Resolved',
        body: pushNotificationMessage,
        // Additional data you want to pass to the notification
      };
      await sendPushNotification(userDeviceToken, notificationData);
  
      navigation.goBack(); // Go back to the previous screen after updating the data
  
      Alert.alert(
        'Issue Resolved',
        'The issue has been resolved successfully!',
        [{ text: 'OK' }]
      );
    } catch (error) {
      console.error('Error updating surcharge report:', error);
    }
  };
  

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Resolve Issue</Text>
      <Text style={styles.dataText}>Reference Number: {item.referenceNumber}</Text>

      {/* Radio Buttons */}
      <View style={styles.radioButtonContainer}>
        <TouchableOpacity
          style={[styles.radioButton, isReferenceCorrect === true && styles.radioButtonSelected]}
          onPress={() => setIsReferenceCorrect(true)}
        >
          <Text style={styles.radioButtonText}> Correct</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.radioButton, isReferenceCorrect === false && styles.radioButtonSelected]}
          onPress={() => setIsReferenceCorrect(false)}
        >
          <Text style={styles.radioButtonText}> Incorrect</Text>
        </TouchableOpacity>
      </View>

      {/* Issue Resolution */}
      <TextInput
        style={styles.input}
        placeholder="Issue Being Resolved"
        value={resolutionIssue}
        onChangeText={setResolutionIssue}
      />

      {/* Resolve Date */}
      <TextInput
        style={styles.input}
        placeholder="Resolve Date (YYYY-MM-DD)"
        value={resolveDate}
        onChangeText={setResolveDate}
      />

      {/* Resolve Time */}
      <TextInput
        style={styles.input}
        placeholder="Resolve Time (HH:MM)"
        value={resolveTime}
        onChangeText={setResolveTime}
      />

      {/* Resolve Issue Button */}
      <TouchableOpacity style={styles.resolveButton} onPress={handleResolveIssue}>
        <Text style={styles.resolveButtonText}>Resolve Issue</Text>
      </TouchableOpacity>
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
  dataText: {
    fontSize: 16,
    marginBottom: 16,
    color: '#333', // Dark gray text color
  },
  radioButtonContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  radioButtonSelected: {
    borderColor: '#2196F3',
    backgroundColor: '#E3F2FD',
  },
  radioButtonText: {
    fontSize: 16,
    color: '#333', // Dark gray text color
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
  },
  resolveButton: {
    backgroundColor: '#2196F3',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  resolveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ResolveIssueScreen;
