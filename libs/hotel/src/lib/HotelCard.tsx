import React from 'react';
import { View, StyleSheet, Image, Dimensions, Platform } from 'react-native';
import { Card, Title, Text, Surface } from 'react-native-paper';
import { hotels } from '../../../../apps/myapp/src/data/mockData';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');
const isWeb = Platform.OS === 'web';

export function HotelCard({ onPress }: any) {
  // Get featured hotels (top 3 by rating)
  const featuredHotels = [...hotels]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);
  
  return (
    <View>
      <Card 
        style={styles.card} 
        onPress={onPress}
        elevation={3}
      >
        <LinearGradient
          colors={['#6a11cb', '#2575fc']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientHeader}
        >
          <Title style={styles.cardTitle}>Hotels to Stay</Title>
          <Text style={styles.cardSubtitle}>Find your perfect stay</Text>
        </LinearGradient>
        
        <Card.Content style={styles.content}>
          <Text style={styles.featuredText}>Featured Hotels</Text>
          
          {featuredHotels.map((hotel, index) => (
            <HotelItem 
              key={hotel.id} 
              hotel={hotel} 
              index={index} 
            />
          ))}
          
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{hotels.length}+</Text>
              <Text style={styles.statLabel}>Hotels</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>24/7</Text>
              <Text style={styles.statLabel}>Support</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>4.8</Text>
              <Text style={styles.statLabel}>Rating</Text>
            </View>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
}

function HotelItem({ hotel, index }: { hotel: any, index: number }) {
  return (
    <View style={styles.hotelItem}>
      <Image 
        source={{ uri: hotel.image }} 
        style={styles.hotelImage} 
      />
      <View style={styles.hotelInfo}>
        <Text style={styles.hotelName}>{hotel.name}</Text>
        <Text style={styles.hotelLocation}>{hotel.location}</Text>
        <View style={styles.ratingPrice}>
          <Surface style={styles.ratingBadge}>
            <Text style={styles.ratingText}>★ {hotel.rating}</Text>
          </Surface>
          <Text style={styles.priceText}>${hotel.price}/night</Text>
        </View>
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
  hotelItem: {
    flexDirection: 'row',
    marginBottom: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  hotelImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    margin: 8,
  },
  hotelInfo: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  hotelName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
  },
  hotelLocation: {
    fontSize: 14,
    color: '#7f8c8d',
    marginTop: 2,
  },
  ratingPrice: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  ratingBadge: {
    backgroundColor: '#ffeaa7',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    elevation: 0,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#d35400',
  },
  priceText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2980b9',
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