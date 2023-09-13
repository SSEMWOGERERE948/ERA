import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { ScrollView } from 'react-native';

const SurchargeEra = ({ navigation }) => {
  const handleUMEMEReport = () => {
    navigation.navigate('umeme');
  };

  const handleKILReport = () => {
    navigation.navigate('kil');
  };

  const handlePACMECSReport = () => {
    navigation.navigate('pacmecs');
  };

  const handleREDECOReport = () => {
    navigation.navigate('redeco');
  };

  const handleUEDCLReport = () => {
    navigation.navigate('uedcl');
  };

  const handleWENRECOReport = () => {
    navigation.navigate('wenreco');
  };

  const handleBKKIDCReport = () => {
    navigation.navigate('bkkidc');
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/era.jpg')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.heading}>Surcharge Reports</Text>
      <TouchableOpacity style={styles.button} onPress={handleUMEMEReport}>
        <Text style={styles.buttonText}>UMEME</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleKILReport}>
        <Text style={styles.buttonText}>KIL</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handlePACMECSReport}>
        <Text style={styles.buttonText}>PACMECS</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleREDECOReport}>
        <Text style={styles.buttonText}>REDECO</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleUEDCLReport}>
        <Text style={styles.buttonText}>UEDCL</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleWENRECOReport}>
        <Text style={styles.buttonText}>WENRECO</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleBKKIDCReport}>
        <Text style={styles.buttonText}>BKKIDC</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
  },
  logo: {
    width: 200,
    height: 100,
    marginBottom: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 10,
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SurchargeEra;
