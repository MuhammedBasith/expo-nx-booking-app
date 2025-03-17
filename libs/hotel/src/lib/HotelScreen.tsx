import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, Platform, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Card, Title, Paragraph, Button, Chip, Surface } from 'react-native-paper';
import { hotels } from '../../../../apps/myapp/src/data/mockData';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');
const isWeb = Platform.OS === 'web';

export function HotelScreen({ isEnabled = true }) {
  const navigation = useNavigation();

  if (!isEnabled) {
    return (
      <View style={styles.disabledContainer}>
        <MaterialIcons name="hotel-class" size={64} color="#ccc" />
        <Text style={styles.disabledText}>Hotel feature is not enabled</Text>
      </View>
    );
  }

  // using first five
  const availableHotels = hotels.slice(0, 5);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Title style={styles.headerTitle}>Hotels to Stay</Title>
        <Paragraph style={styles.headerSubtitle}>Find your perfect stay</Paragraph>
      </View>

      {availableHotels.map(hotel => (
        <Card key={hotel.id} style={styles.card}>
          <ImageBackground
            source={{ uri: hotel.image }}
            style={styles.hotelImage}
            imageStyle={styles.hotelImageStyle}
          >
            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,0.8)']}
              style={styles.imageGradient}
            >
              <View style={styles.hotelImageContent}>
                <View style={styles.ratingContainer}>
                  <MaterialIcons name="star" size={16} color="#FFD700" />
                  <Text style={styles.ratingText}>{hotel.rating}</Text>
                </View>
                <Text style={styles.hotelPrice}>${hotel.price}<Text style={styles.perNight}>/night</Text></Text>
              </View>
            </LinearGradient>
          </ImageBackground>

          <Card.Content style={styles.cardContent}>
            <Title style={styles.hotelName}>{hotel.name}</Title>
            <View style={styles.locationContainer}>
              <MaterialIcons name="location-on" size={16} color="#7f8c8d" />
              <Text style={styles.locationText}>{hotel.location}</Text>
            </View>

            <Text style={styles.description} numberOfLines={2}>
              {hotel.description}
            </Text>

            <View style={styles.amenitiesContainer}>
              {hotel.amenities.slice(0, 3).map((amenity, index) => (
                <Chip
                  key={index}
                  style={styles.amenityChip}
                  textStyle={styles.amenityText}
                >
                  {amenity}
                </Chip>
              ))}
              {hotel.amenities.length > 3 && (
                <Chip
                  style={styles.moreChip}
                  textStyle={styles.moreChipText}
                >
                  +{hotel.amenities.length - 3} more
                </Chip>
              )}
            </View>
          </Card.Content>

          <Card.Actions style={styles.cardActions}>
            <Button
              mode="contained"
              style={styles.bookButton}
              labelStyle={styles.buttonLabel}
              onPress={() => navigation.navigate('HotelBooking', { hotelId: hotel.id })}
            >
              Book Now
            </Button>
            <Button
              mode="outlined"
              style={styles.detailsButton}
              labelStyle={styles.detailsButtonLabel}
            >
              View Details
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
    overflow: 'hidden',
    elevation: 3,
    backgroundColor: 'white',
  },
  hotelImage: {
    height: 200,
    justifyContent: 'flex-end',
  },
  hotelImageStyle: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  imageGradient: {
    padding: 16,
  },
  hotelImageContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
  },
  ratingText: {
    marginLeft: 4,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  hotelPrice: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  perNight: {
    fontSize: 14,
    fontWeight: 'normal',
  },
  cardContent: {
    paddingVertical: 16,
  },
  hotelName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  locationText: {
    color: '#7f8c8d',
    marginLeft: 4,
  },
  description: {
    color: '#2c3e50',
    marginBottom: 16,
    lineHeight: 20,
  },
  amenitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  amenityChip: {
    marginRight: 8,
    marginBottom: 8,
    backgroundColor: '#f0f7ff',
  },
  amenityText: {
    color: '#4a6fa5',
    fontSize: 12,
  },
  moreChip: {
    marginRight: 8,
    marginBottom: 8,
    backgroundColor: '#f0f0f0',
  },
  moreChipText: {
    color: '#7f8c8d',
    fontSize: 12,
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
