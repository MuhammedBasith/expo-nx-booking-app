import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { Button } from 'react-native-paper';

export function FlightBookingScreen({ navigation }) {
  const [boardingPass, setBoardingPass] = useState('');
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<CameraType>('back');

  useEffect(() => {
    if (permission?.granted === false) {
      console.error('Camera permission denied.');
    }
  }, [permission]);

  if (!permission) {
    return <View style={styles.container}><Text>Requesting camera permission...</Text></View>;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text>No access to camera</Text>
        <Button mode="contained" onPress={requestPermission}>Grant Permission</Button>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>Scan Your Boarding Pass</Text>
      <CameraView style={styles.camera} facing={facing}>
        <View style={styles.overlay}>
          <View style={styles.scanFrame} />
          <Text>Position the QR code within the frame</Text>
          <Button mode="contained" onPress={() => navigation.goBack()}>Enter Manually</Button>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  camera: { flex: 1 },
  overlay: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  scanFrame: { width: 250, height: 250, borderWidth: 2, borderColor: 'white' },
});
