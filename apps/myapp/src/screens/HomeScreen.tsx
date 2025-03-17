import React from 'react';
import { View, StyleSheet, ScrollView, Dimensions, Platform, ImageBackground, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { HotelCard } from '@myworkspace/hotel';
import { FlightCard } from '@myworkspace/flight';
import { config } from '../config';
import { Text, Surface } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');
const isWeb = Platform.OS === 'web';

const DESTINATION_IMAGES = {
  'Bali': 'https://images.unsplash.com/photo-1537996194471-e657df975ab4',
  'Paris': 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34',
  'Tokyo': 'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc',
  'New York': 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9',
  'Santorini': 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff',
  'Maldives': 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8',
};


type DestinationCardProps = {
  destination: string;
  imageUrl: string;
  index: number;
  onPress: () => void;
};


type NavigationProp = {
  navigate: (screen: string, params?: any) => void;
};

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Travel Explorer</Text>
          <Text style={styles.headerSubtitle}>Discover your perfect getaway</Text>

          <View style={styles.searchBar}>
            <Text style={styles.searchText}>Where would you like to go?</Text>
          </View>
        </View>

        <View style={styles.wavyBackground}>
          <View style={styles.wave} />
          <View style={[styles.wave, styles.wave2]} />
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={true}
      >
        <View style={styles.cardsContainer}>
          {config.features.hotel && (
            <View style={[styles.cardWrapper, isWeb && styles.webCardWrapper]}>
              <HotelCard onPress={() => navigation.navigate('Hotel')} />
            </View>
          )}

          {config.features.flight && (
            <View style={[styles.cardWrapper, isWeb && styles.webCardWrapper]}>
              <FlightCard onPress={() => navigation.navigate('Flight')} />
            </View>
          )}
        </View>

        <View style={styles.featuredSection}>
          <Text style={styles.sectionTitle}>Featured Destinations</Text>
          <View style={styles.featuredGrid}>
            {Object.entries(DESTINATION_IMAGES).map(([destination, imageUrl], index) => (
              <DestinationCard
                key={destination}
                destination={destination}
                imageUrl={imageUrl}
                index={index}
                onPress={() => {
                  // dummy nav for now.
                  console.log(`Navigate to ${destination}`);
                }}
              />
            ))}
          </View>
        </View>

        <View style={styles.travelTipsSection}>
          <Text style={styles.sectionTitle}>Travel Tips</Text>
          <Surface style={styles.tipCard}>
            <Text style={styles.tipTitle}>Pack Smart</Text>
            <Text style={styles.tipText}>
              Roll clothes instead of folding them to save space and prevent wrinkles.
            </Text>
          </Surface>

          <Surface style={styles.tipCard}>
            <Text style={styles.tipTitle}>Stay Hydrated</Text>
            <Text style={styles.tipText}>
              Always carry a reusable water bottle, especially during long flights.
            </Text>
          </Surface>
        </View>
      </ScrollView>
    </View>
  );
}

function DestinationCard({ destination, imageUrl, onPress }: DestinationCardProps) {
  return (
    <View style={[
      styles.destinationCardContainer,
      isWeb && styles.webDestinationCardContainer
    ]}>
      <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
        <ImageBackground
          source={{ uri: imageUrl }}
          style={styles.destinationImage}
          imageStyle={styles.destinationImageStyle}
        >
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.7)']}
            style={styles.destinationGradient}
          >
            <Text style={styles.destinationText}>{destination}</Text>
          </LinearGradient>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    height: isWeb ? height : undefined,
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
    paddingBottom: 40,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    overflow: 'hidden',
    backgroundColor: '#4a6fa5',
  },
  headerContent: {
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 5,
  },
  searchBar: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    marginTop: 20,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
  },
  wavyBackground: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 50,
    overflow: 'hidden',
  },
  wave: {
    position: 'absolute',
    bottom: -20,
    left: 0,
    right: 0,
    height: 50,
    backgroundColor: '#f8f9fa',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  wave2: {
    bottom: -30,
    opacity: 0.5,
    backgroundColor: '#f8f9fa',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingTop: 0,
    paddingBottom: 30,
  },
  cardsContainer: {
    flexDirection: isWeb && width > 768 ? 'row' : 'column',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  cardWrapper: {
    marginBottom: 16,
    width: '100%',
  },
  webCardWrapper: {
    width: '48%',
  },
  featuredSection: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#2c3e50',
  },
  featuredGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  destinationCardContainer: {
    width: '48%',
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  webDestinationCardContainer: {
    width: width > 1200 ? '32%' : '48%',
  },
  destinationImage: {
    height: 150,
    justifyContent: 'flex-end',
  },
  destinationImageStyle: {
    borderRadius: 12,
  },
  destinationGradient: {
    padding: 12,
    borderRadius: 12,
  },
  destinationText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  travelTipsSection: {
    marginTop: 30,
    marginBottom: 20,
  },
  tipCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#2c3e50',
  },
  tipText: {
    fontSize: 14,
    color: '#7f8c8d',
    lineHeight: 20,
  },
});
