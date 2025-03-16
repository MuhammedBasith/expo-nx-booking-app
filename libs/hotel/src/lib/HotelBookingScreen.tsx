import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Platform, TouchableOpacity } from 'react-native';
import { Card, Title, Paragraph, Button, Divider, Chip, Surface, useTheme } from 'react-native-paper';
import { useAppContext } from '@myworkspace/shared';
import { MaterialIcons } from '@expo/vector-icons';
import { hotels } from '../../../../apps/myapp/src/data/mockData';

export function HotelBookingScreen({ route }) {
  const { hotelId } = route.params;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)); // 3 days later
  const [roomType, setRoomType] = useState('Standard');
  const { passengerCount, setPassengerCount } = useAppContext();
  const theme = useTheme();
  
  // Find the hotel details from mock data
  const hotel = hotels.find(h => h.id === hotelId) || {
    id: hotelId,
    name: 'Unknown Hotel',
    location: 'Unknown Location',
    price: 0,
    rating: 0,
    image: '',
    description: '',
    amenities: [],
  };
  
  // Format date for display
  const formatDate = (date) => {
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };
  
  // Calculate number of nights
  const calculateNights = () => {
    const diffTime = Math.abs(checkOutDate.getTime() - checkInDate.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };
  
  // Calculate total price
  const calculateTotal = () => {
    let basePrice = hotel.price;
    
    // Apply room type multiplier
    if (roomType === 'Deluxe') basePrice *= 1.5;
    else if (roomType === 'Suite') basePrice *= 2.5;
    
    return basePrice * calculateNights() * passengerCount;
  };
  
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Card style={styles.hotelSummaryCard}>
        <Card.Content>
          <Title style={styles.cardTitle}>Hotel Summary</Title>
          <View style={styles.hotelInfo}>
            <Text style={styles.hotelName}>{hotel.name}</Text>
            <View style={styles.locationContainer}>
              <MaterialIcons name="location-on" size={16} color="#7f8c8d" />
              <Text style={styles.locationText}>{hotel.location}</Text>
            </View>
            <View style={styles.ratingContainer}>
              <MaterialIcons name="star" size={16} color="#FFD700" />
              <Text style={styles.ratingText}>{hotel.rating}</Text>
            </View>
          </View>
        </Card.Content>
      </Card>
      
      <Card style={styles.bookingCard}>
        <Card.Content>
          <Title style={styles.cardTitle}>Booking Details</Title>
          
          <View style={styles.formGroup}>
            <Text style={styles.label}>Your Name</Text>
            <TextInput
              placeholder="Enter your full name"
              value={name}
              onChangeText={setName}
              style={styles.input}
              placeholderTextColor="#999"
              color="#000"
            />
          </View>
          
          <View style={styles.formGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              placeholder="Enter your email address"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              style={styles.input}
              placeholderTextColor="#999"
              color="#000"
            />
          </View>
          
          <View style={styles.formGroup}>
            <Text style={styles.label}>Phone</Text>
            <TextInput
              placeholder="Enter your phone number"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              style={styles.input}
              placeholderTextColor="#999"
              color="#000"
            />
          </View>
          
          <View style={styles.dateContainer}>
            <View style={styles.dateColumn}>
              <Text style={styles.label}>Check-in</Text>
              <Surface style={styles.dateSelector}>
                <Text style={styles.dateText}>{formatDate(checkInDate)}</Text>
                <MaterialIcons name="calendar-today" size={20} color="#4a6fa5" />
              </Surface>
            </View>
            
            <View style={styles.dateColumn}>
              <Text style={styles.label}>Check-out</Text>
              <Surface style={styles.dateSelector}>
                <Text style={styles.dateText}>{formatDate(checkOutDate)}</Text>
                <MaterialIcons name="calendar-today" size={20} color="#4a6fa5" />
              </Surface>
            </View>
          </View>
          
          <View style={styles.formGroup}>
            <Text style={styles.label}>Room Type</Text>
            <View style={styles.roomOptions}>
              {['Standard', 'Deluxe', 'Suite'].map((type) => (
                <TouchableOpacity
                  key={type}
                  style={[
                    styles.roomOption,
                    roomType === type && styles.selectedRoomOption
                  ]}
                  onPress={() => setRoomType(type)}
                >
                  <Text 
                    style={[
                      styles.roomText,
                      roomType === type && styles.selectedRoomText
                    ]}
                  >
                    {type}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          
          <View style={styles.formGroup}>
            <Text style={styles.label}>Guests</Text>
            <View style={styles.guestSelector}>
              <TouchableOpacity 
                style={styles.guestButton}
                onPress={() => setPassengerCount(Math.max(1, passengerCount - 1))}
              >
                <MaterialIcons name="remove" size={20} color="#4a6fa5" />
              </TouchableOpacity>
              <Text style={styles.guestCount}>{passengerCount}</Text>
              <TouchableOpacity 
                style={styles.guestButton}
                onPress={() => setPassengerCount(passengerCount + 1)}
              >
                <MaterialIcons name="add" size={20} color="#4a6fa5" />
              </TouchableOpacity>
            </View>
          </View>
        </Card.Content>
      </Card>
      
      <Card style={styles.pricingCard}>
        <Card.Content>
          <Title style={styles.cardTitle}>Price Summary</Title>
          
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Room Rate</Text>
            <Text style={styles.priceValue}>${hotel.price}/night</Text>
          </View>
          
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Room Type</Text>
            <Text style={styles.priceValue}>{roomType}</Text>
          </View>
          
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Number of Nights</Text>
            <Text style={styles.priceValue}>{calculateNights()}</Text>
          </View>
          
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Guests</Text>
            <Text style={styles.priceValue}>{passengerCount}</Text>
          </View>
          
          <Divider style={styles.divider} />
          
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>${calculateTotal()}</Text>
          </View>
        </Card.Content>
      </Card>
      
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          style={styles.bookButton}
          labelStyle={styles.buttonLabel}
          onPress={() => alert(`Booked hotel ${hotelId} for ${name} with ${passengerCount} guests`)}
        >
          Confirm Booking
        </Button>
      </View>
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
  hotelSummaryCard: {
    marginBottom: 16,
    borderRadius: 12,
    elevation: 2,
  },
  bookingCard: {
    marginBottom: 16,
    borderRadius: 12,
    elevation: 2,
  },
  pricingCard: {
    marginBottom: 16,
    borderRadius: 12,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#2c3e50',
  },
  hotelInfo: {
    marginBottom: 10,
  },
  hotelName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  locationText: {
    color: '#7f8c8d',
    marginLeft: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 4,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#dfe6e9',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: 'white',
    color: '#000',
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  dateColumn: {
    width: '48%',
  },
  dateSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
  },
  dateText: {
    fontSize: 14,
    color: '#2c3e50',
  },
  roomOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  roomOption: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#dfe6e9',
    marginRight: 10,
    marginBottom: 10,
  },
  selectedRoomOption: {
    backgroundColor: '#4a6fa5',
    borderColor: '#4a6fa5',
  },
  roomText: {
    fontSize: 14,
    color: '#2c3e50',
  },
  selectedRoomText: {
    color: 'white',
  },
  guestSelector: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  guestButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  guestCount: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 16,
    color: '#2c3e50',
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  priceLabel: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  priceValue: {
    fontSize: 14,
    color: '#2c3e50',
  },
  divider: {
    marginVertical: 10,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4a6fa5',
  },
  buttonContainer: {
    marginTop: 10,
    marginBottom: 30,
  },
  bookButton: {
    borderRadius: 8,
    paddingVertical: 6,
    backgroundColor: '#4a6fa5',
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});