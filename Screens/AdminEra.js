import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ScrollView } from 'react-native';

const AdminEra = ({ navigation }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(null);

  const handleLogout = () => {
    navigation.navigate('Login');
  };

  const handleToggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
  };

  const handleProfilePress = () => {
    navigation.navigate('profile');
  };

  const handleNotPress = () => {
    navigation.navigate('Notifications');
  };

  const handleSettingPress = () => {
    navigation.navigate('settings');
  };

  const handlesurchargeEra = () => {
    navigation.navigate('surchargeEra');
  };

  const handleblackoutEra= () => {
    navigation.navigate('blackoutEra');
  };

  const handleperformanceAnalysis = () => {
    navigation.navigate('performanceAnalysis');
  };
  const UserSatisfaction= () => {
    navigation.navigate('UserSatisfaction');
  };


  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.hamburgerButton} onPress={handleToggleMenu}>
          <Icon name="bars" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.heading}>Electricity Regulatory Authority</Text>
      </View>

      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/era.jpg')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {showMenu && (
        <View style={styles.menu}>
          <View style={styles.menuItem}>
            <Text style={[styles.menuText, styles.servicesHeading]}>Dashboard</Text>
          </View>

          <TouchableOpacity
            style={[
              styles.menuItem,
              selectedMenu === 'profile' && styles.selectedMenuItem,
            ]}
            onPress={handleProfilePress}
          >
            <Text
              style={[
                styles.menuText,
                selectedMenu === 'profile' && styles.selectedMenuText,
              ]}
            >
              Profile
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.menuItem,
              selectedMenu === 'Notifications' && styles.selectedMenuItem,
            ]}
            onPress={handleNotPress}
          >
            <Text
              style={[
                styles.menuText,
                selectedMenu === 'Notifications' && styles.selectedMenuText,
              ]}
            >
              Notifications
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.menuItem,
              selectedMenu === 'Settings' && styles.selectedMenuItem,
            ]}
            onPress={handleSettingPress}
          >
            <Text
              style={[
                styles.menuText,
                selectedMenu === 'Settings' && styles.selectedMenuText,
              ]}
            >
              Settings
            </Text>
          </TouchableOpacity>

        
          <TouchableOpacity
            style={[styles.menuItem, styles.logoutMenuItem]}
            onPress={handleLogout}
          >
            <Text style={[styles.menuText, styles.logoutMenuText]}>Logout</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.servicesContainer}>
        <Text style={styles.servicesHeading}>Services</Text>
      </View>


      <View style={styles.cardContainer}>
      <TouchableOpacity style={styles.cardButton} onPress={handlesurchargeEra}>
          <Icon name="money" size={48} color="#fff" />
          <Text style={styles.cardButtonText}>Surcharge</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.cardButton} onPress={handleblackoutEra}>
          <Icon name="money" size={48} color="#fff" />
          <Text style={styles.cardButtonText}>Blackout</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.cardButton} onPress={handleperformanceAnalysis}>
          <Icon name="money" size={48} color="#fff" />
          <Text style={styles.cardButtonText}>Performance Analysis</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.cardButton} onPress={UserSatisfaction}>
          <Icon name="power-off" size={48} color="#fff" />
          <Text style={styles.cardButtonText}>User Satisfaction</Text>
        </TouchableOpacity>

      </View>
      </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'red',
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  hamburgerButton: {
    padding: 8,
    marginRight: 16,
  },
  heading: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  menu: {
    position: 'absolute',
    top: 60,
    left: 0,
    backgroundColor: '#eee',
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 16,
    zIndex: 1,
  },
  menuItem: {
    paddingVertical: 8,
    marginBottom: 8,
  },
  menuText: {
    fontSize: 16,
  },
  selectedMenuItem: {
    backgroundColor: '#2196F3',
  },
  selectedMenuText: {
    color: '#fff',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 24,
    zIndex: 0,
  },
  logo: {
    width: 200,
    height: 200,
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 24,
  },
  cardButton: {
    width: '48%',
    aspectRatio: 1,
    backgroundColor: '#2196F3',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 8,
    textAlign: 'center',
  },
  servicesHeading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#2196F3',
  },
  servicesContainer: {
    alignItems: 'center',
    marginTop: 24,
  },
  logoutMenuItem: {
    marginTop: 24,
  },
  logoutMenuText: {
    color: 'red',
  },
  profileButton: {
    backgroundColor: '#2196F3',
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
    alignSelf: 'center',
  },
  profileButtonText: {
    color: '#fff',
  },
  buttonHover: {
    elevation: 2,
  },
});

export default AdminEra;
