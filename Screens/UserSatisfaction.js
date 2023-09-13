import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const UserSatisfaction = () => {
  const [userSatisfactionData] = useState([
    { month: 'January', UEDCL: 4.5, UMEME: 3.8, REA: 4.2, BUKI: 4.0, PADER: 3.5, LIRA: 4.1, KISORO: 3.9 },
    { month: 'February', UEDCL: 4.3, UMEME: 3.6, REA: 4.0, BUKI: 4.1, PADER: 3.4, LIRA: 4.2, KISORO: 3.8 },
    // Add more monthly data as needed
  ]);

  const [selectedDistributor, setSelectedDistributor] = useState('');

  const handleDistributorSelect = (distributor) => {
    setSelectedDistributor(distributor);
  };

  const getChartData = () => {
    if (selectedDistributor) {
      const chartData = userSatisfactionData.map((data) => ({
        month: data.month,
        satisfaction: data[selectedDistributor],
      }));

      return {
        labels: chartData.map((data) => data.month),
        datasets: [
          {
            data: chartData.map((data) => data.satisfaction),
          },
        ],
      };
    }

    return null;
  };

  return (
    <View>
      {Object.keys(userSatisfactionData[0]).map((distributor) => (
        <TouchableOpacity
          key={distributor}
          onPress={() => handleDistributorSelect(distributor)}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 10,
            paddingHorizontal: 16,
          }}
        >
          <View
            style={{
              height: 24,
              width: 24,
              borderRadius: 12,
              borderWidth: 2,
              borderColor: selectedDistributor === distributor ? 'blue' : 'gray',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 8,
            }}
          >
            {selectedDistributor === distributor && (
              <View
                style={{
                  height: 12,
                  width: 12,
                  borderRadius: 6,
                  backgroundColor: 'blue',
                }}
              />
            )}
          </View>
          <Text>{distributor}</Text>
        </TouchableOpacity>
      ))}

      {selectedDistributor ? (
        <LineChart
          data={getChartData()}
          width={Dimensions.get('window').width}
          height={220}
          chartConfig={{
            // Configure the appearance of the chart
            // You can customize the chart colors, axis labels, etc. as per your preferences
          }}
        />
      ) : (
        <Text style={{ marginTop: 20 }}>Select a distributor</Text>
      )}
    </View>
  );
};

export default UserSatisfaction;
