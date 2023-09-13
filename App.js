import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './Screens/Login';
import Register from './Screens/Register';
import Home from './Screens/Home';
import profile from './Screens/profile';
import notification from './Screens/notification';
import settings from './Screens/settings';
import blog from './Screens/blog';
import ReportSurcharge from './Screens/ReportSurcharge';
import blackout from './Screens/blackout';
import contactus from './Screens/contactus';
import Distributor from './Screens/Distributor';
import AdminEra from './Screens/AdminEra';
import surchargeEra from './Screens/surchargeEra';
import blackoutEra from './Screens/blackoutEra';
import Adminprovider from './Screens/DistributionScreen/Adminpvovider';
import Map from './Screens/Map';
import PerformanceAnalysis from './Screens/performanceAnalysis';
import UserSatisfaction from './Screens/UserSatisfaction';
import umeme from './Screens/DistributorEraScreen/umeme';
import kil from './Screens/DistributorEraScreen/kil';
import bkkidc from './Screens/DistributorEraScreen/bkkidc';
import pacmecs from './Screens/DistributorEraScreen/pacmecs';
import redeco from './Screens/DistributorEraScreen/redeco';
import wenreco from './Screens/DistributorEraScreen/wenreco';
import uedcl from './Screens/DistributorEraScreen/uedcl';
import UmemeD from './Screens/DistributionScreen/UmemeD';
import ResolveIssueScreen from './Screens/DistributionScreen/ResolveIssueScreen';



const Stack = createStackNavigator();

const SplashScreen = () => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color="#2196F3" />
  </View>
);

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="profile" component={profile} />
        <Stack.Screen name="notification" component={notification} />
        <Stack.Screen name="settings" component={settings} />
        <Stack.Screen name="blog" component={blog} />
        <Stack.Screen name="ReportSurcharge" component={ReportSurcharge} />
        <Stack.Screen name="blackout" component={blackout} />
        <Stack.Screen name="contactus" component={contactus} />
        <Stack.Screen name="Distributor" component={Distributor} />
        <Stack.Screen name="Map" component={Map} />
      {/* admin side */}
        <Stack.Screen name="AdminEra" component={AdminEra} />
        <Stack.Screen name="surchargeEra" component={surchargeEra} />
        <Stack.Screen name="blackoutEra" component={blackoutEra} />

        <Stack.Screen name="Adminprovider" component={Adminprovider} />
        <Stack.Screen name="performanceAnalysis" component={PerformanceAnalysis} />
        <Stack.Screen name="UserSatisfaction" component={UserSatisfaction} />
        <Stack.Screen name="umeme" component={umeme} />
        <Stack.Screen name="kil" component={kil} />
        <Stack.Screen name="bkkidc" component={bkkidc} />
        <Stack.Screen name="pacmecs" component={pacmecs} />
        <Stack.Screen name="redeco" component={redeco} />
        <Stack.Screen name="wenreco" component={wenreco} />
        <Stack.Screen name="uedcl" component={uedcl} />
        <Stack.Screen name="UmemeD" component={UmemeD} />
        <Stack.Screen name="ResolveIssueScreen" component={ResolveIssueScreen} />


      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    justifyContent: 'center',
  },
});
