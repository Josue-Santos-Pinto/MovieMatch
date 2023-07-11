import { useNavigation } from '@react-navigation/native';
import { ScrollView, Modal, Alert } from 'react-native';
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
  ErrorMessage,
  SubmitButton,
  SubmitButtonText,
  InputBox,
  LoadingBox,
  LoadingText,
  Shadow,
} from './styles';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import nodeApi from '../../services/nodeApi';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import UserActionTypes from '../../redux/user/actions-type';
import { useEffect, useState } from 'react';
import { Loading } from '../../components/Loading';
import AsyncStorage from '@react-native-async-storage/async-storage';

type FormDataType = {
  email: string;
  password: string;
};

const signUpSchema = yup.object({
  email: yup
    .string()
    .required('O e-mail precisa ser informado')
    .email('Formato de e-mail inválido'),
  password: yup
    .string()
    .required('Informe a senha')
    .min(6, 'A senha deve ter pelo menos 6 digitos'),
});

export function Login() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataType>({
    resolver: yupResolver(signUpSchema),
  });

  const handleLogin = async (data: FormDataType) => {
    setIsLoading(true);
    let res = await nodeApi.login(data.email.toLowerCase(), data.password);
    console.log(res);
    if (!res.error) {
      if (res.token) {
        await AsyncStorage.setItem('token', res.token);

        await AsyncStorage.setItem('id', res.id);

        navigation.reset({ index: 1, routes: [{ name: 'MainTab' }] });
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
      Alert.alert(res.error);
    }
  };

  return (
    <Container source={require('../../assets/cinema.jpg')} resizeMode="cover">
      <BackButton onPress={() => navigation.goBack()}>
        <FontAwesome5Icon name="chevron-left" size={25} color="#fff" />
      </BackButton>
      <ScrollView>
        <HeaderLogoArea>
          <HeaderLogo>
            <HeaderImg source={require('../../assets/cinecam.png')} resizeMode="cover" />
          </HeaderLogo>
        </HeaderLogoArea>

        <InputBox>
          <InputArea error={errors.email?.message ? true : false}>
            <FontAwesome5Icon name="envelope" size={25} color="#bcbcbc" />
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange } }) => (
                <Input placeholder="Email" placeholderTextColor="#bcbcbc" onChangeText={onChange} />
              )}
            />
          </InputArea>
          {errors && errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </InputBox>

        <InputBox>
          <InputArea error={errors.password?.message ? true : false}>
            <FontAwesome5Icon name="lock" size={25} color="#bcbcbc" />
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange } }) => (
                <Input
                  placeholder="Senha"
                  placeholderTextColor="#bcbcbc"
                  onChangeText={onChange}
                  secureTextEntry
                />
              )}
            />
          </InputArea>
          {errors && errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
        </InputBox>

        <SubmitButton onPress={handleSubmit(handleLogin)}>
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
      </ScrollView>
      <Modal
        visible={isLoading}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setIsLoading(false)}
      >
        <Shadow>
          <LoadingBox>
            <Loading load={isLoading} color="blue" />
            <LoadingText>Carregando...</LoadingText>
          </LoadingBox>
        </Shadow>
      </Modal>
    </Container>
  );
}
