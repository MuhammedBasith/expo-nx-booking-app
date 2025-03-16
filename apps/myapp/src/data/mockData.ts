export interface Hotel {
  id: number;
  name: string;
  location: string;
  price: number;
  rating: number;
  image: string;
  description: string;
  amenities: string[];
  coordinates: {
    latitude: number;
    longitude: number;
  };
  reviews?: {
    user: string;
    rating: number;
    comment: string;
    date: string;
  }[];
}

export interface Flight {
  id: number;
  airline: string;
  flightNumber: string;
  departureCity: string;
  arrivalCity: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
  duration: string;
  stops: number;
  aircraft: string;
  seatsAvailable: number;
  logo: string;
  cabinClass: string[];
}

export const hotels: Hotel[] = [
  {
    id: 1,
    name: 'Grand Hyatt',
    location: 'New York, USA',
    price: 350,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945',
    description: 'Luxury hotel in the heart of Manhattan with stunning city views.',
    amenities: ['Free WiFi', 'Pool', 'Spa', 'Gym', 'Restaurant'],
    coordinates: {
      latitude: 40.7128,
      longitude: -74.006,
    },
    reviews: [
      {
        user: 'John D.',
        rating: 4.8,
        comment: 'Excellent service and beautiful rooms!',
        date: '2023-10-15',
      },
      {
        user: 'Sarah M.',
        rating: 4.2,
        comment: 'Great location but a bit noisy at night.',
        date: '2023-09-22',
      },
    ],
  },
  {
    id: 2,
    name: 'Ritz-Carlton',
    location: 'Paris, France',
    price: 520,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa',
    description: 'Elegant hotel with Eiffel Tower views and world-class dining.',
    amenities: ['Free WiFi', 'Spa', 'Fine Dining', 'Concierge', 'Room Service'],
    coordinates: {
      latitude: 48.8566,
      longitude: 2.3522,
    },
    reviews: [
      {
        user: 'Emily L.',
        rating: 5.0,
        comment: 'Absolutely perfect stay! The view was incredible.',
        date: '2023-11-05',
      },
      {
        user: 'Michael R.',
        rating: 4.6,
        comment: 'Exceptional service, though prices are steep.',
        date: '2023-10-18',
      },
    ],
  },
  {
    id: 3,
    name: 'Burj Al Arab',
    location: 'Dubai, UAE',
    price: 1200,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b',
    description: 'Iconic sail-shaped hotel with ultra-luxury suites and private beach.',
    amenities: ['Private Beach', 'Butler Service', 'Helipad', 'Underwater Restaurant', 'Gold-plated iPads'],
    coordinates: {
      latitude: 25.2048,
      longitude: 55.2708,
    },
    reviews: [
      {
        user: 'Robert J.',
        rating: 4.9,
        comment: 'Once-in-a-lifetime experience. Unmatched luxury.',
        date: '2023-12-01',
      },
      {
        user: 'Lisa T.',
        rating: 4.7,
        comment: 'Incredible service but somewhat over the top.',
        date: '2023-11-15',
      },
    ],
  },
  {
    id: 4,
    name: 'Aman Tokyo',
    location: 'Tokyo, Japan',
    price: 800,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb',
    description: 'Serene urban retreat with minimalist design and panoramic city views.',
    amenities: ['Spa', 'Indoor Pool', 'Traditional Onsen', 'Yoga Studio', 'Japanese Garden'],
    coordinates: {
      latitude: 35.6762,
      longitude: 139.6503,
    },
    reviews: [
      {
        user: 'David K.',
        rating: 4.8,
        comment: 'Zen-like tranquility in the middle of Tokyo.',
        date: '2023-09-10',
      },
      {
        user: 'Jennifer P.',
        rating: 4.6,
        comment: 'Beautiful design but service could be more personalized.',
        date: '2023-08-25',
      },
    ],
  },
  {
    id: 5,
    name: 'Bellagio',
    location: 'Las Vegas, USA',
    price: 280,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1549144511-f099e773c147',
    description: 'Iconic hotel with famous fountains, casino, and luxury accommodations.',
    amenities: ['Casino', 'Pool Complex', 'Fine Dining', 'Fountain Show', 'Nightclub'],
    coordinates: {
      latitude: 36.1147,
      longitude: -115.1728,
    },
    reviews: [
      {
        user: 'Thomas B.',
        rating: 4.5,
        comment: 'Great location on the strip, rooms are spacious.',
        date: '2023-10-05',
      },
      {
        user: 'Amanda C.',
        rating: 4.7,
        comment: 'The fountain show is spectacular! Worth every penny.',
        date: '2023-09-18',
      },
    ],
  },
  {
    id: 6,
    name: 'Four Seasons Bora Bora',
    location: 'Bora Bora, French Polynesia',
    price: 1500,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1583756749423-118d16b9a7d4',
    description: 'Luxurious overwater bungalows with direct access to crystal-clear lagoon waters.',
    amenities: ['Private Pool', 'Overwater Bungalow', 'Spa', 'Snorkeling', 'Fine Dining', 'Beach Access'],
    coordinates: {
      latitude: -16.5004,
      longitude: -151.7415,
    },
    reviews: [
      {
        user: 'Alexandra W.',
        rating: 5,
        comment: 'Paradise on Earth! The overwater bungalows are incredible.',
        date: '2023-08-15',
      },
      {
        user: 'James T.',
        rating: 4.9,
        comment: 'Breathtaking views and exceptional service.',
        date: '2023-07-28',
      },
    ],
  },
  {
    id: 7,
    name: 'Santorini Secret Suites',
    location: 'Santorini, Greece',
    price: 580,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff',
    description: 'Cliffside boutique hotel with private infinity pools overlooking the Aegean Sea.',
    amenities: ['Infinity Pool', 'Sea View', 'Spa', 'Fine Dining', 'Wine Tasting', 'Airport Transfer'],
    coordinates: {
      latitude: 36.4618,
      longitude: 25.3760,
    },
    reviews: [
      {
        user: 'Maria K.',
        rating: 4.8,
        comment: 'The sunset views are absolutely magical!',
        date: '2023-06-20',
      },
      {
        user: 'Daniel R.',
        rating: 4.6,
        comment: 'Beautiful property, though a bit crowded during peak season.',
        date: '2023-05-15',
      },
    ],
  },
  {
    id: 8,
    name: 'Waldorf Astoria Maldives',
    location: 'Maldives',
    price: 2200,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6',
    description: 'Exclusive island resort with private villas, each with their own pool and beach access.',
    amenities: ['Private Villa', 'Personal Butler', 'Underwater Restaurant', 'Yacht Excursions', 'Diving'],
    coordinates: {
      latitude: 4.1755,
      longitude: 73.5093,
    },
    reviews: [
      {
        user: 'Christopher L.',
        rating: 5,
        comment: 'The most exclusive and private resort experience I\'ve ever had.',
        date: '2023-09-05',
      },
      {
        user: 'Olivia P.',
        rating: 4.9,
        comment: 'Worth every penny for a once-in-a-lifetime experience.',
        date: '2023-08-22',
      },
    ],
  },
  {
    id: 9,
    name: 'Rambagh Palace',
    location: 'Jaipur, India',
    price: 750,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67',
    description: 'Former royal residence converted into a luxury hotel with opulent interiors and lush gardens.',
    amenities: ['Royal Suite', 'Heritage Tours', 'Ayurvedic Spa', 'Polo Bar', 'Peacock Gardens'],
    coordinates: {
      latitude: 26.9124,
      longitude: 75.8069,
    },
    reviews: [
      {
        user: 'Richard M.',
        rating: 4.9,
        comment: 'Living like royalty! The palace is stunning and service impeccable.',
        date: '2023-07-12',
      },
      {
        user: 'Priya S.',
        rating: 4.7,
        comment: 'A beautiful blend of history and luxury.',
        date: '2023-06-30',
      },
    ],
  },
  {
    id: 10,
    name: 'The Silo Hotel',
    location: 'Cape Town, South Africa',
    price: 890,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1576487248805-cf45f6bcc67f',
    description: 'Contemporary hotel built in a historic grain silo with stunning views of Table Mountain.',
    amenities: ['Rooftop Pool', 'Art Gallery', 'Spa', 'Wine Cellar', 'Panoramic Views'],
    coordinates: {
      latitude: -33.9249,
      longitude: 18.4241,
    },
    reviews: [
      {
        user: 'Michelle T.',
        rating: 4.8,
        comment: 'The architecture is incredible and the views unmatched!',
        date: '2023-08-05',
      },
      {
        user: 'Brian K.',
        rating: 4.7,
        comment: 'A perfect blend of art, design, and luxury.',
        date: '2023-07-18',
      },
    ],
  },
];

export const flights: Flight[] = [
  {
    id: 1,
    airline: 'Emirates',
    flightNumber: 'EK203',
    departureCity: 'New York',
    arrivalCity: 'Dubai',
    departureTime: '22:20',
    arrivalTime: '19:05',
    price: 1250,
    duration: '12h 45m',
    stops: 0,
    aircraft: 'Airbus A380',
    seatsAvailable: 42,
    logo: 'https://logos-world.net/wp-content/uploads/2020/03/Emirates-Logo.png',
    cabinClass: ['Economy', 'Business', 'First'],
  },
  {
    id: 2,
    airline: 'Singapore Airlines',
    flightNumber: 'SQ21',
    departureCity: 'Singapore',
    arrivalCity: 'New York',
    departureTime: '10:30',
    arrivalTime: '17:00',
    price: 1450,
    duration: '18h 30m',
    stops: 0,
    aircraft: 'Airbus A350-900ULR',
    seatsAvailable: 28,
    logo: 'https://logos-world.net/wp-content/uploads/2020/03/Singapore-Airlines-Logo.png',
    cabinClass: ['Premium Economy', 'Business'],
  },
  {
    id: 3,
    airline: 'British Airways',
    flightNumber: 'BA112',
    departureCity: 'London',
    arrivalCity: 'New York',
    departureTime: '08:25',
    arrivalTime: '11:05',
    price: 850,
    duration: '7h 40m',
    stops: 0,
    aircraft: 'Boeing 777-300ER',
    seatsAvailable: 56,
    logo: 'https://logos-world.net/wp-content/uploads/2020/03/British-Airways-Logo.png',
    cabinClass: ['Economy', 'Premium Economy', 'Business', 'First'],
  },
  {
    id: 4,
    airline: 'Lufthansa',
    flightNumber: 'LH400',
    departureCity: 'Frankfurt',
    arrivalCity: 'New York',
    departureTime: '13:10',
    arrivalTime: '15:40',
    price: 780,
    duration: '8h 30m',
    stops: 0,
    aircraft: 'Airbus A340-600',
    seatsAvailable: 48,
    logo: 'https://logos-world.net/wp-content/uploads/2020/03/Lufthansa-Logo.png',
    cabinClass: ['Economy', 'Premium Economy', 'Business', 'First'],
  },
  {
    id: 5,
    airline: 'Qatar Airways',
    flightNumber: 'QR701',
    departureCity: 'Doha',
    arrivalCity: 'New York',
    departureTime: '01:15',
    arrivalTime: '07:30',
    price: 1100,
    duration: '14h 15m',
    stops: 0,
    aircraft: 'Boeing 777-300ER',
    seatsAvailable: 38,
    logo: 'https://logos-world.net/wp-content/uploads/2020/03/Qatar-Airways-Logo.png',
    cabinClass: ['Economy', 'Business', 'First'],
  },
  {
    id: 6,
    airline: 'Delta Air Lines',
    flightNumber: 'DL401',
    departureCity: 'Atlanta',
    arrivalCity: 'London',
    departureTime: '19:05',
    arrivalTime: '08:25',
    price: 920,
    duration: '8h 20m',
    stops: 0,
    aircraft: 'Airbus A330-900neo',
    seatsAvailable: 64,
    logo: 'https://logos-world.net/wp-content/uploads/2020/03/Delta-Logo.png',
    cabinClass: ['Economy', 'Premium Economy', 'Business'],
  },
  {
    id: 7,
    airline: 'Japan Airlines',
    flightNumber: 'JL6',
    departureCity: 'Tokyo',
    arrivalCity: 'Los Angeles',
    departureTime: '17:25',
    arrivalTime: '11:45',
    price: 1050,
    duration: '10h 20m',
    stops: 0,
    aircraft: 'Boeing 777-300ER',
    seatsAvailable: 34,
    logo: 'https://logos-world.net/wp-content/uploads/2020/03/Japan-Airlines-Logo.png',
    cabinClass: ['Economy', 'Premium Economy', 'Business', 'First'],
  },
  {
    id: 8,
    airline: 'Air France',
    flightNumber: 'AF84',
    departureCity: 'Paris',
    arrivalCity: 'San Francisco',
    departureTime: '10:10',
    arrivalTime: '12:45',
    price: 980,
    duration: '11h 35m',
    stops: 0,
    aircraft: 'Boeing 787-9',
    seatsAvailable: 42,
    logo: 'https://logos-world.net/wp-content/uploads/2020/03/Air-France-Logo.png',
    cabinClass: ['Economy', 'Premium Economy', 'Business'],
  },
  {
    id: 9,
    airline: 'Cathay Pacific',
    flightNumber: 'CX888',
    departureCity: 'Hong Kong',
    arrivalCity: 'Vancouver',
    departureTime: '14:15',
    arrivalTime: '11:25',
    price: 1120,
    duration: '12h 10m',
    stops: 0,
    aircraft: 'Airbus A350-1000',
    seatsAvailable: 28,
    logo: 'https://logos-world.net/wp-content/uploads/2020/03/Cathay-Pacific-Logo.png',
    cabinClass: ['Economy', 'Premium Economy', 'Business'],
  },
  {
    id: 10,
    airline: 'Etihad Airways',
    flightNumber: 'EY130',
    departureCity: 'Abu Dhabi',
    arrivalCity: 'Chicago',
    departureTime: '02:55',
    arrivalTime: '08:50',
    price: 1280,
    duration: '14h 55m',
    stops: 0,
    aircraft: 'Boeing 787-10',
    seatsAvailable: 36,
    logo: 'https://logos-world.net/wp-content/uploads/2020/03/Etihad-Airways-Logo.png',
    cabinClass: ['Economy', 'Business', 'First'],
  },
  {
    id: 11,
    airline: 'ANA',
    flightNumber: 'NH106',
    departureCity: 'Tokyo',
    arrivalCity: 'London',
    departureTime: '11:45',
    arrivalTime: '16:20',
    price: 1350,
    duration: '12h 35m',
    stops: 0,
    aircraft: 'Boeing 777-300ER',
    seatsAvailable: 24,
    logo: 'https://logos-world.net/wp-content/uploads/2020/03/ANA-Logo.png',
    cabinClass: ['Economy', 'Premium Economy', 'Business', 'First'],
  },
  {
    id: 12,
    airline: 'Qantas',
    flightNumber: 'QF1',
    departureCity: 'Sydney',
    arrivalCity: 'London',
    departureTime: '16:10',
    arrivalTime: '05:10',
    price: 1680,
    duration: '22h 00m',
    stops: 1,
    aircraft: 'Airbus A380-800',
    seatsAvailable: 52,
    logo: 'https://logos-world.net/wp-content/uploads/2020/03/Qantas-Logo.png',
    cabinClass: ['Economy', 'Premium Economy', 'Business', 'First'],
  },
]; 