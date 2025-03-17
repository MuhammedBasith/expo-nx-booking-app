import { config } from '../config';
import {Platform} from 'react-native';
import React, { Suspense, lazy } from 'react';
import { AppProvider } from '@myworkspace/shared';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';


const HomeScreen = lazy(() => import('../screens/HomeScreen'));

const HotelScreen = lazy(() =>
  import('@myworkspace/hotel').then(module => ({ default: module.HotelScreen }))
);

const HotelBookingScreen = lazy(() =>
  import('@myworkspace/hotel').then(module => ({ default: module.HotelBookingScreen }))
);

const FlightScreen = lazy(() =>
  import('@myworkspace/flight').then(module => ({ default: module.FlightScreen }))
);

const FlightBookingScreen = lazy(() =>
  import(`@myworkspace/flight/FlightBookingScreen.${Platform.OS === 'web' ? 'web' : 'mobile'}`)
)


type ScreenProps = {
  navigation: any;
  route: any;
};

// wrapper components for lazy-loaded screens
const HotelScreenWrapper = (props: ScreenProps) => (
  <Suspense fallback={null}>
    <HotelScreen {...props} isEnabled={config.features.hotel} />
  </Suspense>
);

const FlightScreenWrapper = (props: ScreenProps) => (
  <Suspense fallback={null}>
    <FlightScreen {...props} isEnabled={config.features.flight} />
  </Suspense>
);

const Stack = createStackNavigator();

export default function App() {
  return (
    <AppProvider>
      <PaperProvider>
        <NavigationContainer>
          <Suspense fallback={null}>
            <Stack.Navigator screenOptions={{ cardStyle: { flex: 1 } }}>
              <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Travel App' }} />
              <Stack.Screen name="Hotel" component={HotelScreenWrapper} options={{ title: 'Hotels' }} />
              <Stack.Screen name="Flight" component={FlightScreenWrapper} options={{ title: 'Flights' }} />
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
          </Suspense>
        </NavigationContainer>
      </PaperProvider>
    </AppProvider>
  );
}
