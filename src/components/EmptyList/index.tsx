import { Container, EmptyImg } from './styles';

export function EmptyList() {
  return (
    <Container>
      <EmptyImg source={require('../../assets/slash-star.png')} resizeMode="contain" />
    </Container>
  );
}
