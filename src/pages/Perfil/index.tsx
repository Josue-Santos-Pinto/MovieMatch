import { useEffect } from 'react';
import { Container, GoToLogin, GoToLoginArea, GoToLoginContainer, PageText } from './styles';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';

export function Perfil() {
  const navigation = useNavigation();
  const { token } = useSelector((rootReducer) => rootReducer.userReducer);

  useEffect(() => {
    console.log(token);
  }, [token]);

  useEffect(() => {
    if (token == '') {
      return navigation.navigate('AuthStack');
    }
  }, [token]);
  return (
    <Container>
      {!token && (
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
