import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';

const PerformanceAnalysis = () => {
  const [clientSatisfactionData] = useState([
    { distributor: 'UEDCL', satisfaction: 4.5 },
    { distributor: 'UMEME', satisfaction: 3.8 },
    { distributor: 'REA', satisfaction: 4.2 },
    { distributor: 'BUKI', satisfaction: 4.0 },
    { distributor: 'PADER', satisfaction: 3.5 },
    { distributor: 'LIRA', satisfaction: 4.1 },
    { distributor: 'KISORO', satisfaction: 3.9 },
  ]);
  const [selectedDistributor, setSelectedDistributor] = useState('');

  const handleDistributorSelect = (distributor) => {
    setSelectedDistributor(distributor);
  };

  const filteredData = clientSatisfactionData.find(
    (item) => item.distributor === selectedDistributor
  );

  return (
    <View>
      {clientSatisfactionData.map((item) => (
        <TouchableOpacity
          key={item.distributor}
          onPress={() => handleDistributorSelect(item.distributor)}
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
              borderColor: selectedDistributor === item.distributor ? 'blue' : 'gray',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 8,
            }}
          >
            {selectedDistributor === item.distributor && (
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
          <Text>{item.distributor}</Text>
        </TouchableOpacity>
      ))}

      {selectedDistributor ? (
        <View style={{ marginTop: 20 }}>
          <Text>{filteredData.distributor}</Text>
          <Text>Satisfaction: {filteredData.satisfaction}</Text>
        </View>
      ) : (
        <Text style={{ marginTop: 20 }}>Select a distributor</Text>
      )}
    </View>
  );
};

export default PerformanceAnalysis;
