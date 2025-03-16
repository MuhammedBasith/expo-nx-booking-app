import React from 'react';
import { View, StyleSheet, Image, Dimensions, Platform } from 'react-native';
import { Card, Title, Text, Surface, Divider } from 'react-native-paper';
import { flights } from '../../../../apps/myapp/src/data/mockData';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const isWeb = Platform.OS === 'web';

export function FlightCard({ onPress }: any) {
  // Get featured flights (cheapest direct flights)
  const featuredFlights = [...flights]
    .filter(flight => flight.stops === 0)
    .sort((a, b) => a.price - b.price)
    .slice(0, 3);
  
  return (
    <View>
      <Card 
        style={styles.card} 
        onPress={onPress}
        elevation={3}
      >
        <LinearGradient
          colors={['#11998e', '#38ef7d']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientHeader}
        >
          <Title style={styles.cardTitle}>Flight Deals</Title>
          <Text style={styles.cardSubtitle}>Explore the world for less</Text>
        </LinearGradient>
        
        <Card.Content style={styles.content}>
          <Text style={styles.featuredText}>Best Direct Flights</Text>
          
          {featuredFlights.map((flight, index) => (
            <FlightItem 
              key={flight.id} 
              flight={flight} 
              index={index} 
            />
          ))}
          
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{flights.length}+</Text>
              <Text style={styles.statLabel}>Routes</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>15+</Text>
              <Text style={styles.statLabel}>Airlines</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>$780</Text>
              <Text style={styles.statLabel}>Avg Price</Text>
            </View>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
}

function FlightItem({ flight, index }: { flight: any, index: number }) {
  return (
    <View style={styles.flightItem}>
      <View style={styles.airlineContainer}>
        <Image 
          source={{ uri: flight.logo }} 
          style={styles.airlineLogo} 
          resizeMode="contain"
        />
        <Text style={styles.airlineName}>{flight.airline}</Text>
      </View>
      
      <View style={styles.flightRoute}>
        <Text style={styles.cityCode}>{flight.departureCity.substring(0, 3).toUpperCase()}</Text>
        <View style={styles.flightPath}>
          <View style={styles.dashedLine} />
          <MaterialIcons name="flight" size={20} color="#3498db" style={styles.planeIcon} />
        </View>
        <Text style={styles.cityCode}>{flight.arrivalCity.substring(0, 3).toUpperCase()}</Text>
      </View>
      
      <View style={styles.flightDetails}>
        <Text style={styles.flightTime}>{flight.duration}</Text>
        <Surface style={styles.priceBadge}>
          <Text style={styles.priceText}>${flight.price}</Text>
        </Surface>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: 'white',
    marginVertical: 8,
  },
  gradientHeader: {
    padding: 20,
    paddingBottom: 25,
  },
  cardTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  cardSubtitle: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 16,
  },
  content: {
    padding: 10,
  },
  featuredText: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 12,
    color: '#2c3e50',
  },
  flightItem: {
    marginBottom: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  airlineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  airlineLogo: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  airlineName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
  },
  flightRoute: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
    paddingHorizontal: 5,
  },
  cityCode: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    width: 50,
    textAlign: 'center',
  },
  flightPath: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    position: 'relative',
  },
  dashedLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#dfe6e9',
  },
  planeIcon: {
    position: 'absolute',
    left: '50%',
    marginLeft: -10,
    transform: [{ rotate: '90deg' }],
  },
  flightDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  flightTime: {
    fontSize: 14,
    fontWeight: '500',
    color: '#7f8c8d',
  },
  priceBadge: {
    backgroundColor: '#e1f5fe',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    elevation: 0,
  },
  priceText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0288d1',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#ecf0f1',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  statLabel: {
    fontSize: 12,
    color: '#7f8c8d',
    marginTop: 2,
  },
});