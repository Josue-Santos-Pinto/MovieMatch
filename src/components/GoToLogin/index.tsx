import { useEffect } from 'react';
import { Container, GoToLoginButton, GoToLoginArea, GoToLoginContainer, PageText } from './styles';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';

export function GoToLogin() {
  const navigation = useNavigation();

  return (
    <Container>
      <GoToLoginContainer source={require('../../assets/cinema.jpg')}>
        <GoToLoginArea>
          <PageText> É necessario fazer login {'\n'} para acessar essa página</PageText>
          <GoToLoginButton onPress={() => navigation.navigate('AuthStack')}>
            <PageText>Fazer Login</PageText>
          </GoToLoginButton>
        </GoToLoginArea>
      </GoToLoginContainer>
    </Container>
  );
}
