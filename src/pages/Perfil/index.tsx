import { useEffect } from 'react';
import { Container, PageText } from './styles';
import { useNavigation } from '@react-navigation/native';

export function Perfil() {
  const navigation = useNavigation();
  let id = '';

  useEffect(() => {
    if (id == '') {
      navigation.reset({ index: 1, routes: [{ name: 'Login' }] });
    }
  }, [id]);
  return (
    <Container>
      <PageText> Perfil</PageText>
    </Container>
  );
}
