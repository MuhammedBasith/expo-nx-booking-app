import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Platform, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { Card, Title, Paragraph, Button, Divider, Surface, Chip, useTheme } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { flights } from '../../../../apps/myapp/src/data/mockData';

export function FlightBookingScreen({ route, navigation }) {
  const { flightId } = route.params;
  const [boardingPass, setBoardingPass] = useState('');
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [selectedClass, setSelectedClass] = useState('Economy');
  const [passengerCount, setPassengerCount] = useState(1);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const theme = useTheme();

  // Find the flight details from mock data
  const flight = flights.find(f => f.id === flightId) || {
    id: flightId,
    airline: 'Unknown Airline',
    flightNumber: 'XX000',
    departureCity: 'Departure',
    arrivalCity: 'Arrival',
    departureTime: '00:00',
    arrivalTime: '00:00',
    price: 0,
    duration: '0h 0m',
    cabinClass: ['Economy'],
  };


  useEffect(() => {
    if (permission?.granted === false) {
      console.error('Camera permission denied.');
    }
  }, [permission]);

  // Format date for display
  const formatDate = (date) => {
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  // Calculate total price
  const calculateTotal = () => {
    let basePrice = flight.price;

    // Apply class multiplier
    if (selectedClass === 'Business') basePrice *= 2.5;
    else if (selectedClass === 'First') basePrice *= 4;
    else if (selectedClass === 'Premium Economy') basePrice *= 1.5;

    return basePrice * passengerCount;
  };

  if (Platform.OS === 'web') {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <Card style={styles.flightSummaryCard}>
          <Card.Content>
            <Title style={styles.cardTitle}>Flight Summary</Title>
            <View style={styles.flightInfo}>
              <View style={styles.airlineInfo}>
                <Text style={styles.airline}>{flight.airline}</Text>
                <Text style={styles.flightNumber}>{flight.flightNumber}</Text>
              </View>

              <View style={styles.flightRoute}>
                <View style={styles.cityInfo}>
                  <Text style={styles.cityCode}>{flight.departureCity.substring(0, 3).toUpperCase()}</Text>
                  <Text style={styles.time}>{flight.departureTime}</Text>
                </View>

                <View style={styles.routeLine}>
                  <View style={styles.line} />
                  <MaterialIcons name="flight" size={20} color="#4a6fa5" style={styles.planeIcon} />
                  <Text style={styles.duration}>{flight.duration}</Text>
                </View>

                <View style={styles.cityInfo}>
                  <Text style={styles.cityCode}>{flight.arrivalCity.substring(0, 3).toUpperCase()}</Text>
                  <Text style={styles.time}>{flight.arrivalTime}</Text>
                </View>
              </View>
            </View>
          </Card.Content>
        </Card>

        <Card style={styles.bookingCard}>
          <Card.Content>
            <Title style={styles.cardTitle}>Booking Details</Title>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Travel Date</Text>
              <Surface style={styles.dateSelector}>
                <Text style={styles.dateText}>{formatDate(selectedDate)}</Text>
                <MaterialIcons name="calendar-today" size={20} color="#4a6fa5" />
              </Surface>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Cabin Class</Text>
              <View style={styles.classOptions}>
                {flight.cabinClass.map((cabinClass) => (
                  <TouchableOpacity
                    key={cabinClass}
                    style={[
                      styles.classOption,
                      selectedClass === cabinClass && styles.selectedClassOption
                    ]}
                    onPress={() => setSelectedClass(cabinClass)}
                  >
                    <Text
                      style={[
                        styles.classText,
                        selectedClass === cabinClass && styles.selectedClassText
                      ]}
                    >
                      {cabinClass}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Passengers</Text>
              <View style={styles.passengerSelector}>
                <TouchableOpacity
                  style={styles.passengerButton}
                  onPress={() => setPassengerCount(Math.max(1, passengerCount - 1))}
                >
                  <MaterialIcons name="remove" size={20} color="#4a6fa5" />
                </TouchableOpacity>
                <Text style={styles.passengerCount}>{passengerCount}</Text>
                <TouchableOpacity
                  style={styles.passengerButton}
                  onPress={() => setPassengerCount(passengerCount + 1)}
                >
                  <MaterialIcons name="add" size={20} color="#4a6fa5" />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Boarding Pass ID</Text>
              <TextInput
                placeholder="Enter boarding pass ID"
                value={boardingPass}
                onChangeText={setBoardingPass}
                style={styles.input}
                placeholderTextColor="#999"
                color="#000"
              />
            </View>
          </Card.Content>
        </Card>

        <Card style={styles.pricingCard}>
          <Card.Content>
            <Title style={styles.cardTitle}>Price Summary</Title>

            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Base Price</Text>
              <Text style={styles.priceValue}>${flight.price} x {passengerCount}</Text>
            </View>

            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Cabin Class</Text>
              <Text style={styles.priceValue}>{selectedClass}</Text>
            </View>

            <Divider style={styles.divider} />

            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>${calculateTotal()}</Text>
            </View>
          </Card.Content>
        </Card>

        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            style={styles.bookButton}
            labelStyle={styles.buttonLabel}
            onPress={() => alert(`Booked flight ${flightId} with boarding pass ${boardingPass}`)}
          >
            Confirm Booking
          </Button>
        </View>
      </ScrollView>
    );
  }

  if (!permission) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Requesting camera permission...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>No access to camera</Text>
        <Button
          mode="contained"
          style={styles.permissionButton}
          onPress={requestPermission}
        >
          Grant Permission
        </Button>
      </View>
    );
  }

  // If camera permission is granted, display camera view
  return (
    <View style={styles.container}>
      <View style={styles.cameraHeader}>
        <Text style={styles.cameraTitle}>Scan Your Boarding Pass</Text>
        <Text style={styles.cameraSubtitle}>for flight #{flight.flightNumber}</Text>
      </View>

      <CameraView style={styles.camera} facing={facing}>
        <View style={styles.cameraOverlay}>
          <View style={styles.scanFrame} />
          <Text style={styles.scanText}>Position the QR code within the frame</Text>

          <Button
            mode="contained"
            style={styles.manualButton}
            labelStyle={styles.buttonLabel}
            onPress={() => navigation.goBack()}
          >
            Enter Details Manually
          </Button>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 30,
  },
  flightSummaryCard: {
    marginBottom: 16,
    borderRadius: 12,
    elevation: 2,
  },
  bookingCard: {
    marginBottom: 16,
    borderRadius: 12,
    elevation: 2,
  },
  pricingCard: {
    marginBottom: 16,
    borderRadius: 12,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#2c3e50',
  },
  flightInfo: {
    marginBottom: 10,
  },
  airlineInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  airline: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  flightNumber: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  flightRoute: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cityInfo: {
    alignItems: 'center',
    width: 60,
  },
  cityCode: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  time: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  routeLine: {
    flex: 1,
    alignItems: 'center',
    position: 'relative',
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: '#dfe6e9',
    position: 'absolute',
    top: 10,
  },
  planeIcon: {
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 5,
    transform: [{ rotate: '90deg' }],
  },
  duration: {
    fontSize: 12,
    color: '#7f8c8d',
    marginTop: 5,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 8,
  },
  dateSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
  },
  dateText: {
    fontSize: 16,
    color: '#2c3e50',
  },
  classOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  classOption: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#dfe6e9',
    marginRight: 10,
    marginBottom: 10,
  },
  selectedClassOption: {
    backgroundColor: '#4a6fa5',
    borderColor: '#4a6fa5',
  },
  classText: {
    fontSize: 14,
    color: '#2c3e50',
  },
  selectedClassText: {
    color: 'white',
  },
  passengerSelector: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  passengerButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  passengerCount: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 16,
    color: '#2c3e50',
  },
  input: {
    borderWidth: 1,
    borderColor: '#dfe6e9',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: 'white',
    color: '#000',
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  priceLabel: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  priceValue: {
    fontSize: 14,
    color: '#2c3e50',
  },
  divider: {
    marginVertical: 10,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4a6fa5',
  },
  buttonContainer: {
    marginTop: 10,
    marginBottom: 30,
  },
  bookButton: {
    borderRadius: 8,
    paddingVertical: 6,
    backgroundColor: '#4a6fa5',
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  camera: {
    flex: 1,
  },
  cameraHeader: {
    padding: 20,
    backgroundColor: '#4a6fa5',
    alignItems: 'center',
  },
  cameraTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  cameraSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  cameraOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  scanFrame: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 12,
    marginBottom: 20,
  },
  scanText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
  },
  manualButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 8,
  },
  message: {
    textAlign: 'center',
    fontSize: 16,
    color: '#2c3e50',
    marginBottom: 20,
    marginTop: 20,
  },
  permissionButton: {
    marginHorizontal: 20,
    borderRadius: 8,
    backgroundColor: '#4a6fa5',
  },
});
