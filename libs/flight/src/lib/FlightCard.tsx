import { Card, Title } from 'react-native-paper';

export function FlightCard({ onPress }: any) {
  return (
    <Card style={{ marginVertical: 10 }} onPress={onPress}>
      <Card.Content>
        <Title>Book Your Flights</Title>
      </Card.Content>
    </Card>
  );
}