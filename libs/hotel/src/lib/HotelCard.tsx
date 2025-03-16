import { Card, Title } from 'react-native-paper';

export function HotelCard({ onPress }: any) {
  return (
    <Card style={{ marginVertical: 10 }} onPress={onPress}>
      <Card.Content>
        <Title>Book Your Hotel</Title>
      </Card.Content>
    </Card>
  );
}