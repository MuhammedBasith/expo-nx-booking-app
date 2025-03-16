import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Platform, StyleSheet } from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';

export function FlightBookingScreen({ route }) {

  const { flightId } = route.params;
  const [boardingPass, setBoardingPass] = useState('');
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions(); // Use useCameraPermissions

  // Handle permission status and camera availability
  useEffect(() => {
    if (permission?.granted === false) {
      console.error('Camera permission denied.');
    }
  }, [permission]);

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
  }

  if (!permission) {
    return <View style={styles.container}><Text>Requesting camera permission...</Text></View>;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text>No access to camera</Text>
        <Button title="Grant Permission" onPress={requestPermission} />
      </View>
    );
  }

  // If camera permission is granted, display camera view
  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing}>
        <View style={styles.buttonContainer}>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
  },
  camera: {
    flex: 1,
  },
  cameraOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 20,
    backgroundColor: 'transparent',
  },

  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});
