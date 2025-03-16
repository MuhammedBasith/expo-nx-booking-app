import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';
import { AppProvider } from '@myworkspace/shared';
import { config } from '../config';
import HomeScreen from '../screens/HomeScreen';
import { HotelScreen, HotelBookingScreen } from '@myworkspace/hotel';
import { FlightScreen, FlightBookingScreen } from '@myworkspace/flight';

// Define a type for the screen props
type ScreenProps = {
  navigation: any;
  route: any;
};

// Create wrapper components instead of using inline functions
const HotelScreenWrapper = (props: ScreenProps) => (
  <HotelScreen {...props} isEnabled={config.features.hotel} />
);

const FlightScreenWrapper = (props: ScreenProps) => (
  <FlightScreen {...props} isEnabled={config.features.flight} />
);

const Stack = createStackNavigator();

export default function App() {
  return (
    <AppProvider>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ cardStyle: { flex: 1 } }}>
            <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Travel App' }} />
            <Stack.Screen
              name="Hotel"
              options={{ title: 'Hotels' }}
              component={HotelScreenWrapper}
            />
            <Stack.Screen
              name="Flight"
              options={{ title: 'Flights' }}
              component={FlightScreenWrapper}
            />
            <Stack.Screen
              name="HotelBooking"
              component={HotelBookingScreen}
              options={{ title: 'Book Hotel' }}
            />
            <Stack.Screen
              name="FlightBooking"
              component={FlightBookingScreen}
              options={{ title: 'Book Flight' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </AppProvider>
  );
}