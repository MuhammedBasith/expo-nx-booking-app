import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { HotelCard } from '@myworkspace/hotel';
import { FlightCard } from '@myworkspace/flight';
import { config } from '../config';

export default function HomeScreen() {
  const navigation = useNavigation();
  return (
    <View style={{ padding: 10 }}>
      {config.features.hotel && (
        <HotelCard onPress={() => navigation.navigate('Hotel')} />
      )}
      {config.features.flight && (
        <FlightCard onPress={() => navigation.navigate('Flight')} />
      )}
    </View>
  );
}