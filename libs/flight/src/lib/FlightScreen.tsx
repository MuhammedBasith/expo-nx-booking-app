import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export function FlightScreen({ isEnabled = true }) {
  const navigation = useNavigation();
  if (!isEnabled) {
    return <Text style={{ padding: 10 }}>Flight feature is not enabled</Text>;
  }
  const flights = [
    { id: 1, name: 'Flight A', price: 200 },
    { id: 2, name: 'Flight B', price: 250 },
  ];
  return (
    <View style={{ padding: 10 }}>
      {flights.map(flight => (
        <View key={flight.id} style={{ marginBottom: 20 }}>
          <Text>{flight.name} - ${flight.price}</Text>
          <Button
            title="Book Flight"
            onPress={() => navigation.navigate('FlightBooking', { flightId: flight.id })}
          />
        </View>
      ))}
    </View>
  );
}