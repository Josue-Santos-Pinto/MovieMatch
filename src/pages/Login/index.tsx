import { useNavigation } from '@react-navigation/native';
import { BackHandler } from 'react-native';
import { useEffect, useState } from 'react';
import {
  BackButton,
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
import nodeApi from '../../services/nodeApi';

export function Login() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    let res = await nodeApi.login(email, password);
    console.log(res);
  };

  return (
    <Container source={require('../../assets/cinema.jpg')} resizeMode="cover">
      <BackButton onPress={() => navigation.goBack()}>
        <FontAwesome5Icon name="chevron-left" size={25} color="#fff" />
      </BackButton>
      <HeaderLogoArea>
        <HeaderLogo>
          <HeaderImg source={require('../../assets/cinecam.png')} resizeMode="cover" />
        </HeaderLogo>
      </HeaderLogoArea>

      <InputArea>
        <FontAwesome5Icon name="user" size={25} color="#bcbcbc" />
        <Input
          placeholder="usuario@gmail.com"
          placeholderTextColor="#bcbcbc"
          value={email}
          onChangeText={(e) => setEmail(e)}
        />
      </InputArea>

      <InputArea>
        <FontAwesome5Icon name="lock" size={25} color="#bcbcbc" />
        <Input
          placeholder="123456"
          placeholderTextColor="#bcbcbc"
          secureTextEntry
          value={password}
          onChangeText={(e) => setPassword(e)}
        />
      </InputArea>

      <SubmitButton onPress={handleLogin}>
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
