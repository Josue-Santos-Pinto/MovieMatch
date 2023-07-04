import { useNavigation } from '@react-navigation/native';
import { BackHandler } from 'react-native';
import { useEffect } from 'react';
import {
  Container,
  GoToRegisterButton,
  HeaderImg,
  HeaderLogo,
  HeaderLogoArea,
  Input,
  InputArea,
  NotHaveAccountArea,
  NotHaveAccountText,
  PageText,
  SubmitButton,
  SubmitButtonText,
} from './styles';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

export function Login() {
  const navigation = useNavigation();

  return (
    <Container source={require('../../assets/cinema.jpg')} resizeMode="cover">
      <HeaderLogoArea>
        <HeaderLogo>
          <HeaderImg source={require('../../assets/cinecam.png')} resizeMode="cover" />
        </HeaderLogo>
      </HeaderLogoArea>

      <InputArea>
        <FontAwesome5Icon name="user" size={25} color="#bcbcbc" />
        <Input />
      </InputArea>

      <InputArea>
        <FontAwesome5Icon name="lock" size={25} color="#bcbcbc" />
        <Input secureTextEntry />
      </InputArea>

      <SubmitButton>
        <SubmitButtonText>Login</SubmitButtonText>
      </SubmitButton>

      <NotHaveAccountArea>
        <NotHaveAccountText>Não possui uma conta? </NotHaveAccountText>
        <GoToRegisterButton onPress={() => navigation.navigate('Register')}>
          <NotHaveAccountText style={{ fontSize: 15, color: '#fff', fontFamily: 'Lato-Bold' }}>
            Criar conta
          </NotHaveAccountText>
        </GoToRegisterButton>
      </NotHaveAccountArea>
    </Container>
  );
}
