import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { auth, db, messaging } from './firebase'; // Import Firebase modules, including Firebase Authentication, Firestore, and Firebase Messaging.

const Register = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [nationality, setNationality] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegistration = async () => {
    try {
      // Validate password and confirmPassword
      if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return;
      }

      // Create user account using Firebase Auth
      const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredentials.user;
      console.log('Registered with:', user.email);

      // Obtain the FCM device token
      const currentToken = await messaging().getToken();

      // Save the additional user details to Firestore, including the FCM device token
      const userData = {
        fullName,
        dateOfBirth,
        nationality,
        email,
        registrationDate: new Date().toISOString(),
        // Store the FCM device token with user data
        fcmToken: currentToken,
      };

      // Save the user profile details to Firestore
      const userRef = collection(db, 'users');
      await addDoc(userRef, userData);

      // Navigate to the Profile screen and pass the userData as params
      navigation.navigate('profile', { userData });
    } catch (error) {
      console.error('Error creating user:', error);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registration</Text>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={fullName}
        onChangeText={text => setFullName(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Date of Birth"
        value={dateOfBirth}
        onChangeText={text => setDateOfBirth(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Nationality"
        value={nationality}
        onChangeText={text => setNationality(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={text => setEmail(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={text => setPassword(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Re-type Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={text => setConfirmPassword(text)}
      />

      <TouchableOpacity style={styles.button} onPress={handleRegistration}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    marginBottom: 16,
    width: '80%',
  },
  button: {
    backgroundColor: '#2196F3',
    borderRadius: 4,
    padding: 12,
    alignItems: 'center',
    marginTop: 24,
    width: '80%',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Register;
