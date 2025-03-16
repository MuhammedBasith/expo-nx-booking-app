import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Card, Title, Paragraph, Button, Surface } from 'react-native-paper';
import { flights } from '../../../../apps/myapp/src/data/mockData';
import { MaterialIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const isWeb = Platform.OS === 'web';

export function FlightScreen({ isEnabled = true }) {
  const navigation = useNavigation();
  
  if (!isEnabled) {
    return (
      <View style={styles.disabledContainer}>
        <MaterialIcons name="flight-off" size={64} color="#ccc" />
        <Text style={styles.disabledText}>Flight feature is not enabled</Text>
      </View>
    );
  }
  
  // Use the first 5 flights from our mock data
  const availableFlights = flights.slice(0, 5);
  
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Title style={styles.headerTitle}>Available Flights</Title>
        <Paragraph style={styles.headerSubtitle}>Select a flight to book</Paragraph>
      </View>
      
      {availableFlights.map(flight => (
        <Card key={flight.id} style={styles.card}>
          <Card.Content>
            <View style={styles.flightHeader}>
              <View style={styles.airlineInfo}>
                <Title style={styles.flightName}>{flight.airline}</Title>
                <Paragraph style={styles.flightNumber}>{flight.flightNumber}</Paragraph>
              </View>
              <View style={styles.priceContainer}>
                <Text style={styles.price}>${flight.price}</Text>
              </View>
            </View>
            
            <View style={styles.flightDetails}>
              <View style={styles.locationTime}>
                <Text style={styles.time}>{flight.departureTime}</Text>
                <Text style={styles.location}>{flight.departureCity}</Text>
              </View>
              
              <View style={styles.flightPath}>
                <View style={styles.line} />
                <MaterialIcons name="flight" size={24} color="#4a6fa5" style={styles.flightIcon} />
              </View>
              
              <View style={styles.locationTime}>
                <Text style={styles.time}>{flight.arrivalTime}</Text>
                <Text style={styles.location}>{flight.arrivalCity}</Text>
              </View>
            </View>
            
            <View style={styles.flightInfo}>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Duration</Text>
                <Text style={styles.infoValue}>{flight.duration}</Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Aircraft</Text>
                <Text style={styles.infoValue}>{flight.aircraft}</Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Available</Text>
                <Text style={styles.infoValue}>{flight.seatsAvailable} seats</Text>
              </View>
            </View>
          </Card.Content>
          
          <Card.Actions style={styles.cardActions}>
            <Button 
              mode="contained" 
              style={styles.bookButton}
              labelStyle={styles.buttonLabel}
              onPress={() => navigation.navigate('FlightBooking', { flightId: flight.id })}
            >
              Book Flight
            </Button>
            <Button 
              mode="outlined"
              style={styles.detailsButton}
              labelStyle={styles.detailsButtonLabel}
            >
              Details
            </Button>
          </Card.Actions>
        </Card>
      ))}
    </ScrollView>
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
  disabledContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  disabledText: {
    fontSize: 18,
    color: '#999',
    marginTop: 10,
  },
  header: {
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#7f8c8d',
  },
  card: {
    marginBottom: 20,
    borderRadius: 12,
    elevation: 3,
    backgroundColor: 'white',
  },
  flightHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  airlineInfo: {
    flex: 1,
  },
  flightName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  flightNumber: {
    color: '#7f8c8d',
  },
  priceContainer: {
    backgroundColor: '#e1f5fe',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0288d1',
  },
  flightDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  locationTime: {
    alignItems: 'center',
    width: 80,
  },
  time: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  location: {
    fontSize: 14,
    color: '#7f8c8d',
    textAlign: 'center',
  },
  flightPath: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    height: 30,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#dfe6e9',
  },
  flightIcon: {
    position: 'absolute',
    left: '50%',
    marginLeft: -12,
    transform: [{ rotate: '90deg' }],
  },
  flightInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  infoItem: {
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 12,
    color: '#7f8c8d',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2c3e50',
  },
  cardActions: {
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingBottom: 15,
    paddingTop: 5,
  },
  bookButton: {
    flex: 1,
    marginRight: 10,
    borderRadius: 8,
    backgroundColor: '#4a6fa5',
  },
  buttonLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    paddingVertical: 2,
  },
  detailsButton: {
    borderRadius: 8,
    borderColor: '#4a6fa5',
  },
  detailsButtonLabel: {
    color: '#4a6fa5',
    fontSize: 14,
  },
});