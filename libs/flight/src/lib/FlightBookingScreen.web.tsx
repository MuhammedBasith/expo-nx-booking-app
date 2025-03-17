import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Card, Title, Button, Divider, Surface } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { flights } from '../../../../apps/myapp/src/data/mockData';

export function FlightBookingScreen({ route }) {
  const { flightId } = route.params;
  const [boardingPass, setBoardingPass] = useState('');
  const [selectedClass, setSelectedClass] = useState('Economy');
  const [passengerCount, setPassengerCount] = useState(1);
  const [selectedDate, setSelectedDate] = useState(new Date());

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

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  const calculateTotal = () => {
    let basePrice = flight.price;
    if (selectedClass === 'Business') basePrice *= 2.5;
    else if (selectedClass === 'First') basePrice *= 4;
    else if (selectedClass === 'Premium Economy') basePrice *= 1.5;

    return basePrice * passengerCount;
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title>Flight Summary</Title>
          <Text>{flight.airline} - {flight.flightNumber}</Text>
          <Text>{flight.departureCity} → {flight.arrivalCity}</Text>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Booking Details</Title>
          <View>
            <Text>Travel Date</Text>
            <Surface>
              <Text>{formatDate(selectedDate)}</Text>
              <MaterialIcons name="calendar-today" size={20} />
            </Surface>
          </View>

          <View>
            <Text>Cabin Class</Text>
            {flight.cabinClass.map(cabinClass => (
              <TouchableOpacity key={cabinClass} onPress={() => setSelectedClass(cabinClass)}>
                <Text style={selectedClass === cabinClass ? styles.selectedText : undefined}>
                  {cabinClass}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View>
            <Text>Passengers</Text>
            <TouchableOpacity onPress={() => setPassengerCount(Math.max(1, passengerCount - 1))}>
              <MaterialIcons name="remove" size={20} />
            </TouchableOpacity>
            <Text>{passengerCount}</Text>
            <TouchableOpacity onPress={() => setPassengerCount(passengerCount + 1)}>
              <MaterialIcons name="add" size={20} />
            </TouchableOpacity>
          </View>

          <View>
            <Text>Boarding Pass ID</Text>
            <TextInput
              placeholder="Enter boarding pass ID"
              value={boardingPass}
              onChangeText={setBoardingPass}
            />
          </View>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Price Summary</Title>
          <Text>Total: ${calculateTotal()}</Text>
        </Card.Content>
      </Card>

      <Button mode="contained" onPress={() => alert(`Booked flight ${flightId} with boarding pass ${boardingPass}`)}>
        Confirm Booking
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  card: { marginBottom: 16 },
  selectedText: { fontWeight: 'bold', color: 'blue' },
});
