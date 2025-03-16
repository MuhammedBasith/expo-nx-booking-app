import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export function HotelScreen({ isEnabled = true }) {
  const navigation = useNavigation();
  if (!isEnabled) {
    return <Text style={{ padding: 10 }}>Hotel feature is not enabled</Text>;
  }
  const hotels = [
    { id: 1, name: 'Hotel A', price: 100 },
    { id: 2, name: 'Hotel B', price: 150 },
  ];
  return (
    <View style={{ padding: 10 }}>
      {hotels.map(hotel => (
        <View key={hotel.id} style={{ marginBottom: 20 }}>
          <Text>{hotel.name} - ${hotel.price}</Text>
          <Button
            title="Book Now"
            onPress={() => navigation.navigate('HotelBooking', { hotelId: hotel.id })}
          />
        </View>
      ))}
    </View>
  );
}