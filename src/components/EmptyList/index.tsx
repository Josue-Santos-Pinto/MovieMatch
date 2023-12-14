import FastImage from 'react-native-fast-image';
import { Container } from './styles';

export function EmptyList() {
  return (
    <Container>
      <FastImage style={{width: '40%', height: '40%'}} source={require('../../assets/slash-star.png')} resizeMode={FastImage.resizeMode.cover} />
    </Container>
  );
}
