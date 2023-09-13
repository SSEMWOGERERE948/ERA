import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { getStorage, ref, uploadString, getDownloadURL } from 'firebase/storage';
import { auth, db } from './firebase';

const profile = ({ navigation }) => {
  const [userProfile, setUserProfile] = useState(null);
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    // Subscribe to changes in authentication state
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // If a user is logged in, fetch the user profile data from Firestore based on the user's email
        fetchUserProfile(user.email);

        // Set the greeting based on the time of day
        const currentHour = new Date().getHours();
        if (currentHour >= 5 && currentHour < 12) {
          setGreeting('Good morning');
        } else if (currentHour >= 12 && currentHour < 18) {
          setGreeting('Good afternoon');
        } else {
          setGreeting('Good evening');
        }
      } else {
        // If no user is logged in, handle the logic as needed (e.g., redirect to login screen)
        navigation.navigate('Login');
      }
    });

    // Unsubscribe from the auth state listener when the component unmounts
    return unsubscribe;
  }, [navigation]);

  const fetchUserProfile = async (email) => {
    try {
      const userRef = collection(db, 'users');
      const q = query(userRef, where('email', '==', email));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setUserProfile(data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleProfilePictureUpload = async () => {
    const options = {
      mediaType: 'photo',
      quality: 0.5,
    };

    // Use ImagePicker instance instead of directly calling the function
    ImagePicker.launchImageLibrary(options, (response) => {
      if (!response.didCancel && !response.error && !response.customButton) {
        // Image selected, you can now upload the image to Firebase Storage
        const storage = getStorage();
        const imageRef = ref(storage, `profile_pictures/${auth.currentUser.uid}`);
        uploadString(imageRef, response.data, 'base64')
          .then(async () => {
            // Get the download URL of the uploaded image
            const imageUrl = await getDownloadURL(imageRef);

            // Save the image URL in the user's profile data in Firestore
            const userRef = collection(db, 'users');
            await userRef.doc(auth.currentUser.uid).update({
              profilePicture: imageUrl,
            });

            // Update the userProfile state with the new data
            setUserProfile((prevState) =>
              prevState.map((user) =>
                user.id === auth.currentUser.uid ? { ...user, profilePicture: imageUrl } : user
              )
            );
          })
          .catch((error) => {
            console.error('Error uploading profile picture:', error);
          });
      }
    });
  };

  if (!userProfile) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {userProfile.map((user) => (
        <View key={user.id} style={styles.profileContainer}>
          <TouchableOpacity onPress={handleProfilePictureUpload}>
            {user.profilePicture ? (
              <Image source={{ uri: user.profilePicture }} style={styles.profileImage} />
            ) : (
              <View style={styles.emptyProfileImage} />
            )}
          </TouchableOpacity>
          <Text style={styles.profileName}>{`${greeting}, ${user.fullName}`}</Text>
          <Text style={styles.profileEmail}>{user.email}</Text>
        </View>
      ))}
    </View>
  );
};

const windowWidth = Dimensions.get('window').width;
const profileImageSize = windowWidth * 0.3;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImage: {
    width: profileImageSize,
    height: profileImageSize,
    borderRadius: profileImageSize / 2,
    marginBottom: 16,
  },
  emptyProfileImage: {
    width: profileImageSize,
    height: profileImageSize,
    borderRadius: profileImageSize / 2,
    backgroundColor: '#ccc',
    marginBottom: 16,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  profileEmail: {
    fontSize: 16,
    color: '#666',
  },
  greeting: {
    fontSize: 18,
    marginTop: 16,
    color: '#666',
  },
});

export default profile;
