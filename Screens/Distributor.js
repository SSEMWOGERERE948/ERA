import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native';

const Distributor = () => {
  const distributors = [
    {
      name: 'Umeme Limited',
      area: 'Various regions in Uganda',
      contact: {
        app: 'Umeme Mobile App',
        phoneNumber: '0800 185 185',
      },
    },
    {
      name: 'Uganda Electricity Distribution Company Limited',
      area: 'Nationwide',
      contact: {
        app: 'UEDCL Mobile App',
        phoneNumber: '0800 284 526',
      },
    },
    {
      name: 'Pader-Abim Community Multi-Purpose Electric Cooperative Society Limited',
      area: 'Nationwide',
      contact: {
        app: 'PACMECS Mobile App',
        phoneNumber: '0800 284 526',
      },
    },
    {
      name: 'West Nile Rural Electrification Company Limited',
      area: 'Nationwide',
      contact: {
        app: 'WENRECo Mobile App',
        phoneNumber: '0800 284 526',
      },
    },
    {
      name: 'Kilembe Investments Limited',
      area: 'Nationwide',
      contact: {
        app: 'KIL Mobile App',
        phoneNumber: '0800 284 526',
      },
    },
    {
      name: 'Bunyoro-Kitara Kingdom Investments and Development Company Limited',
      area: 'Nationwide',
      contact: {
        app: 'BKKIDC Mobile App',
        phoneNumber: '0800 284 526',
      },
    },
    {
      name: 'Rwenzori East Regional Electricity Distribution Company Limited',
      area: 'Nationwide',
      contact: {
        app: 'REDECOL Mobile App',
        phoneNumber: '0800 284 526',
      },
    },
    // Add more distributors with their information as needed
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Contact Your Distributor</Text>
      {distributors.map((distributor, index) => (
        <View key={index} style={styles.distributorContainer}>
          <Text style={styles.distributorName}>{distributor.name}</Text>
          <Text style={styles.distributorArea}>{distributor.area}</Text>
          {distributor.contact.app && (
            <Text style={styles.distributorInfo}>
              App: {distributor.contact.app}
            </Text>
          )}
          {distributor.contact.phoneNumber && (
            <Text style={styles.distributorInfo}>
              Phone: {distributor.contact.phoneNumber}
            </Text>
          )}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color:'#2196F3'
  },
  distributorContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
  },
  distributorName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2196F3',
    marginBottom: 8,
  },
  distributorArea: {
    fontSize: 16,
    color: '#000',
  },
  distributorInfo: {
    fontSize: 16,
    color: '#000',
  },
});

export default Distributor;
