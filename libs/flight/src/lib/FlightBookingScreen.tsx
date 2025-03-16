import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Platform } from 'react-native';
import { Camera } from 'expo-camera';

export function FlightBookingScreen({ route }) {
  const { flightId } = route.params;
  const [boardingPass, setBoardingPass] = useState('');
  const [hasPermission, setHasPermission] = useState(null);

  // Request camera permission when the component is mounted
  useEffect(() => {
    const requestPermission = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    requestPermission();
  }, []);

  // Debugging check to see if the Camera module is correctly imported
  useEffect(() => {
    if (!Camera) {
      console.error("Camera module is not loaded properly.");
    } else {
      console.log("Camera module loaded:", Camera);
    }
  }, []);

  if (Platform.OS === 'web') {
    return (
      <View style={{ padding: 10 }}>
        <Text>Book Flight {flightId}</Text>
        <TextInput
          placeholder="Enter boarding pass ID"
          value={boardingPass}
          onChangeText={setBoardingPass}
          style={{ borderBottomWidth: 1, marginBottom: 10 }}
        />
        <Button
          title="Book"
          onPress={() => alert(`Booked flight ${flightId} with boarding pass ${boardingPass}`)}
        />
      </View>
    );
  } else {
    if (hasPermission === null) {
      return (
        <View style={{ padding: 10 }}>
          <Text>Requesting camera permission...</Text>
        </View>
      );
    }

    if (hasPermission === false) {
      return (
        <View style={{ padding: 10 }}>
          <Text>No access to camera</Text>
        </View>
      );
    }

    return (
      <View style={{ flex: 1 }}>
        {/* Ensure Camera.Constants.Type is accessed correctly */}
        {Camera.Constants && Camera.Constants.Type ? (
          <Camera style={{ flex: 1 }} type={Camera.Constants.Type.back}>
            <View style={{ flex: 1, justifyContent: 'flex-end', padding: 20 }}>
              <Button
                title="Scan Boarding Pass"
                onPress={() => {
                  setBoardingPass('scanned-id'); // Simulate scan
                  alert(`Booked flight ${flightId} with boarding pass scanned-id`);
                }}
              />
            </View>
          </Camera>
        ) : (
          <Text>Camera module is not available</Text>
        )}
      </View>
    );
  }
}
