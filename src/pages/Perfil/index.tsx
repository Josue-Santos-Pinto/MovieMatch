import { useEffect } from 'react';
import { Container, GoToLogin, GoToLoginArea, GoToLoginContainer, PageText } from './styles';
import { useNavigation } from '@react-navigation/native';

export function Perfil() {
  const navigation = useNavigation();
  const id = '';

  useEffect(() => {
    if (id == '') {
      return navigation.navigate('AuthStack');
    }
  }, [id]);
  return (
    <Container>
      {!id && (
        <GoToLoginContainer source={require('../../assets/cinema.jpg')}>
          <GoToLoginArea>
            <PageText> É necessario fazer login {'\n'} para acessar essa página</PageText>
            <GoToLogin onPress={() => navigation.navigate('AuthStack')}>
              <PageText>Fazer Login</PageText>
            </GoToLogin>
          </GoToLoginArea>
        </GoToLoginContainer>
      )}
    </Container>
  );
}
