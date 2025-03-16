import { View, Text, TextInput, Button } from 'react-native';
import { useState } from 'react';
import { useAppContext } from '@myworkspace/shared';

export function HotelBookingScreen({ route }) {
  const { hotelId } = route.params;
  const [name, setName] = useState('');
  const { passengerCount, setPassengerCount } = useAppContext();
  return (
    <View style={{ padding: 10 }}>
      <Text>Book Hotel {hotelId}</Text>
      <TextInput
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />
      <Text>Passengers: {passengerCount}</Text>
      <Button title="Add Passenger" onPress={() => setPassengerCount(passengerCount + 1)} />
      <Button
        title="Book"
        onPress={() => alert(`Booked hotel ${hotelId} for ${name} with ${passengerCount} passengers`)}
      />
    </View>
  );
}